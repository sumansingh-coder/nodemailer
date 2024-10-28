var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Error parsing the file.');
        return;
      }
      
      console.log(files); // Log the entire files object
      
      if (!files.filetoupload) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('No file uploaded.');
        return;
      }

      var oldpath = files.filetoupload[0].filepath; // Use 'path'
      console.log(oldpath);
      
      var newpath = 'C:/Users/Hello/test/' + files.filetoupload[0].originalFilename;
      console.log(newpath);
      
      fs.rename(oldpath, newpath, function (err) {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Error moving the file.');
          throw err;
        }
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);
