<template>
  <app-loader v-if="!load"></app-loader>
  <div class="card" v-else-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>:
      <app-status :type="task.status"></app-status>
    </p>
    <p><strong>Дэдлайн</strong>: {{ task.deedline }}</p>
    <p><strong>Описание</strong>: {{ task.text }}</p>
    <div>
      <button class="btn" @click="updateStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="updateStatus('done')">Завершить</button>
      <button class="btn danger" @click="updateStatus('cancelled')">Отменить</button>
      <button class="btn danger" @click="remove">Удалить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {computed} from "vue";

export default {
  components: {AppStatus},
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    let id = route.params.task_id

    const task = computed(() => {
      return store.getters.tasksItem
    })

    function remove () {
      store.dispatch('removeTasks', id)
      router.push('/')
    }

    function updateStatus (name) {
      store.dispatch('changeStatus', {
        id: id,
        status: name
      })
    }

    return {
      id,
      task,
      remove,
      updateStatus,
      load: computed(() => store.getters.tasksLoad)
    }
  }
}
</script>
