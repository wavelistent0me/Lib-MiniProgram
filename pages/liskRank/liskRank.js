// pages/rank/rank.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        ind: 0,
        rlist: [],
    },
    getBookList() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/book/getRankBook',
            method: 'Get',
            data: {},
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        list: res.data.data.list,
                    })
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    getRecommendList() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/book/getRecommendList',
            method: 'Get',
            data: {},
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        rlist: res.data.data.list,
                    })
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    clickTab(e) {
        this.setData({
            ind: e.currentTarget.dataset.ind
        })
    },
    goBookInfo(e) {
        wx.navigateTo({
            url: `/pages/bookInfo/bookInfo?id=` + e.currentTarget.dataset.item.id,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        this.getBookList();
        this.getRecommendList();
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