/* eslint-disable no-undef */
const path = require('path');
const { Blog } = require('./blog');

test('Loads a file correctly', async () => {
  const blog = new Blog(path.join(__dirname, '../test-data.txt').toString(), 'title');
  await blog.loadBlog();
  expect(blog.Body).toBe('this is text data');
});
