const fs = require('fs').promises;

class Blog {
  constructor(filename, title) {
    this.Title = title;
    this.Summary = '';
    this.Body = '';
    this.Filename = filename;
  }

  async loadBlog() {
    try {
      const data = await fs.readFile(this.Filename);
      this.Body = data.toString();
    } catch (error) {
      this.Body = error;
    }
  }
}
module.exports = {
  Blog,
};
