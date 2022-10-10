import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*{cy}.{ts,tsx}",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
