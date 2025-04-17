import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve Vite's static files from client/dist
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API routes
app.use(routes);

// ✅ Fallback: Serve index.html for any unknown route (SPA mode)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
});

// ✅ Start the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));//CHAT GPT TROUBLESHOOTING
