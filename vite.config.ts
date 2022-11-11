import legacy from '@vitejs/plugin-legacy'
import svgLoader from 'vite-svg-loader'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
      svgLoader()
  ],
  css: {
    preprocessorOptions: {
      scss: { additionalData: '@import "src/styles/_grid.scss";' },
    },
  },
}
