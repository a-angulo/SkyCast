import { Router } from 'express';
import weatherRoutes from './api/weatherRoutes.js'; // Adjust extension or use `.ts` if compiling

const router = Router();

// Mount weather routes at /api/weather
router.use('/weather', weatherRoutes);

export default router;
