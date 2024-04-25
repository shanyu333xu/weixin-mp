// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : `0${n}`
// }

// module.exports = {
//   formatTime
// }
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDay = getWeekDay(date.getDay());
  return year + '年' + month + '月' + day + '日' + ' ' + weekDay;
}

function getWeekDay(day) {
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekDays[day];
}

module.exports = {
  formatDate: formatDate,
};