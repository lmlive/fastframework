<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  define(['vue'],function (Vue) {
      return Vue.component('l-app',{
          template:template,
          data(){return {}}
      })
  })
</script>
