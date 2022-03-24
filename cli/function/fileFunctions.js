const fs = require("fs");

module.exports = {
  isDirectory: (path) => {
    return fs.lstatSync(path).isDirectory();
  },

  getSuffix: (fileName) => {
    const name = fileName.split(".");
    return name.length > 1 ? name.pop() : "";
  },

  filterSuffix: (items, suffix) => {
    suffix = Array.isArray(suffix) ? suffix : [suffix];
    return items.filter(
      (item) => suffix.indexOf(getSuffix(item).toLowerCase()) !== -1
    );
  },

  dirFiles: (path, suffix) => {
    const files = fs.readdirSync(path);

    suffix = Array.isArray(suffix) ? suffix : [suffix];

    if (suffix) {
      return filterSuffix(files, suffix);
    } else {
      return files;
    }
  },
};
