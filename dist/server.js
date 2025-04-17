import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import routes from './routes/index.js'; // ✅ Make sure this path is correct
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Correct path to client/dist (3 levels up from server/src)
const clientDistPath = path.resolve(__dirname, '..', '..', 'Module 9 Weather Dashboard', 'client', 'dist');
console.log('💡 Serving frontend from:', clientDistPath);
console.log('✅ Does index.html exist?', fs.existsSync(path.join(clientDistPath, 'index.html')));
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static frontend
app.use(express.static(clientDistPath));
// API routes
app.use('/api', routes);
// SPA fallback for React Router
app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});
// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
