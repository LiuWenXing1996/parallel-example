import { defineConfig } from "parallel-wait-run";
import waitOn from "wait-on";

export default defineConfig({
  scripts: [
    {
      name: "dev:web",
      command: `pnpm --reporter-hide-prefix --filter 'web' dev `,
      wait: async () => {
        try {
          await waitOn({
            resources: ["http://localhost:3000/"],
          });
        } catch (error) {
          return false;
        }
        return true;
      },
    },
    {
      name: `dev:server`,
      command: `pnpm --filter 'server' start`,
    },
  ],
});
