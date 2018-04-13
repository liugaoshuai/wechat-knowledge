import base from './base';
import goods from './goods';
import shop from './shop';

export default class config extends base {
  static fieldsToCopy = {
    SWIPER: ['height'],
    IMAGE_BOX: ['heigth', 'width', 'isTitle'],
    GOODS_BOX: ['isCart', 'isPrice', 'isGoodsName', 'isSales', 'skuMode', 'isTips']
  };

  static discount = null;

  /**
   * 获取布局视图
   */
  static layout(pageId) {
    const url = `${this.baseUrl}/layout/pages/${pageId}`;
    return this.get(url).then(data => this._processPage(data.message));
  }


  // *** 数据处理方法
  /**
   * 处理页面
   */
  static _processPage(data) {
    if (data == null || data == '') {
      return null;
    }
    const config = JSON.parse(data);
    const components = this.processComponents(config.components);
    const {plugins, triggers} = this.processPlugins(config.plugins);
    const param = this.processPageParam(config.param);
    return {
      components, plugins, triggers, param
    }
  }

  /**
   * 处理页面的配置参数
   */
  static processPageParam(data) {
    if (data == null || data == '') {
      return {};
    } else {
      return JSON.parse(data);
    }
  }

  /**
   * 处理页面的插件与触发器
   */
  static processPlugins (data) {
    const plugins = [];
    const triggers = [];
    data.forEach(item => {
      if (item.param) {
        const param = JSON.parse(item.param);
        Object.assign(item, param);
        item.param = null;
      }
      if (item.type.indexOf('_TRIGGER') != -1) {
        triggers.push(item);
      } else {
        plugins.push(item);
      }
    });
    return {triggers, plugins};
  }

  /**
   * 处理页面的组件
   */
  static processComponents (components) {
    return components
      .map(component => {
        // 先处理参数合并
        if (component.param) {
          const param = JSON.parse(component.param);
          Object.assign(component, param);
          component.param = null;
        }
        // 处理内嵌数据
        if (component.data) {
          component.data = JSON.parse(component.data);
        }
        // 需要处理商品信息
        if (component.type == 'GOODS_BOX') {
          component.data.forEach(item => {
            goods._processGoodsDiscount(item, this.discount);
            goods._processGoodsData(item);
          });
        }
        // 特殊处理图片窗格
        if (component.type == 'IMAGE_BOX') {
          if (component.padding == null) {
            component.padding = '10rpx;';
          }
        }
        return this.copyParamToData(component);
      });
  }

  /**
   * 拷贝配置参数
   */
  static copyParamToData(component) {
    const {data, type} = component;
    const fields = this.fieldsToCopy[type];
    if (fields != null) {
      data.forEach(item => {
        fields.forEach(field => {
          item[field] = component[field];
        });
      });
    }
    return component;
  }
}
