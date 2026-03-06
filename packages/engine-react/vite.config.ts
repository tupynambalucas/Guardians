import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [
      isDev ? basicSsl() : [],
      tsconfigPaths({
        projects: [isDev ? './tsconfig.app.json' : './tsconfig.build.json'],
      }),
      tailwindcss(),
      react(),
      svgr({
        include: '**/*.svg?react',
      }),
    ],

    optimizeDeps: {
      exclude: ['@guardians/engine-core', '@guardians/engine-assets'],
    },

    base: './',

    server: {
      host: true,
      port: 5173,
      open: true,
    },

    preview: {
      host: true,
      port: 5173,
      open: true,
    },

    assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.exr'],

    build: {
      outDir: path.resolve('dist'),
      emptyOutDir: true,
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const info = assetInfo.names[0] ?? assetInfo.name;
            let extType = info.split('.').at(1) ?? 'unknown';

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            } else if (/css|scss|sass/i.test(extType)) {
              extType = 'css';
            } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              extType = 'fonts';
            }

            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
    },
  };
});
