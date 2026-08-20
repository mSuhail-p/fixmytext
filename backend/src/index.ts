import { createApp } from './app.js';
import { createContainer } from './composition.js';

const container = createContainer();
const app = createApp(container);

app.listen(container.config.port, () => {
  console.log(`API listening on http://localhost:${container.config.port}`);
});
