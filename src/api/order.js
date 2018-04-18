import wepy from 'wepy';
import base from './base';

export default class order extends base {

  /**
   * 拉起支付
   */
  static async buy({itemId, itemType}) {
    const orderId = await this.placeOrder({itemId, itemType});
    const payment = await this.wxPrePay({orderId});
    const {requestPayment} = await this.wxPay(payment);
    return requestPayment
  }

  /**
   * 下单
   */
  static async placeOrder({itemId, itemType}) {
    const url = `${this.baseUrl}/order/submit`;
    const orderId = await this.post(url, {itemId, itemType});
    return orderId;
  }
  
 /**
   * 预支付
   */
  static async wxPrePay({orderId}) {
    const payType = 'WECHATWXAPAY';
    const url = `${this.baseUrl}/pay/submit`;
    const payment = await this.post(url, {orderId, payType});
    return payment;
  }
  
  /**
   * 支付
   */
  static async wxPay(payment) {
    return await wepy.requestPayment(payment);
  }
  
  

}
