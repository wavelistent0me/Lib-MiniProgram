// pages/noteManager/noteManager.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
    },
    getNoteList() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/note/getNoteList',
            method: 'POST',
            data: {
                userId: wx.getStorageSync('id'),
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
    deleteNote(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/note/deleteNote',
            method: 'POST',
            data: {
                id: e.currentTarget.dataset.item.id,
            },
            success(res) {
                if (res.data.code == 200) {
                    wx.showToast({icon: "none", title: res.data.msg});
                    that.getNoteList();
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
        this.getNoteList();
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