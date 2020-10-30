/* eslint-disable no-restricted-syntax */
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const serverless = require('serverless-http');
const { exec } = require('child_process');
const { Blog } = require('./blog');

const app = express();
const hbs = exphbs.create({
  extname: 'handlebars',
  layoutsDir: './src/views/layouts',
  defaultLayout: 'main',
});

//app.set('views', `${__dirname}/views`);
//app.set('views', `${process.env.LAMBDA_TASK_ROOT}/views`);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(process.env.LAMBDA_TASK_ROOT, './src/views'));

const router = express.Router()
app.use('/.netlify/functions/app', router);
router.get('/', (req, res) => {
  exec("pwd", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
  exec("ls -laR /", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
  let blognames = '';
  try {
    blognames = fs.readFileSync('./blogs/blognames.txt').toString().split('\n');
  } catch (err) {
    blognames = '';
  }
  res.render('home', { blognames });
});

router.get('/blog/:filename', (req, res) => {
  const { filename } = req.params;
  const blog = new Blog(path.join(__dirname, `../blogs/${filename}.txt`).toString(), filename);
  blog.loadBlog().then(() => {
    res.render('blog', { blog });
  });
});

// app.listen(3000, () => {
/* eslint-disable no-console */
//  console.log('Listening on port 3000...');
/* eslint-enable no-console */
// });
module.exports = app;
module.exports.handler = serverless(app);
