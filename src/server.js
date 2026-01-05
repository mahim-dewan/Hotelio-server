// src/server.js

const app = require("./app");
const port = process.env.PORT;

// Manually start the server for local development
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
