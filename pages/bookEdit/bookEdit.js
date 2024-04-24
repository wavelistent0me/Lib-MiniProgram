Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        name: '',
        author: '',
        avatar: '',
        isRecommend: '',
        category: '',
        categoryId: '',
    },
    addBook() {
        var that = this;
        if (this.data.id == '') {
            wx.request({
                url: 'http://localhost:8080/libserver/book/addBook',
                method: 'POST',
                data: {
                    name: that.data.name,
                    author: that.data.author,
                    avatar: that.data.avatar,
                    category: that.data.category,
                },
                success(res) {
                    if (res.data.code == 200) {
                        wx.navigateBack({delta: 1});
                    }
                    else {
                        wx.showToast({icon: "none", title: res.data.msg});
                    }
                }
            });
        }
        else {
            wx.request({
                url: 'http://localhost:8080/libserver/book/editBook',
                method: 'POST',
                data: {
                    id: that.data.id,
                    name: that.data.name,
                    author: that.data.author,
                    avatar: that.data.avatar,
                    category: that.data.category,
                },
                success(res) {
                    if (res.data.code == 200) {
                        wx.navigateBack({delta: 1});
                    }
                    else {
                        wx.showToast({icon: "none", title: res.data.msg});
                    }
                }
            });
        }

    },
    imagesUpload() {
        var that = this;
        wx.chooseImage({
            success (res) {
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'http://localhost:8080/libserver/imagesUpload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {},
                    success (rez){
                        rez.data = JSON.parse(rez.data);
                        that.setData({
                            avatar: rez.data.data.url,
                        })
                        console.log(that.data.cover);
                    }
                })
            }
        })
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
                        name: res.data.data.info.name,
                        author: res.data.data.info.author,
                        avatar: res.data.data.info.avatar,
                        isRecommend: res.data.data.info.isRecommend,
                        category: res.data.data.info.category,
                    });
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    getChapter() {
        wx.navigateTo({url: "/pages/chapterManager/chapterManager?id=" + this.data.id})
    },
    setRecommend() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/book/setRecommend',
            method: 'POST',
            data: {
                id: this.data.id,
            },
            success(res) {
                if (res.data.code == 200) {
                    that.getBookInfo(that.data.id)
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
        if (options.id) {
            this.getBookInfo(options.id);
            this.setData({
                id: options.id,
            })
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