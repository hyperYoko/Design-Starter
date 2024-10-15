<template>
    <v-app id="inspire">
      <AppNavBar></AppNavBar>
      <v-main>
        <router-view v-slot="{ Component, route }">
          <v-scroll-x-transition>
            <component :is="Component" :key="route.path" />
          </v-scroll-x-transition>
        </router-view>
      </v-main>
    </v-app>
</template>
<script>
import AppNavBar from "@/components/AppNavBar.vue";

export default {
  setup() {},
  data() {
    return {};
  },
  methods: {},
  components: {
    AppNavBar,
  },
  created() {},
};
</script>
<style></style>
