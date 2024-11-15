const express = require('express');
const gs = require('github-scraper');

const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

/**
 * Function to fetch data from GitHub using github-scraper
 */
async function getGithubData(url) {
    return new Promise((resolve, reject) => {
        gs(url, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Root route serving the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route to fetch GitHub data
app.post('/fetch', async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send('Username is required');
    }

    const url = `https://github.com/${username}`;

    try {
        const data = await getGithubData(url);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

// Route for the About page
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html'); // Ensure this file exists in the 'public' folder
});

// Route for the Contact page
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html'); // Ensure this file exists in the 'public' folder
});

app.post('/contact-submit', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Received contact form: ${name}, ${email}, ${message}`);
    res.send('Thank you for contacting us! We will get back to you soon.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
