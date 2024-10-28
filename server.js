const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML form)
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission

app.get('/contact', (req, res) => {
    res.send('This is the contact page.'); // You can send an HTML page instead if you prefer.
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email provider
        auth: {
            user: 'sumansingh.main@gmail.com', // Your email
            pass: 'gokh nejb wyhj apif' // Your email password or app-specific password
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'sumansingh.main@gmail.com', // Change to your recipient
        subject: `New contact form submission from ${name}`,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error);
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
