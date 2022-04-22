---
layout: post
title: "My Notes on Migrating from Vue CLI to Vite"
date: 2022-04-18
tags: [Vue.js, Vite]
excerpt: "This is the second part of a series documenting my notes from migrating a Vue.js application to Vue 3 + Vite."
permalink: "vite-migration-notes.html"
---

This is the second part of a series documenting my notes from migrating a Vue.js application to Vue 3 + [Vite](https://vitejs.dev/). This post is focused on moving from Vue CLI to Vite for my development tooling. See my [last post](/vue3-migration-notes.html) where I documented my notes from migrating from Vue 2 to Vue 3. See the [pull request](https://github.com/jsteinshouer/movie-list-app/pull/6/files) if for all the changes.

### Index.html

Vite expects the entry point to be index.html in the application root directory so I removed `public/index.htm` I added the following `index.html` to the root from an example Vite app.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### NPM Scripts

I removed the Vue CLI scripts and added some for Vite.

```diff
"scripts": {
-    "serve": "vue-cli-service serve",
-    "build": "vue-cli-service build",
-    "lint": "vue-cli-service lint",
+    "dev": "vite --port 3000 --host",
+    "build": "vite build",
+    "preview": "vite preview --port 3000",
...
```

### Dev Dependencies

I removed the Vue CLI dev dependencies and added Vite and the Vite Vue plugin.

```diff
"devDependencies": {
-     "@vue/babel-preset-app": "^4.5.13",
-     "@vue/cli-plugin-babel": "^4.5.13",
-     "@vue/cli-plugin-eslint": "^4.5.13",
-     "@vue/cli-plugin-router": "^4.5.13",
-     "@vue/cli-service": "~4.5.0",
-     "vue-cli-plugin-axios": "0.0.4",
-     "vue-template-compiler": "^2.6.11"
+     "@vitejs/plugin-vue": "^2.2.2",
+     "vite": "^2.8.4"
```

### Add extensions for .vue components

Because Vite uses native ESM modules you need to provide the file extension for .vue components. i.e.

```diff-javascript
-   import NavBar from '@/components/NavBar';
+   import NavBar from '@/components/NavBar.vue'
```

## Vite Config

I removed my `vue.config.js` file and added `vite.config.js` for my Vite configuration. One thing to mention is that I had setup Vue CLI to proxy API requests to a backend service. Vite has this capability as well. Use the [server.proxy configuration](https://vitejs.dev/config/#server-proxy) to set it up.

```javascript
server: {
    proxy: {
      '/api': {
        target: 'http://my-backend-server:8080',
        changeOrigin: true,
        cookieDomainRewrite: "localhost"
      },
```

Full configuration here:

```javascript
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://my-backend-server:8080',
        changeOrigin: true,
        cookieDomainRewrite: "localhost"
      },
      '/tests': {
        target: 'http://my-backend-server:8080',
        changeOrigin: true,
        cookieDomainRewrite: "localhost"
      }
    }
  }
})
```

The application I migrated is small but it did not seem as complicated as I expected. Both the Vue.js and Vite documentation is top notch.

### Resources

- [Vite Guide](https://vitejs.dev/guide/)

### Related Posts
- [My Notes on Migrating to Vue 3](/vue3-migration-notes.html)