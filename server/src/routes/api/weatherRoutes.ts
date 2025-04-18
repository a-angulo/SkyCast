import { Router } from 'express';
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

const router = Router();

// POST /api/weather - Get weather data for a city
router.post('/', async (req, res) => {
  const city = req.body.cityName;

  if (!city) {
    return res.status(400).json({ error: 'City name is required.' }); // ✅ return added here
  }

  try {
    const weatherData = await weatherService.getWeatherForCity(city);
    await historyService.addCity(city);
    return res.status(200).json(weatherData); // ✅ return here too, good practice
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving weather data.' });
  }
});

// GET /api/weather/history - Get search history
router.get('/history', async (_req, res) => {
  try {
    const history = await historyService.getCities();
    return res.status(200).json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving search history.' });
  }
});

// DELETE /api/weather/history/:id - Delete city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await historyService.removeCity(id);
    return res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting search history.' });
  }
});

export default router;

