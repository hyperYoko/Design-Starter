<template>
  <div
    class="chatbot-popup"
    :class="{ 'chatbot-popup--open': store.chatSmall }"
  >
    <div class="chat-header">
      <div class="header-info">
        <img class="chatbot-logo" :src="'images/Chat-Assistant.svg'" />
        <h2 class="logo-text">Copilot</h2>
      </div>
      <v-btn
        @click="store.chatSmall = !store.chatSmall"
        icon
        variant="flat"
        class="close-chatbot"
      >
        <v-icon>fas fa-angle-down</v-icon>
      </v-btn>
    </div>
    <div class="chat-body">
      <ChatBig :isPopup="true" />
    </div>
  </div>
</template>
<script>
import { useStore } from "@/store/store";
import ChatBig from "@/components/ChatBig.vue";
export default {
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {};
  },
  methods: {},
  components: { ChatBig },
  created() {},
};
</script>
