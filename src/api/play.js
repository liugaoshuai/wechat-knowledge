import wepy from 'wepy';
import base from './base';

export default class shop extends base {
  static TYPE = {
    '1': {
      key: '1',
      name: '在线商城',
      badgeText: '商城',
      basicName: '商品展示',
      basicBadgeText: '商城'
    },
    '2': {
      key: '2',
      name: '点外卖',
      badgeText: '外卖',
      basicName: '在线菜单',
      basicBadgeText: '菜单'
    }
  };

  /**
   * 获取播放页数据
   */
  static async getPlayDetail() {
    const url = `${this.baseUrl}/play/detail`;
    const {playDetail} = await this.get(url);
    return playDetail;
  }
  
 /**
   * 获取播放列表
   */
  static async getPlayList() {
    const url = `${this.baseUrl}/play/list`;
    const {playList} = await this.get(url);
    return playList;
  }
  
  /**
   * 时间格式化
   */
  static fmtTime(time) {
    let hh = Math.floor(time / 3600);
    let mm = Math.floor((time % 3600) / 60);
    let ss = time % 60;

    return this.formatTime(hh) + ':' + this.formatTime(mm) + ':' + this.formatTime(ss);
  }

  static formatTime(val) {
    return val < 10 ? '0'+ val : val;
  }

  /**
   * 上报FORM
   */
  static reportFormId(id, delay = 3000) {
    try {
      const url = `${this.baseUrl}/visit_shops/form_id`;
      const param = [{
        formId: id
      }];
      if (delay > 0) {
        setTimeout(() => {
          this.post(url, param, false);
        }, delay);
      } else {
        this.post(url, param, false);
      }
    } catch (e) {
      console.warn('formid上报错误', e);
    }
  }
}
