<template>
  <div>
    <router-view></router-view>
    <tabbar/>
  </div>
</template>

<script>
import Tabbar from './Tabbar'
export default {
  name: 'Layout',
  components: {
    Tabbar
  }
}
</script>
