const fs = require('fs')

fs.readdir('./commands', (err, files) => {
  if (err) throw err
  for (var file of files) {
    if (file === 'index.js') continue
    module.exports[file.split('.')[0]] = require('./' + file)
  }
})
