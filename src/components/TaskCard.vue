<template>
  <div class="card">
    <h2 class="card-title">
      {{ title }}
      <app-status :type="status"></app-status>
    </h2>
    <p>
      <strong>
        <small>
          {{ deedline }}
        </small>
      </strong>
    </p>
    <router-link :to="'/' + href">
      <button class="btn primary">Посмотреть</button>
    </router-link>
  </div>
</template>

<script>
import AppStatus from './AppStatus';

export default {
  name: "TaskCard",
  props: {
    title: String,
    status: {
      type: String,
      validate(value) {
        return ['active', 'done', 'cancelled', 'pending'].includes(value)
      }
    },
    deedline: String,
    href: String
  },
  components: {AppStatus}
}
</script>

