// import { startDevServer } from '@cypress/vite-dev-server';
import pkg from '@cypress/vite-dev-server';
const { startDevServer } = pkg;

export default (on, config) => {
  on('dev-server:start', (options) => startDevServer({options}))

  return config;
}