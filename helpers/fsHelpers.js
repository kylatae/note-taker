const fs = require('fs');

function readFromFile(filename, encoding = "utf-8", cb = null){
  fs.readFile(filename, encoding, (err, data) => {
    if(cb){
      cb(err, data)
    } else {
      if( err ) return console.log(err)
      return data
    }
  })
}

function writeToFile(filename, data, cb = null){
  const stringedData = JSON.stringify(data, null, 4)
  fs.writeFile(filename, stringedData, (err) => {
    if( cb ) return cb(err)
    if( err ) console.info(`\nData written to ${filename}`)
  })
}

function readAndAppend(newData, filename, cb = null){
  readFromFile(filename, 'utf8', (err, oldData) => {
    if (err) return console.error(err);
    const parsedData = JSON.parse(oldData);
    parsedData.push(newData);
    writeToFile(filename, parsedData);
  });
}


module.exports = { readFromFile, writeToFile, readAndAppend };
