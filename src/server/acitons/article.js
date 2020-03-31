const superagent = require('superagent')
const { commonHeader } = require('../../../config/request.header')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
/**
 * 获取栏目对应的文章
 * @param type: new|more
 * @param category: string
 * @param shown_offset: number
 */
exports.getNavArticle = async (req, res, next) => {
  try {
    const { type, category, shown_offset = 0 } = req.body
    const api = `${process.env.API_NAV}?type=${type}&category=${category}&shown_offset=${shown_offset}`
    const ress = await superagent
      .get(api)
      .set(commonHeader)
      .set("Cookie", req.headers.csdn_cookie || '')

    res.status(200).json({code: 200, message: '', data: ress.body.articles})
  } catch (e) {
    res.status(400).json(e)
  }
}

/**
 * 获取特殊栏目对应的文章，特使是指栏目拥有指定域名
 * @param column: string
 * @param page: number
 */
exports.getColumnArticle = async (req, res, next) => {
  try {
    const { column, page } = req.body
    const api = `https://${column}.csdn.net/m/zone/${column}/blog_api?page=${page}`
    const ress = await superagent
      .get(api)
      .set(commonHeader)
      .set('Cookie', req.headers.csdn_cookie || '')
    res.status(200).json({code: 200, message: '', data: JSON.parse(ress.text).data.list})
  } catch (e) {
    res.status(400).json(e)
  }
}
exports.getFirstArticle = async (req, res, next) => {
  try {
    const { column, nav } = req.body
    let api = `https://${column}.csdn.net`
    if (nav) api = `https://www.csdn.net/nav/${nav}`
    const ress = await superagent
      .get(api)
      .set(commonHeader)
      .set('Cookie', req.headers.csdn_cookie || '')

    const dom  = new JSDOM(ress.text)

    const container = dom.window.document.querySelector('.feedlist_mod')
    const tips = container.querySelectorAll('li.tip_box')
    for(let tip of tips) container.removeChild(tip);
    const articles = container.querySelectorAll('li.clearfix')

    const data = []

    for(let item of articles) {
      const titleContainer = item.querySelector('div.title').querySelector('a')
      const url = titleContainer.getAttribute('href')
      const title = titleContainer.text.trim().replace(/[\t\n\b\r] /g, '')

      const userContainer = item.querySelector('.list_userbar')
      const user_name = userContainer.querySelector('a').getAttribute('href').match(/net\/(.+)/)[1]
      const avatar = userContainer.querySelector('img').getAttribute('src')
      const nickname = userContainer.querySelector('.name').querySelector('a').text.trim()

      data.push({
        title, url, user_name, avatar, nickname
      })
    }

    res.status(200).json({code: 200, data, message: ''})
  } catch (e) {
    res.status(400).json(e)
  }
}

exports.doSearch = async (req, res, next) => {
  try {
    const { p, q, t='blog', o='', s='', l='', f='', viparticle='' } = req.body
    const api = `${process.env.PAGE_SO}?p=${p}&q=${encodeURI(q)}&t=${t}&o=${o}&s=${s}&l=${l}&f=${f}&viparticle=${viparticle}`
    const ress = await superagent.get(api)
      .set(commonHeader)
      .set('Cookie', req.headers.csdn_cookie || '')

    const dom = new JSDOM(ress.text)

    const container = dom.window.document.querySelector('.search-list-con');
    const articles = container.querySelectorAll('.search-list.J_search')

    const data = []
    for(let article of articles) {
      const title = article.querySelector('a').innerHTML.trim()
      const url = article.querySelector('a').getAttribute('href')
      const nickname = article.querySelector('.author-time').querySelector('a').innerHTML
      const user_name = article.querySelector('.author-time').querySelector('a').getAttribute('href').match(/net\/(.+)/)[1]
      data.push({title, user_name, url, avatar: '', nickname})
    }

    res.status(200).json({code: 200, message: 'success', data, data_all: data.length})

  } catch(e) {
    res.status(400).json(e)
  }
}
