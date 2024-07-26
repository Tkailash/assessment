const corsAnywhere = require('cors-anywhere');

const host = 'localhost';
const port = 8080;

corsAnywhere.createServer({
  originWhitelist: [], 
}).listen(port, host, () => {
  console.log(`Running CORS Anywhere on ${host}:${port}`);
});
