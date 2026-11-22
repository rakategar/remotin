import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// In dev, serve /api/contact with the same handler Vercel runs in production.
// Set CONTACT_DRY_RUN=1 to test the form without sending real email.
const devApi = (): Plugin => ({
  name: 'dev-api',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (req, res) => {
      // no @types/node here, so treat the request as a minimal event emitter
      const stream = req as unknown as { on(ev: string, cb: (chunk?: unknown) => void): void }
      const raw = await new Promise<string>((ok) => {
        let buf = ''
        stream.on('data', (c) => (buf += String(c)))
        stream.on('end', () => ok(buf))
      })
      const { default: handler } = await server.ssrLoadModule('/api/contact.js')
      const shim = Object.assign(res, {
        status(code: number) {
          res.statusCode = code
          return shim
        },
        json(obj: unknown) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(obj))
        },
      })
      await handler(Object.assign(req, { body: raw }), shim)
    })
  },
})

export default defineConfig({
  plugins: [react(), devApi()],
  server: { port: 5190 },
})
