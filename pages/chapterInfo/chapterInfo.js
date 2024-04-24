// pages/chapterInfo/chapterInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chapterId: '',
        info: '',
        bookName: '',
        content: '',
    },
    getChapterInfo() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/chapter/getChapterInfo',
            method: 'POST',
            data: {
                id: this.data.chapterId,
            },
            success(res) {
                if (res.data.code == 200) {
                    res.data.data.info.content=res.data.data.info.content.split("\n")
                    that.setData({
                        info: res.data.data.info,
                    })
                    that.addView(res.data.data.info.bookId)

                    var readHistory = wx.getStorageSync('readHistory');
                    var b = false;
                    if (readHistory == '') {
                        readHistory = [];
                    }
                    for (let i = 0; i < readHistory.length; i++) {
                        if (readHistory[i].bookId == that.data.info.bookId) {
                            b = true;
                            readHistory[i].id = that.data.info.id;
                            readHistory[i].title = that.data.info.title;
                        }
                    }
                    if (!b) {
                        console.log(1);
                        var j = {bookId: that.data.info.bookId, bookName: that.data.bookName, id: that.data.info.id,
                            title: that.data.info.title,};
                        readHistory.push(j)
                        console.log(readHistory);
                    }
                    wx.setStorageSync('readHistory', readHistory);
                }
                else {
                    wx.showToast({icon: "none", title: res.data.msg});
                }
            }
        });
    },
    addView(id) {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/book/addView',
            method: 'POST',
            data: {
                id: id,
            },
        });
    },
    addNote() {
        var that = this;
        wx.request({
            url: 'http://localhost:8080/libserver/note/addNote',
            method: 'POST',
            data: {
                content: this.data.content,
                chapterId: this.data.chapterId,
                userId: wx.getStorageSync('id'),
            },
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            chapterId: options.chapterId,
            bookName:options.bookName,
        })
        this.getChapterInfo();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

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