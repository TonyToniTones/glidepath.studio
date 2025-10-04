import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // ✅ Force serverless mode

export default defineConfig({
  site: 'https://glidepath.studio', // Add site URL for proper URL generation
  output: 'server',
  adapter: vercel(),
});