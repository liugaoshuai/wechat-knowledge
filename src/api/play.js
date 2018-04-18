import wepy from 'wepy';
import base from './base';

export default class play extends base {

  /**
   * 获取播放页数据
   */
  static async getAudioData() {
    const url = `${this.baseUrl}/play/detail`;
    const playDetail = await this.get(url);
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
    let hh = Math.floor(time / 3600) || 0;
    let mm = Math.floor((time % 3600) / 60) || 0;
    let ss = time % 60 || 0;
    let hour = this.formatTime(hh) === '00' ? '' : (this.formatTime(hh) + ':');
    return hour + this.formatTime(mm) + ':' + this.formatTime(ss);
  }

  static formatTime(val) {
    return val < 10 ? '0'+ val : val;
  }

}
