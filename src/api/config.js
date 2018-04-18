import base from './base';
import goods from './goods';
import shop from './shop';

export default class config extends base {

  /**
   * 获取布局视图
   */
  static layout(appId) {
    const url = `${this.baseUrl}/floor/page?isHome=true`;
    return this.get(url, {appId}).then(data => {return data});
  }

  /**
   * 获取模块数据
   */
  static async component(floorType, componentId) {
    const url = `${this.baseUrl}/floor/${floorType}/${componentId}`;
    return this.get(url);
  }

  // *** 数据处理方法
  /**
   * 处理页面
   */
  static processPage(layout, page) {
    if (page == null || page == '') {
      return null;
    }
    const components = this.processComponents(page);
    const params = this.processPageParam(layout);
    return {
      components, params
    }
  }

  /**
   * 处理页面的配置参数
   */
  static processPageParam(layout) {
    if (layout == null || layout == '') {
      return {};
    } else {
      const {pageTitle, backgroundColor} = layout;
      const {shareDescribe, sharePictureUrl} = layout;
      const navigation = {pageTitle, backgroundColor};
      const shareConfig = {shareDescribe, sharePictureUrl};
      const params = {navigation, shareConfig};
      return params;
    }
  }

  /**
   * 处理页面的组件
   */
  static processComponents (page) {
    page.map(component => {
      // 处理商品组模块数据
      if (component.componentType === 'GOODS_BOX') {
        component.tabs.forEach(tab => {
          tab.goods.forEach(good => {
            if (good.checkPower || !good.price) {
              good.fetchText = '播放';
            } else {
              if (good.watchable) {
               good.fetchText = '试听';
              } else {
               good.fetchText = '购买';
              }
            }
          })
        })
      }
    })
    return page;
  }

}
