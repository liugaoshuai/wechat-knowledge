### 安装（更新） wepy 命令行工具。
	cnpm install wepy-cli -g

### 安装依赖包
	cnpm install

### 开发实时编译。
	npm run dev

### 生产
	npm run build

### 本地mock数据
    npm run start

### 开发使用说明

- 使用微信开发者工具-->添加项目，选择dist目录；
- 可以使用体验APPID；
- 关闭ES6转ES5；
- 关闭上传代码时样式自动补；
- 关闭代码压缩上传；
- 打开不校验合法域名；

本地项目根目录运行npm run dev，开启实时编译。

### wepy开发文档地址
	https://tencent.github.io/wepy/

### 小程序开发文档
	http://mp.weixin.qq.com/debug/wxadoc/dev/
    
### 目录结构
    
    ├── api
    │   └── api.js              //接口
    ├── app.wpy                 //入口文件
    ├── components                  //组件  
    │   ├── common              //公共组件
    │   │   ├── bottomLoadMore.wpy      //底部加载更多组件
    │   │   ├── placeholder.wpy         //空列表显示组件
    │   │   └── formSubmitBar.wpy   //
    │   ├── bomb_screen.wpy     //首页弹层组件
    │   ├── copy_popup.wpy      //淘口令弹层组件
    │   ├── goodskill.wpy       //抢购组件
    │   ├── goodsList.wpy       //商品列表组件
    │   ├── searchGoods.wpy     //搜索商品列表组件
    │   ├── search.wpy          //搜索组件
    │   └── tab.wpy             //TAB组件
    ├── images                  //图片文件夹
    ├── pages                   //页面
    │   ├── contact.wpy         //客服
    │   ├── describe.wpy        //说明
    │   ├── goods_detail.wpy    //商品详情
    │   ├── home.wpy            //首页
    │   ├── robindex.wpy        //抢购专场
    │   ├── myzone.wpy          //我的
    │   ├── search.wpy          //搜索
    │   └── spacial.wpy         //普通专场   
    ├── styles                  //样式
    │   ├── base.less
    │   ├── icon.less           // 图标文件
    │   └── style.less
    └── utils                   //工具类
        ├── tip.js                  //提示弹框组件
        ├── util.js                 //工具
        └── wxRequest.js            //ajax请求

