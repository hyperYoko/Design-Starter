<template>
    <v-app id="inspire">
      <AppNavBar></AppNavBar>
      <v-main>
        <router-view v-slot="{ Component, route }">
          <v-fade-transition>
            <component :is="Component" :key="route.path" />
          </v-fade-transition>
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
