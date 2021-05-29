import {computed} from 'vue'

export function useStatus(name) {
  const translate = {
    active: 'Активный',
    done: 'Завершен',
    cancelled: 'Отменен',
    pending: 'В работе'
  }

  const statusClass = computed(() => {
    if (name === 'cancelled') return 'danger'
    if (name === 'pending') return 'warning'
    return 'primary'
  })
  const statusTranslate = computed(() => {
    return translate[name]
  })

  return {
    statusTranslate,
    statusClass
  }
}
