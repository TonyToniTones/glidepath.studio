import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // ✅ Force serverless mode

export default defineConfig({
  output: 'server',
  adapter: vercel(),
});