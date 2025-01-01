import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import fs from 'fs/promises';
import multer from 'multer';
import path from 'path';

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/imgs');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

export function app(): express.Express {
  const server = express();
  console.log("start service ");
  // const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  // const browserDistFolder = resolve(serverDistFolder, '../browser');
  // const indexHtml = join(serverDistFolder, 'index.server.html');
  // console.log(serverDistFolder);
  

  // const commonEngine = new CommonEngine();

  // server.set('view engine', 'html');
  // server.set('views', browserDistFolder);

  // API endpoints
  server.post('/api/saveImage', upload.single('image'), (req, res) => {
    if (req.file) {
      res.json({ message: 'Image saved successfully', filename: req.file.filename });
    } else {
      res.status(400).json({ error: 'No image file provided' });
    }
  });

  server.post('/api/saveGame', express.json(), async (req, res) => {
    try {
      const gamesDir = 'public/json';
      const files = await fs.readdir(gamesDir);
      const jsonFiles = files.filter(file => path.extname(file) === '.json');
      const newFileNumber = jsonFiles.length + 1;
      const newFileName = `game${newFileNumber}.json`;
      await fs.writeFile(path.join(gamesDir, newFileName), JSON.stringify(req.body));
      res.json({ message: 'Game saved successfully', filename: newFileName });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save game' });
    }
  });

  // server.get('/api/getGames', async (req, res) => {
  //   try {
  //     const gamesDir = 'public/json';
  //     const files = await fs.readdir(gamesDir);
  //     const jsonFiles = files.filter(file => path.extname(file) === '.json');
  //     const gamesList = await Promise.all(jsonFiles.map(async (file) => {
  //       const content = await fs.readFile(path.join(gamesDir, file), 'utf8');
  //       return { name: file, data: JSON.parse(content) };
  //     }));
  //     res.json(gamesList);
  //   } catch (error) {
  //     console.error('Error in /api/getGames:', error);
  //     res.status(500).json({ error: 'Failed to get games' });
  //   }
  // });
  server.get('/api/getGames', (req, res) => {
    const sampleGames = [
      { id: 1, name: "Sample Game 1", description: "This is a test game" },
      { id: 2, name: "Sample Game 2", description: "Another test game" }
    ];
    res.json(sampleGames);
  });
  server.get('/api/getGame/:name', async (req, res) => {
    try {
      const gameName = req.params.name;
      const gamePath = path.join('public/json', gameName);
      const gameData = await fs.readFile(gamePath, 'utf8');
      res.json(JSON.parse(gameData));
    } catch (error) {
      res.status(404).json({ error: 'Game not found' });
    }
  });

  // Serve static files from /browser
  // server.get('**', express.static(browserDistFolder, {
  //   maxAge: '1y',
  //   index: 'index.html',
  // }));

  // // All regular routes use the Angular engine
  // server.get('**', (req, res, next) => {
  //   const { protocol, originalUrl, baseUrl, headers } = req;

  //   commonEngine
  //     .render({
  //       bootstrap: AppServerModule,
  //       documentFilePath: indexHtml,
  //       url: `${protocol}://${headers.host}${originalUrl}`,
  //       publicPath: browserDistFolder,
  //       providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
  //     })
  //     .then((html) => res.send(html))
  //     .catch((err) => next(err));
  // });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();