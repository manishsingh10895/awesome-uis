const { resolve } = require('path');

/**
 * @type {import('vite').UserConfig}
 */
const config = {
    base: "/awesome-uis/",
    mode: "randua",
    build: {
        outDir: "docs",
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'tilt-card': resolve(__dirname, 'tilt-card.html'),
                'canvas-image': resolve(__dirname, 'canvas-image.html')
            }
        }
        // base: "/awesome-uis/"
    },
}

export default config;