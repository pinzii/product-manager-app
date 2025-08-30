// JSON Server para Render
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ static: './public' });

server.use(middlewares);
server.use(jsonServer.bodyParser);

// healthcheck para Render
server.get('/healthz', (_req, res) => res.status(200).send('ok'));

// (opcional) latencia 0ms
server.use((req, _res, next) => setTimeout(next, 0));

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server running on port ${port}`);
});
