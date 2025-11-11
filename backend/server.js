import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT ?? 4000
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${port}`)
  console.log(`📘 Documentación disponible en: http://localhost:${port}/api-docs`)
})
