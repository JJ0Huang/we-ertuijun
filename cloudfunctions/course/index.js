// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'produce-a4nsy'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const _ = db.command;
  if (event.fun == 'get') {
    return await db.collection('course').get()
  } else if (event.fun == 'getby_id') {
    return await db.collection('course').doc(event._id).get()
  }
}