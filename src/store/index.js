import {createStore} from 'vuex';
import {useRoute} from 'vue-router'
let url = 'https://vue3-kurs3-default-rtdb.firebaseio.com';
// task.json
export const store = createStore({
  state() {
    return {
      load: false,
      tasks: []
    }
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload)
    },
    changeStatus(state, payload) {
      state.tasks.find(item => {
        if (item.id === payload.id) {
          item.status = payload.status
        }
      })
    },
    removeTasks(state, payload) {
      state.tasks = state.tasks.filter(item => item.id !== payload)
    },
    loadTask(state, payload) {
      state.tasks = payload
      state.load = true
    }
  },
  actions: {
    async addTask({commit}, payload) {
      const response = await fetch(`${url}/task.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const firebaseData = await response.json()

      payload.id = firebaseData.name

      commit('addTask', payload)
    },
    async changeStatus({commit}, payload) {
      const response = await fetch(`${url}/task/${payload.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: payload.status
        })
      })

      commit('changeStatus', payload)
    },
    async removeTasks({commit}, payload) {
      const response = await fetch(`${url}/task/${payload}.json`, {
        method: 'DELETE',
      })

      commit('removeTasks', payload)
    },
    async loadTask ({commit}) {
      let task = []
      try {
        const response = await fetch(`${url}/task.json`, {
          method: 'GET',
        })
        let result = await response.json()
        console.log(result)
        if (result) {
          task = Object.keys(result).map(key => {
            return {
              id: key,
              ...result[key]
            }
          })
        }
        commit('loadTask', task)
      } catch (e) {
        console.log(e.message)
      }
    }
  },
  getters: {
    tasksList(state) {
      return state.tasks
    },
    tasksItem(state) {
      const route = useRoute()
      let id = route.params.task_id

      return state.tasks.find(item => id === item.id)
    },
    tasksLoad(state) {
      return state.load
    }
  }
})
