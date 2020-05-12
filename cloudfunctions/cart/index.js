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
  const wxContext=cloud.getWXContext()
  if(event.fun=='get'){
    return await db.collection('cart').where({
      openid:wxContext.OPENID
    }).get()
  }
  else if (event.fun == 'add') {
    return await db.collection('cart').add({
      data:{
        openid:wxContext.OPENID,
        goodID:event.goodID,
        goodNum:event.goodNum,
      }
    })
  } 
  
  else if (event.fun == 'update') {
    return await db.collection('cart').doc(event._id).update({
      data:{
        goodNum:event.goodNum
      }
    })
  } 
  else if (event.fun == 'remove') {
    
  }
}