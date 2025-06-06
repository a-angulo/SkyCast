import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

router.get('*', (_req, res) => {
    const indexPath = path.join(__dirname, '../client/dist/index.html');
    res.sendFile(indexPath);// TODO: Define route to serve index.html
});
export default router;
