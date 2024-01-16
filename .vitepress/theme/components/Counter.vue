<script setup>
import {ref} from 'vue'

const num = ref(0)
const add = () => {
  num.value++
}
</script>

<template>
  <div class="counter">我就是 counter 组件 </div>
  <button class="btn" @click="add">{{ num }}</button>
</template>

<style>
.counter {
  color: blue;
  font-size: 24px;
  font-weight: 600;
}

.btn {
  width: 50px;
  height: 50px;
  border: 1px solid green;
}
</style>