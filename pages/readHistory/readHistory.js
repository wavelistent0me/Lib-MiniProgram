// pages/readHistory/readHistory.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        readHistory: [],
    },
    goChapterInfo(e) {
        wx.navigateTo({url: "/pages/chapterInfo/chapterInfo?chapterId=" + e.currentTarget.dataset.item.id
                + "&bookName=" + e.currentTarget.dataset.item.bookName});
    },
    deleteHistory(e) {
        this.data.readHistory.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            readHistory: this.data.readHistory
        })
        wx.setStorageSync('readHistory', this.data.readHistory);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var readHistory = wx.getStorageSync('readHistory');
        this.setData({
            readHistory: readHistory
        })
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
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})