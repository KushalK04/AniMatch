import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://kitsu.io/api/edge/anime');
        const animeData = response.data.data;
        res.render('main', { animeData });
    } catch (error) {
        console.error('Error fetching anime data:', error);
        res.status(500).send('An error occurred while fetching anime data.');
    }
});

export default router;
