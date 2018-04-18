import base from './base'
import wepy from 'wepy';
import WxUtils from '../utils/WxUtils';

/**
 * 权限服务类
 */
export default class auth extends base {
  /**
   * 一键登录
   */
  static async login() {
    const loginCode = this.getConfig('login_code');
    if (loginCode != null && loginCode != '') {

    } else {
      console.warn('login code not exists', loginCode);
      await this.doLogin();
    }
  }

  /**
   * 获取用户信息
   */
  static async user(param = {block: false, redirect: false}, userInfo) {
    try {
      // 检查
      if (this.hasConfig('user')) {
        // store.save('user', this.getConfig('user'));
        return true;
      }
      console.info('[auth] user check fail');
      // 重新登录
      await this.doLogin();
      // 获取用户信息
      const rawUser = userInfo != null ? userInfo : await wepy.getUserInfo();
      // 检查是否通过
      // await this.checkUserInfo(rawUser);
      // 解密信息
      const {user} = await this.decodeUserInfo(rawUser);
      // 保存登录信息
      await this.setConfig('user', user);
      // store.save('user', user);
      return true;
    } catch (error) {
      console.error('[auth] 授权失败', error);
      if (param.block) {
        const url = `/pages/home/login?redirect=${param.redirect}`;
        if (param.redirect) {
          WxUtils.backOrRedirect(url);
        } else {
          WxUtils.backOrNavigate(url);
        }
      }
      return false;
    }
  }

  /**
   * 服务端检查数据完整性
   */
  static async getToken(code) {
    wepy.getUserInfo().then(
      async res => {
        const {rawData, signature, encryptedData, iv} = res;
        const url = `${this.baseUrl}/login?code=${code}&appId=wx67c98c6a669003c4`;
        return await this.get(url, {rawData, signature, encryptedData, iv});
        await this.setConfig('tk', tk);
      },
      err => {}
      );
  }


  /**
   * 执行登录操作
   */
  static async doLogin() {
    const {code} = await wepy.login();
    const {tk} = await this.getToken(code);
    await this.setConfig('tk', tk);
  }

  /**
   * 获取登录态token
   */
  static async session(code, params) {
    const url = `${this.baseUrl}/login?code=${code}&appId=wx67c98c6a669003c4`;
    return await this.get(url, params);
  }


  /**
   * 读取权限值
   */
  static getConfig(key) {
    return wepy.$instance.globalData.auth[key];
  }

  /**
   * 检查是否存在权限值
   */
  static hasConfig(key) {
    const value = this.getConfig(key);
    return value != null && value != '';
  }

  /**
   * 设置权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({key: key, data: value});
    wepy.$instance.globalData.auth[key] = value;
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    console.info(`[auth] clear auth config [${key}]`);
    wepy.$instance.globalData.auth[key] = null;
    await wepy.removeStorage({key: key});
  }
}
