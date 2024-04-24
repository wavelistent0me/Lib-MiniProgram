Page({

    data: {
        username: '',
        password: '',
    },
    register() {
        var that = this

        if (this.data.password == '') {
            wx.showToast({icon: "none", title: "请输入密码"});
        }

        wx.request({
            url: 'http://localhost:8080/libserver/user/register',
            method: 'Post',
            data: {
                username: that.data.username,
                password: that.data.password,
            },
            success(res) {
                if (res.data.code == 200) {
                    if (res.data.data.user.id != wx.getStorageSync('id')) {
                        wx.clearStorage();
                    }
                    wx.setStorageSync('id', res.data.data.user.id);
                    wx.setStorageSync('type', res.data.data.user.type);
                    wx.switchTab({url: `/pages/index/index`,});
                }
                else {
                    wx.showToast({icon: "none", title: res.data.message});
                }
            }
        });
    },
    login() {
        var that = this

        if (this.data.username == '') {
            wx.showToast({icon: "none", title: "请输入账号"});
        }
        if (this.data.password == '') {
            wx.showToast({icon: "none", title: "请输入密码"});
        }

        wx.request({
            url: 'http://localhost:8080/libserver/user/login',
            method: 'Post',
            data: {
                username: that.data.username,
                password: that.data.password,
            },
            success(res) {
                if (res.data.code == 200) {
                    if (res.data.data.user.id != wx.getStorageSync('id')) {
                        wx.clearStorage();
                    }
                    wx.setStorageSync('id', res.data.data.user.id);
                    wx.setStorageSync('type', res.data.data.user.type);
                    wx.switchTab({url: `/pages/index/index`,});
                }
                else {
                    wx.showToast({icon: "none", title: res.data.message});
                }
            }
        });
    },
    jumpPage(e) {
        wx.navigateTo({
            url: `/pages/${e.currentTarget.dataset.page}/${e.currentTarget.dataset.page}`,
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