import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
// ✅ Use the correct absolute path to the frontend build
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
console.log('💡 Serving frontend from:', clientDistPath);
app.use(express.static(clientDistPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// ✅ React SPA fallback
app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});
app.listen(PORT, () => {
    console.log(`✅ Listening on PORT: ${PORT}`);
}); //CHAT GPT TROUBLESHOOTING
