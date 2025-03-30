import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    host: true,  // Allows external access
    port: 5173,  // Ensure this matches your Ngrok tunnel
    strictPort: true, // Ensures the server runs only on the specified port
    allowedHosts: ['.ngrok-free.app'], // Allows Ngrok subdomains
  }
})
