<template>
  <div>
    <router-view style="padding-bottom: 14%"></router-view>
    <!-- <component :is="currentView"/> -->
    <tabbar/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tabbar from './Tabbar'
import Home from '@/views/home'
import Search from '@/views/search'
import Warn from '@/views/warn'
export default {
  name: 'Layout',
  components: {
    Tabbar,
    Home,
    Search,
    Warn
  },
  computed: mapGetters({
    currentView: 'tabbarActive'
  })
}
</script>
