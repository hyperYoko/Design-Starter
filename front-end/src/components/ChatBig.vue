<template>
  <v-container :class="{ WithinChatSmall: isPopup }">
    <div class="header" v-if="chatMessages.length == 0">
      <v-row>
        <v-col md="12">
          <img
            class="avatar"
            :src="'images/Chat-Assistant.svg'"
            v-if="!isPopup"
          />
          <h1 class="title" v-if="!isPopup">Copilot</h1>
          <p class="subtitle">
            {{ subtitle
            }}<v-icon
              v-if="isHeaderCursor"
              icon="fas fa-circle"
              size="x-small"
              class="CursorIcon"
            ></v-icon>
          </p>
        </v-col>
      </v-row>
    </div>
    <div class="chat-list">
      <div
        v-for="(message, index) in chatMessages"
        :key="index"
        :class="[
          'message',
          message.type,
          {
            loading:
              index == chatMessages.length - 1 &&
              isResponseGenerating &&
              message.type === 'incoming',
          },
        ]"
      >
        <div class="message-content">
          <img class="avatar" :src="message.avatar" />
          <div
            class="loading-indicator"
            v-if="index == chatMessages.length - 1 && isResponseGenerating"
          >
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
            <div v-if="!isPopup" class="loading-bar"></div>
          </div>
          <p
            :class="[
              'text',
              {
                QuestionTextColor: message.type === 'outgoing',
              },
            ]"
            v-else
          >
            {{ message.text }}

            <v-icon
              v-if="
                message.type === 'incoming' &&
                index == chatMessages.length - 1 &&
                !isResponseGenerating &&
                isCursor
              "
              icon="fas fa-circle"
              size="x-small"
              class="CursorIcon"
            ></v-icon>
            <!-- cursor if i want a flickering ChatGPT cursor -->
          </p>
        </div>
      </div>
    </div>

    <div class="typing-area NavDrawerBasedMargin">
      <v-row>
        <v-col md="12"
          ><div class="typing-form">
            <div class="input-wrapper">
              <input
                v-model="userMessage"
                type="text"
                placeholder="Ask Copilot"
                class="typing-input"
                required
                @keyup.enter="handleOutgoingChat"
              />
              <!-- <v-icon
                id="delete-chat-button"
                class="icon"
                icon="fas fa-trash"
                rounded
              ></v-icon> -->
              <v-icon
                id="send-message-button"
                class="icon"
                icon="fas fa-arrow-right"
                rounded
                @click="handleOutgoingChat"
              ></v-icon>
            </div>
            <div class="action-buttons">
              <v-btn
                variant="flat"
                class="icon"
                icon
                @click="
                  () => {
                    chatMic = !chatMic;
                  }
                "
                ><v-icon
                  icon="fas fa-microphone"
                  size="x-small"
                  style="display: flex"
                >
                </v-icon>
                <div v-if="chatMic" class="pulse-ring"></div>
              </v-btn>
            </div></div
        ></v-col>
      </v-row>
    </div>
    <!-- <v-dialog
      transition="dialog-top-transition"
      v-model="showDeleteDialog"
      height="500"
      width="400"
      persistent
    >
      <v-card class="DialogCard">
        <v-card-title
          primary-title
          class="DialogCardTitle"
          style="padding-left: 24px !important"
        >
          Delete Chats ?
        </v-card-title>
        <v-card-text>
          <p>Are you sure you want to delete all chats ?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="NormalButton mr-2 mb-2"
            variant="flat"
            @click="
              () => {
                this.chatMessages = [];
                showDeleteDialog = false;
              }
            "
          >
            Delete
          </v-btn>
          <v-btn
            class="NormalButtonInverse mr-4 mb-2"
            variant="flat"
            @click="
              () => {
                showDeleteDialog = false;
              }
            "
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>
<script>
//   import axios from 'axios'
import { useStore } from "@/store/store";
export default {
  setup() {
    const store = useStore();
    return { store };
  },

  props: {
    isPopup: {
      required: false,
      default: false,
    },
  },
  data() {
    return {
      subtitle: "",
      userMessage: "",
      chatMic: false,
      isResponseGenerating: false,
      isResponseOver: true, //for preventing new input when response is still generating
      isCursor: false,
      isHeaderCursor: false,
      chatMessages: [],
      chatHistory: [],
      showDeleteDialog: false,
      // baseLink: "",
    };
  },
  mounted() {
    // this.baseLink = import.meta.env.VITE_MODEL_URL;
    setTimeout(() => {
      this.showHeaderTypingEffect("Hello User, how can I help you?");
    }, 1000);
  },
  methods: {
    generateAPIResponse() {
      let link = "http://10.100.25.55:8000/api/ask";
      // let link = this.baseLink + "/api/ask/";

      let formData = new FormData();
      formData.append("prompt", this.userMessage);

      //history parameter - too much history causes hallucination so maybe limit it later
      if (this.chatMessages.length > 2) {
        this.chatHistory = this.chatMessages
          .slice(0, -2) // Exclude only the last two messages(those are the user's current question and its loading placeholder)
          .reduce((acc, message, index, array) => {
            if (message.type === "outgoing") {
              // Find the next incoming message to pair with the current outgoing message
              const nextMessage = array[index + 1];
              if (nextMessage && nextMessage.type === "incoming") {
                acc.push({
                  user_message: message.text,
                  bot_response: nextMessage.text,
                });
              }
            }
            return acc;
          }, []);
      }
      if (this.chatHistory.length > 0) {
        formData.append("history", JSON.stringify(this.chatHistory));
      }

      // axios
      //   .post(link, formData)
      //   .then((res) => {
      //     let apiResponse = res.data.message;
      //     this.userMessage = "";
      //     this.isResponseGenerating = false;
      //     this.isCursor = true;
      //     this.showTypingEffect(apiResponse);
      //   })
      //   .catch((err) => {
      //     this.commonStore.showSnackBar(err?.response?.data?.message, "error");
      //     this.userMessage = "Something went wrong while retrieving the response. Please try again.";
      //     this.isResponseGenerating = false;
      //   });

      //temp
      setTimeout(() => {
        let apiResponse =
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
        this.userMessage = "";
        this.isResponseGenerating = false;

        this.showTypingEffect(apiResponse);
      }, 3000);
    },
    showHeaderTypingEffect(text) {
      this.isHeaderCursor = true;
      let currentWordIndex = 0;
      const words = text.split(" ");
      const typingInterval = setInterval(() => {
        this.subtitle +=
          (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex++];

        if (currentWordIndex === words.length) {
          clearInterval(typingInterval);

          setTimeout(() => {
            this.isHeaderCursor = false;
          }, 850);
        }
      }, 150);
    },
    showTypingEffect(text) {
      this.isCursor = true;
      let currentWordIndex = 0;
      const words = text.split(" ");
      const typingInterval = setInterval(() => {
        this.chatMessages[this.chatMessages.length - 1].text +=
          (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex++];
        // const message = this.chatMessages.find((msg) => msg.type === 'incoming' && !msg.text)
        // if (message) {
        //   message.text += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++]
        // }

        if (currentWordIndex === words.length) {
          clearInterval(typingInterval);
          this.isResponseGenerating = false;
          this.isResponseOver = true;

          setTimeout(() => {
            this.isCursor = false;
          }, 1000);
        }

        this.$nextTick(() => {
          const chatList = this.$el.querySelector(".chat-list");
          chatList.scrollTo(0, chatList.scrollHeight);

          // const chatList = ".chat-list"; //doesn't work if both ChatBig and ChatSmall is open
          // const element = document.querySelector(chatList);
          // element.scrollTop = element.scrollHeight;
        });
      }, 100);
    },

    handleOutgoingChat() {
      if (!this.userMessage || !this.isResponseOver) return;

      const outgoingMessage = {
        text: this.userMessage,
        type: "outgoing",
        avatar: "images/profile.png",
      };
      this.chatMessages.push(outgoingMessage);
      this.userMessage = "";

      this.$nextTick(() => {
        const chatList = this.$el.querySelector(".chat-list");
        chatList.scrollTo(0, chatList.scrollHeight);
        // const chatList = ".chat-list";
        // const element = document.querySelector(chatList);
        // element.scrollTop = element.scrollHeight;
      });

      this.isResponseGenerating = true;
      this.isResponseOver = false;

      this.$nextTick(() => {
        this.showLoadingAnimation();
      });
    },

    showLoadingAnimation() {
      const loadingMessage = {
        text: "",
        type: "incoming",
        avatar: "images/Chat-Assistant.svg",
      };
      this.chatMessages.push(loadingMessage);

      this.$nextTick(() => {
        const chatList = this.$el.querySelector(".chat-list");
        chatList.scrollTo(0, chatList.scrollHeight);
        // const chatList = ".chat-list";
        // const element = document.querySelector(chatList);
        // element.scrollTop = element.scrollHeight;
      });
      this.generateAPIResponse(); // Trigger the API call
    },

    deleteAllChats() {
      // this.chatMessages = []
      this.showDeleteDialog = true;
    },
  },
};
</script>
