import express from 'express';
import path from 'path';
import sslRedirect from "heroku-ssl-redirect";

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 8000;
}

const app = express();
app.use(express.static(path.resolve(__dirname, '..', 'build')))
app.use(sslRedirect());
app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});