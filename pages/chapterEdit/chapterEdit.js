Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        title: '',
        content: '',
        price: 0,
        bookId: '',
    },
    addChapter() {
        var that = this;
        if (this.data.id == '') {
            wx.request({
                url: 'http://localhost:8080/libserver/chapter/addChapter',
                method: 'POST',
                data: {
                    title: that.data.title,
                    content: that.data.content,
                    bookId: that.data.bookId,
                    price: that.data.price,
                },
                success(res) {
                    if (res.data.code == 200) {
                        wx.showToast({icon: "none", title: res.data.msg});
                        wx.navigateBack({delta: 1});
                    } else {
                        wx.showToast({icon: "none", title: res.data.msg});
                    }
                }
            });
        }
        else {
            wx.request({
                url: 'http://localhost:8080/libserver/chapter/editChapter',
                method: 'POST',
                data: {
                    title: that.data.title,
                    content: that.data.content,
                    bookId: that.data.bookId,
                    id: that.data.id,
                    price: that.data.price,
                },
                success(res) {
                    if (res.data.code == 200) {
                        wx.navigateBack({delta: 1});
                    } else {
                        wx.showToast({icon: "none", title: res.data.msg});
                    }
                }
            });
        }
    },
    getChapterInfo(id) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/chapter/getChapterInfo',
            method: 'POST',
            data: {
                id: id,
            },
            success(res) {
                if (res.data.code == 200) {
                    that.setData({
                        title: res.data.data.info.title,
                        content: res.data.data.info.content,
                        bookId: res.data.data.info.bookId,
                        id: res.data.data.info.id,
                        price: res.data.data.info.price,
                    });
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    textUpload() {
        var that = this;
        wx.chooseImage({
            success(res) {
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'http://localhost:8080/libserver/textUpload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {},
                    success(rez) {
                        console.log(rez);
                        rez.data = JSON.parse(rez.data);
                        that.setData({
                            content: rez.data.data.content,
                        })
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.bookId) {
            this.setData({
                bookId: options.bookId
            });
        }
        if (options.id) {
            this.getChapterInfo(options.id);
        }
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