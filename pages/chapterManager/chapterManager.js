// pages/chapterManager/chapterManager.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookId: '',
        list: [],
    },
    goChapterEdit() {
        wx.navigateTo({url: "/pages/chapterEdit/chapterEdit?bookId=" + this.data.bookId});
    },
    getChapterList() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/chapter/getChapterList',
            method: 'Post',
            data: {
                bookId: that.data.bookId
            },
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
    goEdit(e) {
        wx.navigateTo({
            url: `/pages/chapterEdit/chapterEdit?id=` + e.currentTarget.dataset.item.id,
        });
    },
    deleteChapter(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/chapter/deleteChapter',
            method: 'POST',
            data: {
                id: e.currentTarget.dataset.item.id,
            },
            success(res) {
                if (res.data.code == 200) {
                    wx.showToast({icon: "none", title: res.data.msg});
                    that.getChapterList();
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            bookId: options.id
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
        this.getChapterList()
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