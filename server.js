const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const REPO_OWNER = 'Adris87';  // Ganti dengan pemilik repositori
const REPO_NAME = 'api';       // Ganti dengan nama repositori
const FILE_PATH = 'database.json';

const GITHUB_TOKEN = '<YOUR_GITHUB_TOKEN>';  // Ganti dengan token akses pribadi GitHub

app.use(bodyParser.json());

app.post('/update-data', async (req, res) => {
    const newData = req.body.data;

    try {
        // Buat konten baru untuk file database.json
        const content = JSON.stringify(newData, null, 2);

        // Kirim permintaan PUT ke GitHub API untuk menulis atau mengganti file
        await axios.put(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            message: 'database.json',
            content: Buffer.from(content).toString('base64'),
        }, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        console.log('File updated on GitHub');

        res.send('File updated on GitHub');
    } catch (error) {
        console.error('Error updating file:', error);
        res.status(500).send('Error updating file on GitHub');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
