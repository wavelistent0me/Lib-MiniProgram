// pages/favorite/favorite.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
    },
    getFavoriteList() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/like/getMyLikeList',
            method: 'Get',
            data: {
                userId: wx.getStorageSync('id'),
            },
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        list: res.data.data.bookList,
                    })
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
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
        this.getFavoriteList();
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