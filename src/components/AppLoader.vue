<template>
  <div class="loader" :class="color"></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
      validator(value) {
        return ['', '_dark'].includes(value)
      }
    },
  }
}
</script>

<style>
.loader._dark {
  background: linear-gradient(to right, #2c3e50 10%, rgba(44,62,80, 0) 42%);
}
.loader._dark:before {
  background: #2c3e50;
}
.loader._dark:after {
  background: #fff;
}
</style>
