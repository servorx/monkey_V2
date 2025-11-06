import swaggerAutogen from 'swagger-autogen'

export const doc = {
  info: {
    title: 'API de monkeytype',
    description: 'Documentación de la API para la gestión de mascotas'
  },
  host: 'localhost:4000',
  schemes: ['http']
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app.js'] // Cambia este archivo según el punto de entrada de tu API

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./app.js') // Inicia el servidor automáticamente
})
