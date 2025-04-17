import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';

import routes from './routes/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Serve Vite frontend from client/dist (outside of compiled server folder)
const clientBuildPath = path.join(__dirname, '..', '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// ✅ Catch-all route for React SPA
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));//CHAT GPT TROUBLESHOOTING
