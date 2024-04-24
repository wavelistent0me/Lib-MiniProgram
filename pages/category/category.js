// pages/category/category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList: [],
        categoryIndex: 0,
        bookList: [],
    },
    getCategoryList() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/category/getCategoryList',
            method: 'GET',
            data: {},
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        categoryList: res.data.data.list,
                    })
                    that.getBookListByCategoryId();
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    getBookListByCategoryId(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/book/getBookListByCategoryId',
            method: 'POST',
            data: {
                categoryId: e == undefined ? this.data.categoryList[0].id : e.currentTarget.dataset.item.id
            },
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        bookList: res.data.data.list,
                        categoryIndex: e == undefined ? 0 : e.currentTarget.dataset.idx
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
        this.getCategoryList();
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