<template>
  <v-app id="inspire">
    <AppNavBar></AppNavBar>
    <v-main>
      <router-view v-slot="{ Component, route }">
        <v-fade-transition>
          <component :is="Component" :key="route.path" />
        </v-fade-transition>
      </router-view>
      <v-scale-transition origin="bottom right">
        <ChatSmall v-if="store.chatSmall" />
      </v-scale-transition>
      <v-btn
        class="chatbot-toggler"
        :class="{ 'chatbot-toggler--open': store.chatSmall }"
        @click="store.chatSmall = !store.chatSmall"
        icon
        variant="flat"
      >
        <!-- <v-icon v-if="!store.chatSmall" class="chatbot-toggler__icon"
          >fas fa-plus</v-icon
        > -->
        <img
          v-if="!store.chatSmall"
          class="chatbot-toggler__icon chatbot-toggler__image"
          :src="'images/Chat-Assistant.svg'"
        />
        <v-icon v-if="store.chatSmall" class="chatbot-toggler__icon"
          >fas fa-close</v-icon
        >
      </v-btn>
    </v-main>
  </v-app>
</template>
<script>
import AppNavBar from "@/components/AppNavBar.vue";
import { useStore } from "@/store/store";
import ChatSmall from "./ChatSmall.vue";
export default {
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {};
  },
  methods: {},
  components: {
    AppNavBar,
    ChatSmall,
  },
  created() {},
};
</script>
<style></style>
