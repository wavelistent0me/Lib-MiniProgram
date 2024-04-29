const formatTime = date => {
  date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function request(option){
  wx.request({
    url: option.url,
    method:option.method,
    header:option.header,
    data:option.data,
    success(res){
      if (res.data.code == 0||res.data.code == 200) {
        if(option.success){
          option.success(res)
        }
      }
    },
    fail(e){
      if(option.fail){
        option.fail(e)
      }
    }
  })
}

module.exports = {
  formatTime, request
}
