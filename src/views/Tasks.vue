<template>
  <app-loader v-if="!load"></app-loader>
  <h1 class="text-white center" v-else-if="!tasks.length">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{activeCard}}</h3>
    <div class="form-control">
      <label class="text-white">Фильтр задач</label>
      <select v-model="filter">
        <option value="">Все задачи</option>
        <option value="active">Активный</option>
        <option value="pending">В работе</option>
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
      </select>
    </div>
    <div v-if="taskList.length">
      <task-card
        v-for="item in taskList"
        :key="item.id"
        :title="item.title"
        :deedline="item.deedline"
        :status="item.status"
        :href="item.id"
      ></task-card>
    </div>
    <div class="text-white" v-else>Таких задач нет</div>
  </template>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex"
import AppStatus from "../components/AppStatus";
import TaskCard from "../components/TaskCard";

export default {
  setup() {
    const store = useStore()

    const filter = ref('')
    filter.value = localStorage.getItem('filter') || ''

    const tasks = computed(() => {
      return store.getters.tasksList
    })

    const taskList = computed(() => {
      localStorage.setItem('filter', filter.value)
      return tasks.value.filter(item => filter.value ? filter.value === item.status : item)
    })

    const activeCard = computed(() => {
      return tasks.value.reduce((active, task) => active+= task.status === 'active' ? 1 : 0 , 0)
    })

    return {
      tasks,
      activeCard,
      filter,
      taskList,
      load: computed(() => store.getters.tasksLoad)
    }
  },
  components: {AppStatus, TaskCard}
}
</script>
