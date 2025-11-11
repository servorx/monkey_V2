import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'API de MonkeyType',
    description: 'Documentación de la API para la gestión de mascotas'
  },
  host: 'localhost:4000',
  schemes: ['http']
}

const outputFile = './src/swagger_output.json'
const endpointsFiles = ['./app.js']

const swaggerAutogenInstance = swaggerAutogen()

swaggerAutogenInstance(outputFile, endpointsFiles).then(async () => {
  console.log('✅ Swagger JSON generado correctamente.')
})
