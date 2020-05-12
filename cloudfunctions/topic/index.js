// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:'produce-a4nsy'
})
const db = cloud.database({
  env:'produce-a4nsy'
})

// 云函数入口函数
exports.main = async(event, context) => {
  if(event.fun=='get'){
    return await db.collection('topic').get()
  }
  else if (event.fun == 'getby_id') {
    return await db.collection('topic').doc(event._id).get()
  } 
  else if (event.fun == 'update') {
    
  } 
  else if (event.fun == 'remove') {
    
  }
}