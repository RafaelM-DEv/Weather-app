import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'

export default defineConfig({
  plugins: [vue()]
  // publicPath: process.env.NODE_ENV === 'production'
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src')
  //   }
  // }
})

// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/REPO_NAME/'
//     : '/'
// }
