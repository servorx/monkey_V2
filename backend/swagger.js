import swaggerAutogen from 'swagger-autogen'

// eslint-disable-next-line no-unused-vars
const doc = {
  info: {
    title: 'API de Monkeytype',
    description: 'Documentación de la API para la gestión del sistema Monkeytype 🐒'
  },
  host: 'localhost:4000',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app.js']

const swaggerAutogenInstance = swaggerAutogen()

swaggerAutogenInstance(outputFile, endpointsFiles).then(() => {
  console.log('✅ Swagger JSON generado correctamente.')
})
