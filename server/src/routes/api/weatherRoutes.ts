import { Router } from 'express';
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

const router = Router();


// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const city = req.body.cityName;

  if (!city) {
    return res.status(400).json({ error: 'City name is required.' });
  }
  try {
    const weatherData = await weatherService.getWeatherForCity(city);
    await historyService.addCity(city);
    res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving weather data.' });
  }
});

// GET search history
router.get('/history', async (_req, res) => {
  try {
    const history = await historyService.getCities();
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving search history.' });
  }
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await historyService.removeCity(id);
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting search history.' });
  }
});

export default router;
