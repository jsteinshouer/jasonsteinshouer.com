---
layout: post
title: "How To Create a Dynamic Alias for Vue in Vite"
date: 2023-03-16
tags: [Vite,Vue.js]
excerpt: "I worked around the issue but setting up a Vite/Rollup alias for Vue that was dynamic based on if I was building for production or in dev mode"
permalink: "dynamic-alias-in-vite.html"
---

I have a case where I am using Vite to bundle my Javascript for using in multiple pages but is not a single-page application. It was working when running in development mode but when I would build for production I was getting an error because it was using the runtime only distribution of Vue. 

Here is an [explanation of the different Vue distributions](https://v2.vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds). As I understand it, typically all your Vue templates would get compiled at build time so the runtime only version excludes the template parser so that it is slimmer and more efficient. In this case I have Vue templates that are not compiled at build time. 

I worked around the issue but setting up a [Vite/Rollup alias](https://vitejs.dev/config/shared-options.html#resolve-alias) for Vue that was dynamic based on if I was building for production or in dev mode.

In `vite.config.js` I defined a constant to contain the path to the [Vue distribution](https://v2.vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds) I wanted to use. I set it to the full production version if it is running in production mode (Which is the default for the `build` command). I set it to the full esm version as the default for running in development mode.

Here is the `vite.config.js` file. I left out the full build configuration for brevity. 

```javascript
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig(({ command, mode }) => {
    const VUE_PATH = mode == 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.esm.js';
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                'vue': VUE_PATH
            }
        },
        build: {
				...
				}
		}
})
```