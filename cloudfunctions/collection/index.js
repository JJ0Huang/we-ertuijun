// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'produce-a4nsy'
})
const db = cloud.database({
  env: 'produce-a4nsy'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command
  if (event.fun == 'get') {
    return await db.collection('collection').where({
      openid: wxContext.OPENID,
      [event.key + 'Collection']: _.all([event.value])
    }).get()
  } else if (event.fun == 'add') {
    return await db.collection('collection').add({
      // 收藏商品、主题、课程的 _id
      data: {
        openid: wxContext.OPENID,
        topicCollection: [],
        goodCollection: [],
        courseCollection: []
      }
    })
  } else if (event.fun == 'push') {
    return await db.collection('collection').where({
      openid: wxContext.OPENID
    }).update({
      data: {
        [event.key + 'Collection']: _.push(event.value),
      }
    })
  } else if (event.fun == 'pull') {
    return await db.collection('collection').where({
      openid: wxContext.OPENID
    }).update({
      data: {
        [event.key + 'Collection']: _.pull(event.value),
      }
    })
  }
}