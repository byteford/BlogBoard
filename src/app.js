const express = require('express');
const exphbs = require('express-handlebars');
const { Blog } = require('./blog');

const app = express();
const hbs = exphbs.create({
  extname: 'handlebars',
  layoutsDir: './src/views/layouts',
  defaultLayout: 'main',
});
app.set('views', `${__dirname}/views`);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/blog/:filename', (req, res) => {
  const { filename } = req.params;
  const blog = new Blog(filename);
  res.render('blog', { blog });
});

app.listen(3000, () => {
  /* eslint-disable no-console */
  console.log('Listening on port 3000...');
  /* eslint-enable no-console */
});
