import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/auth/",
  server: {
    host: "core1-phx.jd.nseng.dev",
    allowedHosts: ["core1-phx.jd.nseng.dev"],
  }
})
