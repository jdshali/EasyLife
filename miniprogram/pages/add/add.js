// miniprogram/pages/add.js
import recordCatogary from './type'
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // income: recordCatogary.income,
    // expenditure: recordCatogary.expenditure,
    recordType: '',
    list:[],
    show: false
  },

  addRecord:function (e) {
    let cid = e.currentTarget.dataset['cid'];
    this.setData({
      show: true,
      recordType: cid - 1 
    })
  },
   //keyboard自定义事件 
  onMyEvent: function(e){
    console.log('----onMyEvent----', e);
    db.collection('easyLife_record').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        recode_amount: e.detail.content,
        recode_date: new Date(),
        record_desc: e.detail.desc,
        record_type: this.data.recordType
      }
    })
    .then(res => {
      console.log(res)
    })
    this.setData({
      show: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(recordCatogary.expenditure);
    this.setData({
      list: recordCatogary.expenditure
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})