import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import richSvg from "vite-plugin-react-rich-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),richSvg()],
  server: {host: '0.0.0.0'},
  build :{
    rollupOptions : {
      external: ["react", "react-router", "react-router-dom", "react-redux"],
      output: {
        globals: {
          react: "React",
        },
      }
    }
  },
  
})
