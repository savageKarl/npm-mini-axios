export function adapter(
  config: WechatMiniprogram.RequestOption<
    string | WechatMiniprogram.IAnyObject | ArrayBuffer
  >
) {
  return new Promise((resovle, reject) => {
    wx.request({
      ...config,
      success(res) {
        resovle(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
}
