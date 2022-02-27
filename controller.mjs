import * as images from './model.mjs';
import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

/**
 * Retrieve images. 
*/
app.get('/', (req, res) => {
    let filter = {};

    images.findImages(filter, '', 0)
        .then(images => {
            res.json(images);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve medical images. 
*/
app.get('/medical', (req, res) => {
    let filter = {theme: "medical"};

    images.findImages(filter, '', 0)
        .then(images => {
            res.json(images);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});