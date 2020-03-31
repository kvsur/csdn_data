const express = require('express')

const router = express.Router()
const { updateCookie, getFollows, getFans, doFollow, unFollow, doLogin, getInfo, batchFollow, batchUnFollow } = require('../acitons')
const { getNavArticle, getColumnArticle, getFirstArticle, doSearch } = require('../acitons/article')
const { getNav } = require('../acitons/nav')

router.route('/updateGlobalCookie').post(updateCookie)
router.route('/fetchFollows').post(getFollows)
router.route('/fetchFans').post(getFans)
router.route('/doFollow').post(doFollow)
router.route('/batchFollow').post(batchFollow)
router.route('/unFollow').post(unFollow)
router.route('/batchUnFollow').post(batchUnFollow)
router.route('/doLogin').post(doLogin)
router.route('/fetchUserInfo').post(getInfo)
router.route('/fetchNavArticle').post(getNavArticle)
router.route('/fetchColumnArticle').post(getColumnArticle)
router.route('/fetchFirstArticle').post(getFirstArticle)
router.route('/doSo').post(doSearch)
router.route('/fetchNav').get(getNav)

module.exports = router
