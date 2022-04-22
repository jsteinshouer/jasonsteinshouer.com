---
layout: post
title: "My Notes on Migrating to Vue 3"
date: 2022-04-16
tags: [Vue.js]
excerpt: "I recently migrated a small application from Vue 2 to Vue 3 and wanted to record my notes here for future reference."
permalink: "vue3-migration-notes.html"
---

I recently migrated a small application from Vue 2 to [Vue 3](https://vuejs.org/) and wanted to record my notes here for future reference. I also migrated from Vue CLI to [Vite](https://vitejs.dev/) at the same time but am putting those notes into a separate post. Here is a link to the [pull request](https://github.com/jsteinshouer/movie-list-app/pull/6/files) if you want to see all the changes. 

### Package.json dependencies

I started out by updating my `package.json` dependencies. I upgraded Vue and VueRouter to the latest versions at the time of this writing.

```diff-json
-     "vue": "^2.6.11",
-     "vue-router": "^3.2.0"
+     "vue": "^3.2.31",
+     "vue-router": "^4.0.5"
```

### Mount App

Vue 2 used a global instance of Vue to mount the application in the DOM. Vue 3 now uses `createApp` to create an application instance.

`src/main.js`

```diff-javascript
-  import Vue from 'vue'
+  import { createApp } from 'vue'
...
-  new Vue({
-    router,
-    render: h => h(App)
-  }).$mount('#app')
+  const app = createApp(App)
+  app.mount('#app')
```

### Axios Plugin

The Vue CLI had generated some plugin code that added Axios integration into my Vue 2 application. Many plugins would install themselves directly into the Global Vue instance. This does not work with Vue 3 because plugins are installed into the application instance instead of the global Vue instance. 

Here are the changes I made to the plugin code to get it to work.

The first change was to remove the import for the global Vue instance.

```diff-javascript
-  import Vue from 'vue';
```

Vue plugins expose an install method. I was able to simplify it by setting my Axios instance as a global property of the Vue application.

```diff-javascript
app.config.globalProperties.axios = _axios;
```

Here are the full set of changes.

```diff-javascript
-  import Vue from 'vue';
...
-  Plugin.install = function(Vue) {
-     window.axios = _axios;
-     Vue.axios = _axios;
-     Object.defineProperties(Vue.prototype, {
-         axios: {
-             get() {
-                 return _axios;
-             }
-         },
-         $axios: {
-             get() {
-                 return _axios;
-             }
-         },
-     });
- };
+ let install = function(app) {
+    app.config.globalProperties.axios = _axios;
+ };

- Vue.use(Plugin)

- export default Plugin;
+ export default { install };
```

The code `Vue.use(Plugin)` is removed and needs to be moved to `srcs/main.js` file so that it is applied to the application instance. This is what actually installs the plugin so it can be used in the application.

```javascript
import axios from '@/plugins/axios'
...
const app = createApp(App)
...
app.use(axios)

app.mount('#app')
```

## Vue Router

As I mentioned previously I had to update Vue Router to v4+ to be compatible with Vue 3. Similar to the Axios plugin the Vue Router configuration also needed to be changed as well. Following the convention of Vue itself Vue Router now exposes `createRouter` to use for setup of the router.

### src/router/index.js

First I had to change the import statements.

```diff-javascript
- import Vue from 'vue'
- import VueRouter from 'vue-router'
+ import { createRouter, createWebHistory } from 'vue-router'
```

I then removed the statement to tell Vue to use it.

```diff-javascript
- Vue.use(VueRouter)
```

Here is where `createRouter` is used to create the router instance instead if `VueRouter`.

```diff-javascript
- const router = new VueRouter({
-   mode: 'history',
-   routes
- })
+ const router = createRouter({
+ 	history: createWebHistory(),
+ 	routes,
+ })
```

## Reactivity

My app was using `Vue.observable` to create a reactive object for sharing state across multiple components. There is a new [Reactivity API](https://vuejs.org/api/reactivity-core.html) for this in Vue 3. 

```diff-javascript
- import Vue from 'vue';
- export default Vue.observable({
+ import { reactive } from 'vue';
+ export default reactive({
...
});
```

Hope these notes may help someone else or future me. Again, you can see the [pull request](https://github.com/jsteinshouer/movie-list-app/pull/6) for all the changes including the migration to Vite for a development server.

### Resources

- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Vue.js Guide](https://vuejs.org/guide/introduction.html)

### Related Posts

- [My Notes on Migrating from Vue CLI to Vite](vite-migration-notes.html)