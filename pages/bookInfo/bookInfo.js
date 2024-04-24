Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookId: '',
        info: '',
        list: [],
        chapterList: [],
        ind: 0,
        content: '',
        commentList: [],
        userId: '',
        userType: '',
        isFavorite: '',
    },
    getBookInfo(id) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/book/getBookInfo',
            method: 'POST',
            data: {
                id: id,
            },
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        info: res.data.data.info,
                    })
                    that.isFavorite();
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    getChapterList() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/chapter/getChapterList?userId=' + wx.getStorageSync('id'),
            method: 'Post',
            data: {
                bookId: that.data.bookId,
            },
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        chapterList: res.data.data.list,
                    })
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    goChapterInfo(e) {
        var that = this;
        if (e.currentTarget.dataset.item.price == 0 || e.currentTarget.dataset.item.isPurchase == 1) {
            wx.navigateTo({url: "/pages/chapterInfo/chapterInfo?chapterId=" + e.currentTarget.dataset.item.id
                    + "&bookName=" + this.data.info.name});
        }
        else {
            wx.showModal({
                title: '提示',
                content: '请问您是否下单',
                success (res) {
                    if (res.confirm) {
                        wx.request({
                            url: 'http://localhost:8080/libserver/purchaseHistory/purchase',
                            method: 'Post',
                            data: {
                                userId: wx.getStorageSync('id'),
                                chapterId: e.currentTarget.dataset.item.id,
                                cost: e.currentTarget.dataset.item.price,
                            },
                            success(res) {
                                if (res.data.code == 200) {
                                    wx.showToast({icon: "success", title: "购买成功"});
                                    that.getChapterList();
                                }
                                else {
                                    wx.showToast({icon: "none", title: res.data.msg});
                                }
                            }
                        });
                    }
                    else if (res.cancel) {}
                }
            })
        }
    },
    clickTab(e) {
        this.setData({
            ind: e.currentTarget.dataset.ind
        })
    },
    addComment() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/comment/addComment',
            method: 'POST',
            data: {
                content: this.data.content,
                bookId: this.data.bookId,
                userId: wx.getStorageSync('id'),
            },
            success(res) {
                if (res.data.code == 200) {
                    that.getCommentList();
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    getCommentList() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/comment/getCommentList',
            method: 'Post',
            data: {
                bookId: that.data.bookId
            },
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        commentList: res.data.data.list.reverse(),
                    })
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    deleteComment(e) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/comment/deleteComment',
            method: 'POST',
            data: {
                id: e.currentTarget.dataset.item.id,
            },
            success(res) {
                if (res.data.code == 200) {
                    wx.showToast({icon: "none", title: res.data.msg});
                    that.getCommentList();
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    isFavorite() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/favorite/isFavorite',
            method: 'POST',
            data: {
                bookId: that.data.bookId,
                userId: wx.getStorageSync('id'),
            },
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        isFavorite: res.data.data.isFavorite
                    })
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    setFavorite() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/favorite/setFavorite',
            method: 'POST',
            data: {
                bookId: that.data.bookId,
                userId: wx.getStorageSync('id'),
            },
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        isFavorite: res.data.data.isFavorite
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
        this.getBookInfo(options.id);
        this.setData({
            bookId: options.id,
            userId: wx.getStorageSync("id"),
            userType: wx.getStorageSync("type"),
        })
        this.getChapterList();
        this.getCommentList();
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