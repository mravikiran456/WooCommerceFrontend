<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <!-- drawer content -->
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>