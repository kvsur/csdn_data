import { fetchFollows, fetchFans, doFollow, unFollow, batchUnFollow, batchFollow } from '@/services/user';
import { fetchNavs } from '@/services/nav';
import { Message } from 'element-ui'
const global = {
  state: {
    follows: [],
    fans: [],
    navs: [],
    usernames: []
  },
  mutations: {
    UPDATE_GLOBAL_NAVS: (state, navs) => {
      state.navs = navs
    },
    UPDATE_GLOBAL_FOLLOWS: (state, follows) => {
      state.follows = follows
    },
    UPDATE_GLOBAL_USERNAMES: (state, usernames) => {
      state.usernames = usernames
    },
    UPDATE_GLOBAL_FANS: (state, fans) => {
      state.fans = fans
    }
  },
  actions: {
    async FetchGlobalNavs({commit}) {
      try {
        const { code, data = [] } = await fetchNavs();
        if (code == 200) commit('UPDATE_GLOBAL_NAVS', data)
        else throw new Error('')
      } catch(e) {
        commit('UPDATE_GLOBAL_NAVS', [])
      }
    },
    async FetchGlobalFollows({commit}) {
      try {
        const { code, data = [] } = await fetchFollows();
        if (code == 200) {
          commit('UPDATE_GLOBAL_FOLLOWS', data, usernames)
          const usernames = data.map(({username}) => username)
          commit('UPDATE_GLOBAL_USERNAMES', usernames)
        }
        else throw new Error('')
      } catch(e) {
        commit('UPDATE_GLOBAL_FOLLOWS', [])
      }
    },
    async FetchGlobalFans({commit}) {
      try {
        const { code, data = [] } = await fetchFans();
        if (code == 200) commit('UPDATE_GLOBAL_FANS', data)
        else throw new Error('')
      } catch(e) {
        commit('UPDATE_GLOBAL_FANS', [])
      }
    },
    async DoFollow({commit, state}, {username}) {
      try {
        const { code } = await doFollow({username});
        if (code == 200) {
          const usernames = state.usernames;
          usernames.unshift(username)
          commit('UPDATE_GLOBAL_USERNAMES', usernames.join('#_#').split('#_#'))
          Message({
            type: 'info',
            message: '操作成功',
            duration: 1000
          })
        }
        else throw new Error('')
      } catch(e) {
        console.error(e)
        // commit('UPDATE_GLOBAL_FANS', [])
        Message({
          type: 'error',
          message: '操作失败',
          duration: 1000
        })
      } finally {
        return Promise.resolve();
      }
    },
    async UnFollow({commit, state}, {username}) {
      try {
        const { code } = await unFollow({username});
        if (code == 200) {
          const usernames = state.usernames;
          const index = usernames.indexOf(username);
          usernames.splice(index, 1);
          commit('UPDATE_GLOBAL_USERNAMES', usernames.join('#_#').split('#_#'))
          Message({
            type: 'info',
            message: '操作成功',
            duration: 1000
          })
        }
        else throw new Error('')
      } catch(e) {
        console.error(e)
        // commit('UPDATE_GLOBAL_FANS', [])
        Message({
          type: 'error',
          message: '操作失败',
          duration: 1000
        })
      } finally {
        return Promise.resolve();
      }
    },
    async BatchFollow({commit, state}, {ids}) {
      try {
        if(!ids || !ids.length) return Promise.resolve();
        const { code } = await batchFollow({ids: JSON.stringify(ids)});
        if (code === 200) {
          const usernames = state.usernames;
          commit('UPDATE_GLOBAL_USERNAMES', usernames.concat(ids).join('#_#').split('#_#'))
          Message({
            type: 'info',
            message: '操作成功',
            duration: 1000
          })
        }
        else throw new Error('')
      } catch(e) {
        console.error(e)
        // commit('UPDATE_GLOBAL_FANS', [])
        Message({
          type: 'error',
          message: '操作失败',
          duration: 1000
        })
      } finally {
        return Promise.resolve();
      }
    },
    async BatchUnFollow({commit, state}, { ids }) {
      try {

        const usernames = state.usernames;
        // const ids = usernames.slice(0, 20);
        const { code } = await batchUnFollow({ids: JSON.stringify(ids)});
        if (code === 200) {
          ids.forEach(id => {
            const index = usernames.indexOf(id);
            usernames.splice(index, 1);
          })
          const length = usernames.length;
          commit('UPDATE_GLOBAL_USERNAMES', length ? usernames.join('#_#').split('#_#') :[])
          Message({
            type: 'info',
            message: '操作成功',
            duration: 1000
          })
        }
        else throw new Error('')
      } catch(e) {
        console.error(e)
        // commit('UPDATE_GLOBAL_FANS', [])
        Message({
          type: 'error',
          message: '操作失败',
          duration: 1000
        })
      } finally {
        return Promise.resolve();
      }
    },
  }
}

export default global
