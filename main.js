const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key'; // Use a secure key and store it in environment variables

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [];

// Register a new user
app.post('/register', (req, res) => {
    const { id, name, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = { id, name, password: hashedPassword };
    users.push(user);

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 }); // Expires in 24 hours

    res.status(201).send({ auth: true, token });
});

// Login a user
app.post('/login', (req, res) => {
    const { id, password } = req.body;
    const user = users.find(u => u.id === id);

    if (!user) return res.status(404).send('No user found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });

    res.status(200).send({ auth: true, token });
});

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
}

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
    res.status(200).send('This is a protected route');
});

// Create a new user (protected)
app.post('/users', verifyToken, (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

// Get all users (protected)
app.get('/users', verifyToken, (req, res) => {
    res.send(users);
});

// Get a single user by ID (protected)
app.get('/users/:id', verifyToken, (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// Update a user by ID (protected)
app.put('/users/:id', verifyToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = req.body;
        res.send(users[index]);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// Delete a user by ID (protected)
app.delete('/users/:id', verifyToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        res.send(deletedUser);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
