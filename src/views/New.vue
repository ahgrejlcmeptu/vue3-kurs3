<template>
  <form class="card" @submit.prevent="submit">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model.trim="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="text"></textarea>
    </div>

    <button class="btn primary" :disabled="!disabled" @click="addTask">Создать</button>
  </form>
</template>

<script>
import {ref, computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const title = ref('')
    const date = ref('')
    const text = ref('')

    let disabled = computed(() => {
      return title.value !== '' && date.value !== '' && text.value !== ''
    })

    const submit = () => {
      let dateNow = new Date().setHours(0, 0, 0, 0)
      let dateInput = new Date(date.value).setHours(0, 0, 0, 0)

      store.dispatch('addTask', {
        title: title.value,
        deedline: new Date(date.value).toLocaleDateString(),
        text: text.value,
        status: dateNow > dateInput ? 'cancelled' : 'active',
        // id: Date.now().toString()
      })
      router.push('/')
    }

    return {
      disabled, title, date, text, submit
    }
  }
}
</script>
