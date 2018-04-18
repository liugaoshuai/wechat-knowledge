/**
 * @note   setOnline 线上接口 配置
 * @param  name  本地接口名
 *         type  接口类型
 *         url   线上接口地址
 */
var fs = require('fs');
var setOnline = [
  { 
    name: 'layout',
    type: 'get',
    url: '/floor/page'
  },
  { 
    name: 'title',
    type: 'get',
    url: '/floor/Title/1'
  },
  { 
    name: 'swiper',
    type: 'get',
    url: '/floor/SWIPER/2'
  },
  { 
    name: 'goodsbox',
    type: 'get',
    url: '/floor/GOODS_BOX/3'
  },
  { 
    name: 'blank',
    type: 'get',
    url: '/floor/BLANK/4'
  },
  { 
    name: '',
    type: 'get',
    url: ''
  }
];

// 输出配置项
exports.setOnline = setOnline;

// 遍历输出json数据
for (var i = 0, len = setOnline.length; i < len; i++) {
  (function() {
    var name = setOnline[i].name;

    exports[name] = function(req, res) {
      fs.readFile('./mock/template/' + name + '.json', function(err, data) {
        if (err) throw err;
        
        res.json(JSON.parse(data));
      });
    };
  })(i);
}

