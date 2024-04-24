// pages/userManager/userManager.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userList: [],
        userNum: '',
        costNum: '',
    },
    getUserList() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/user/getUserList',
            method: 'Get',
            data: {},
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        userNum: res.data.data.list.length,
                        userList: res.data.data.list,
                    })
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    getAllCost() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/purchaseHistory/getAllCost',
            method: 'Get',
            data: {},
            success(res) {
                if (res.data.code == 200) {
                    var costNum = 0;
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        costNum += Number(res.data.data.list[i].cost);
                    }
                    that.setData({
                        costNum: costNum,
                    })
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
        this.getUserList();
        this.getAllCost();
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