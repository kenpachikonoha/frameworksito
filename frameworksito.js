const http = require('http');
const { Frameworsito } = require('./routes');
const routerGet = '/get'
const routerPost = '/post'

const router = new Frameworsito();

router.get(routerGet, () => {
  return 'Hello World';
});

router.post(routerPost, async (body) => {
  const valur = body.num1 + body.num2;  
  return valur.toString();

});

router.get('/get/:id/:edad/:ciudad/data', (params) => {
  return `Hello World ${params.id}, tienes la edad de ${params.edad} vives en ${params.ciudad}`;
});
const server = http.createServer((req, res) => {

     router.handleRoutes(req, res);

});

server.listen(8081, () => {
  console.log('Server is running as a suanfazon!');
});


