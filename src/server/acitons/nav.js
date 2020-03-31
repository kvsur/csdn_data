const superagent = require('superagent')
const { commonHeader } = require('../../../config/request.header')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

/**
 * 获取首页所有的栏目
 */
exports.getNav = async (req, res, next) => {
  try {
    const ress = await superagent.get(process.env.PAGE_NAV)
      .set(commonHeader)
      .set('Cookie', req.headers.csdn_cookie || '')

    const dom = new JSDOM(ress.text)

    const container = dom.window.document.querySelector('div.nav_com');
    const navs = container.querySelectorAll('a')

    const data = []
    for(let nav of navs) {
      let key = nav.getAttribute('href')
      if (key.startsWith('/nav')) key = key.replace('/nav/', '')
      else if (key.startsWith('htt')) key = 'column.' + key.match(/https:\/\/(\w+)\.csdn\.net/)[1]
      else key = 'home'
      const value = nav.text.trim()

      data.push({key, value})
    }

    res.status(200).json({code: 200, message: 'success', data, data_all: data.length})

  } catch(e) {
    res.status(400).json(e)
  }
}
