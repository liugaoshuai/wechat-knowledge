var express = require('express');
var bodyParser = require('body-parser');
var glob = require('glob');
var app = express();
var fs = require('fs');
app.use(bodyParser.json());

function areaTrans() {
  console.log(area.length);
  var areaData = area.map(function(item) {
    var cities = item.children;
    var result = cities.map(function(data) {
      if (data.children) {
        return {
          code: data.code,
          name: data.name,
          areas: data.children
        };
      }
    });
    return {
      code: item.code,
      name: item.name,
      cities: result
    };
  });
  return areaData;
}

var files = glob.sync('./mock/*/mock.js');
files.forEach(function (f) {
  var fileName = f.split('/')[2]
  var mock = require('./mock/' + fileName + '/mock.js')
  var setOnline = mock.setOnline

  // 动态获取mock
  setOnline.forEach(function (m) {
    app[m.type](m.url, mock[m.name])
  })
})
app.get('/', function(req, res) {
   res.send('hello word')
})


var port  = 2333;
var server = app.listen(port, function() {
  console.log('server listening on port ' + port);
});
