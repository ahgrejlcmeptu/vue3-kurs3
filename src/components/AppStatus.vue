<template>
  <span :class="['badge', newStatus.statusClass.value]">{{ newStatus.statusTranslate.value }}</span>
</template>

<script>
import {useStatus} from "../use/status";
import {computed} from "vue";

export default {
  props: {
    type: {
      type: String,
      default: 'active',
      validator(value) {
        return ['active', 'done', 'cancelled', 'pending'].includes(value)
      }
    }
  },
  setup (props) {
    const newStatus = computed(() => {
      return useStatus(props.type)
    })
    return {
      newStatus
    }
  }
}
</script>
