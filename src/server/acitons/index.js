const superagent = require('superagent')
const { commonHeader } =  require('../../../config/request.header')

exports.doLogin = async (req, res, next) => {
  try {
    const { userIdentification,pwdOrVerifyCode,loginType="1",uaToken="122#WBkqUEI9EE+tXJpZy4pjEJponDJE7SNEEP7rpJRBuDPpJFQLpCGwoHZDpJEL7SwBEyGZpJLlu4Ep+FQLpoGUEELWn4yE7SNEEP7ZpERBuDPE+BQPpC76EJponDJLKMQESELPnq0owrAmgz8NIraqcM3f8SOImOuGgcQXSssEz87iZ2WCKTExHOcbFU8JZGKjkcOZmoXrVJukeN2wJOYfQqvIWHPylte4O/SkgTrOJr7cjtXF6n1lOR4sADriJRYgc54Z/Q0zTX7fJoPAgoJNEiOkMxfqdbdtfDMFxo6xg3jfR0mT7SA4Nqlbrf/Hxs+X48zyWkqYTGACZC0SaMp1uOpzfzPf8oL6JoKFDatD7W3bEEpxngL1uOIEDLGr8CLU+zvH3EROqM32TzpanSLhuy0EDLVr8CpUJ4bEyF3m7W3bEEpxnSp1uOIEELXr8oL6JNEEyBfDqG+2E5pd7WL4uP5qmRAZ8CLe/c86NFL364VXU6uIGRk21u24XKPIegrslCD0L39C927jie5eaMJnsS8wszC7IG37pQ9lEvue4Pz4r/aTSxOt5xgOnRLpq0GntSF3dBlpvIROk1bXGSyf0F46uHK82TcYxSmWQ7J/4kNZQ3PYfRs3QXMEKUgIj8iaUD41vJDor9pfjyIcDa+VhwgTQ3wTWePKCnT3o2g/m5g3i8+8hV7cbNIxHNghrnjJnIL+OUeA0CsJfp96Z0vYGxA1hpXYzjoV9UliDx9AlwxgeKYiO5jsJ63ivuEXBasHZ3CCDYxlweZogcRV+khZ+qu/ZwIeqWil+QiN1TuVNLfZL/OFURPaTSVyGzZyAkM7ajyP81g3pzmFnFlUDMmp8VPZzaf/LLO2mJUXHSpj8AesMEBz9vGdQvajuE==",webUmidToken="T3F206CD476DE17E48B8B9F5764D1CE7F179157D0CB94834F48D7B3378D" } = req.body
    const pageRes = await superagent
      .get(process.env.PAGE_LOGIN)

    const cookies = pageRes.header['set-cookie'].map(item => item.split(';')[0]).join('&')
    const ress = await superagent
      .post(`${process.env.API_LOGIN}`)
      .send({userIdentification, pwdOrVerifyCode, loginType, uaToken, webUmidToken})
      .set('Cookie', cookies)
      .set({
        ...commonHeader,
        origin: 'https://passport.csdn.net',
        referer: 'https://passport.csdn.net/signwap',
        "x-tingyun-id": "im-pGljNfnc;r=118559898",
        "x-requested-with": "XMLHttpRequest",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      })

    res.status(200).json(ress.body)
  } catch(e) {
    res.status(400).json(e)
  }
}

/**
 * 登录之后更新 session cookie 信息
 * @params { cookie: String }
 */
exports.updateCookie = (req, res, next) => {
  // const { cookie } = req.body
  // req.headers.csdn_cookie = cookie
  return res.status(200).json({
    code: 200,
    message: 'success',
    data: {
      cookie: req.headers.csdn_cookie
    }
  })
}

/**
 * 批量关注操作
 */
exports.batchFollow = async (req, res, next) => {
  try {
    let { ids } = req.body
    ids = JSON.parse(ids)
    let ress
    while(ids.length) {
      const username = ids.pop()
      ress = await superagent
        .post(`${process.env.API_DOFOLLOW}`)
        .send({ username })
        .set(commonHeader)
        .set("Cookie", req.headers.csdn_cookie || '')

      if (ress.body.code !== 200) break
    }

    res.status(200).json(ress.body)
  } catch (e) {
    res.status(400).json(e)
  }
}
/**
 * 批量取消关注操作
 */
exports.batchUnFollow = async (req, res, next) => {
  try {
    let { ids } = req.body
    ids = JSON.parse(ids)
    let ress
    while(ids.length) {
      const username = ids.pop()
      ress = await superagent
        .post(`${process.env.API_UNFOLLOW}`)
        .send({ username })
        .set(commonHeader)
        .set("Cookie", req.headers.csdn_cookie || '')

      if (ress.body.code !== 200) break
    }

    res.status(200).json(ress.body)
  } catch (e) {
    res.status(400).json(e)
  }
}

/**
 * 关注某个人
 * @params { username: String }
 */
exports.doFollow = async (req, res, next) => {
  try {
    const { username } = req.body
    const ress = await superagent
      .post(`${process.env.API_DOFOLLOW}`)
      .send({ username })
      .set("Cookie", req.headers.csdn_cookie || '')
      .set(commonHeader)

    res.status(200).json(ress.body)
  } catch (e) {
    res.status(400).json(e)
  }
}

/**
 * 取消关注某个人
 * @params { username: String }
 */
exports.unFollow = async (req, res, next) => {
  try {
    const { username } = req.body
    const ress = await superagent
      .post(`${process.env.API_UNFOLLOW}`)
      .send({ username })
      .set("Cookie", req.headers.csdn_cookie || '')
      .set(commonHeader)

    res.status(200).json(ress.body)
  } catch (e) {
    res.status(400).json(e)
  }
}

/**
 * 获取我关注的人
 * @params { pageno: Number, pagesize: Number }
 */
exports.getFollows = async (req, res, next) => {
  try {
    const { pageno = 1, pagesize=2000, relation_type="follow" } = req.body

    const ress = await superagent
      .get(`${process.env.API_FOLLOWS}?pageno=${pageno}&pagesize=${pagesize}&relation_type=${relation_type}`)
      .set("Cookie", req.headers.csdn_cookie || '')
      .set(commonHeader)
    res.status(200).json({code: 200, message: '', data: ress.body.data.list})
  } catch (e) {
    res.status(400).json(e)
  }
}
/**
 * 获取关注我的人【粉丝】
 * @param pageno: Number
 * @param pagezie: Number
 */
exports.getFans = async (req, res, next) => {
  try {
    const { pageno = 1, pagesize=200000, relation_type="fans" } = req.body

    const ress = await superagent
      .get(`${process.env.API_FANS}?pageno=${pageno}&pagesize=${pagesize}&relation_type=${relation_type}`)
      .set("Cookie", req.headers.csdn_cookie || '')
      .set(commonHeader)
    res.status(200).json({code: 200, message: '', data: ress.body.data.list})
  } catch (e) {
    res.status(400).json(e)
  }
}

exports.getInfo = async (req, res, next) => {
  try {
    const { username } = req.body
    const ress = await superagent
      .post(process.env.API_USERINFO)
      .send({username})
      .set("Cookie", req.headers.csdn_cookie || '')
      .set(commonHeader)

    res.status(200).json(ress.body)
  } catch (e) {
    res.status(400).json(e)
  }
}
