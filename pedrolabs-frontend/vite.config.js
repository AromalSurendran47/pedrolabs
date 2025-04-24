// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: './', // ✅ This makes asset paths relative so S3 can serve them properly
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 3002,
//     strictPort: true,
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ✅ important for relative asset paths
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3002,
    strictPort: true,
  },
});
