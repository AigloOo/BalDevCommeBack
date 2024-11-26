import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "static-files-redirect",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const staticFiles = {
            "/robots.txt": "public/robots.txt",
            "/sitemap.xml": "public/sitemap.xml",
            "/site.webmanifest": "public/site.webmanifest",
            "/og-image.png": "public/og-image.png",
            "/twitter-image.png": "public/twitter-image.png",
            "/logo.png": "public/logo.png",
            "/apple-touch-icon.png": "public/apple-touch-icon.png",
            "/favicon-32x32.png": "public/favicon-32x32.png",
            "/favicon-16x16.png": "public/favicon-16x16.png",
            "/android-chrome-192x192.png": "public/android-chrome-192x192.png",
            "/android-chrome-512x512.png": "public/android-chrome-512x512.png",
          };
          const requestedPath = req.url?.split("?")[0] ?? "";
          const filePath =
            staticFiles[requestedPath as keyof typeof staticFiles];

          if (filePath) {
            try {
              const content = fs.readFileSync(path.resolve(filePath));
              const contentType =
                {
                  ".txt": "text/plain",
                  ".xml": "application/xml",
                  ".webmanifest": "application/manifest+json",
                  ".svg": "image/svg+xml",
                  ".png": "image/png",
                  ".ico": "image/x-icon",
                }[path.extname(filePath)] ?? "application/octet-stream";

              res.setHeader("Content-Type", contentType);
              res.end(content);
              return;
            } catch (error) {
              console.error(`Error serving ${filePath}:`, error);
            }
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const staticFiles = {
            "/robots.txt": "public/robots.txt",
            "/sitemap.xml": "public/sitemap.xml",
            "/site.webmanifest": "public/site.webmanifest",
            "/og-image.png": "public/og-image.png",
            "/twitter-image.png": "public/twitter-image.png",
            "/logo.png": "public/logo.png",
            "/apple-touch-icon.png": "public/apple-touch-icon.png",
            "/favicon-32x32.png": "public/favicon-32x32.png",
            "/favicon-16x16.png": "public/favicon-16x16.png",
            "/android-chrome-192x192.png": "public/android-chrome-192x192.png",
            "/android-chrome-512x512.png": "public/android-chrome-512x512.png",
          };
          const requestedPath = req.url?.split("?")[0] ?? "";
          const filePath =
            staticFiles[requestedPath as keyof typeof staticFiles];

          if (filePath) {
            try {
              const content = fs.readFileSync(path.resolve(filePath));
              const contentType =
                {
                  ".txt": "text/plain",
                  ".xml": "application/xml",
                  ".webmanifest": "application/manifest+json",
                  ".svg": "image/svg+xml",
                  ".png": "image/png",
                  ".ico": "image/x-icon",
                }[path.extname(filePath)] ?? "application/octet-stream";

              res.setHeader("Content-Type", contentType);
              res.end(content);
              return;
            } catch (error) {
              console.error(`Error serving ${filePath}:`, error);
            }
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    host: true,
  },
  base: "/",
  root: process.cwd(),
  publicDir: "public",
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          translations: ["./src/translations"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
