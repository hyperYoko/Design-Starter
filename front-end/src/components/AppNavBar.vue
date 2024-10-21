<template>
  <v-app-bar
    class="AppBar"
    scroll-behavior="fade-image elevate"
    scroll-threshold="200"
  >
    <!-- <v-app-bar-nav-icon @click="navdrawer = !navdrawer"></v-app-bar-nav-icon> -->
    <v-app-bar-nav-icon @click="navdrawer = !navdrawer">
      <!-- change to active:false if i don't want to see x mark -->
      <label :class="{ active: navdrawer }">
        <div></div>
        <div></div>
        <div></div>
      </label>
    </v-app-bar-nav-icon>

    <v-app-bar-title
      style="font-size: 22px !important; font-weight: 800 !important"
    >
      Design Starter
    </v-app-bar-title>
    <!-- <v-app-bar-title>
      <v-img
        src="/src/assets/Images/LSC_Customer_Logo.png"
        :width="380"
      ></v-img>
    </v-app-bar-title> -->

    <v-spacer></v-spacer>
    <span style="margin-right: 25px; display: flex; justify-content: flex-end">
      <!-- <NotificationMenu /> -->
      <v-btn rounded="lg" style="margin-bottom: 2.5px">
        <v-badge color="error" :content="'5'" max="9"
          ><v-icon size="large"> fas fa-bell </v-icon>
        </v-badge>
      </v-btn>
      <v-menu location="bottom">
        <template v-slot:activator="{ isHovering, props }">
          <v-btn v-bind="props" rounded="lg">
            <!-- <template v-slot:prepend
              ><v-icon style="margin-bottom: 2.5px;">fas fa-circle-user</v-icon>
            </template> -->
            <template v-slot:append
              ><v-icon style="margin-bottom: 2.5px">fas fa-caret-down</v-icon>
            </template>
            <span>Super Admin</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in appBarItems"
            :key="i"
            :value="item"
            @click="appBarItemsAction(item.id)"
            density="compact"
            slim
            class="MenuListItems"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" size="medium"></v-icon>
            </template>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </span>
  </v-app-bar>
  <v-navigation-drawer
    rail
    expand-on-hover
    width="270"
    v-model="navdrawer"
    class="NavBar"
    elevation="2"
  >
    <!-- 'nav' prop for v-list + NavBarListItems style + list-item-title inline style is used for rounded list items 
    that also do not mess up the navbar icon and hamburger icon alignment -->
    <v-list nav>
      <v-list-item
        v-for="(item, i) in navBarItems"
        :key="i"
        :value="item"
        @click="navBarItemsAction(item.id)"
        class="py-2 NavBarListItems"
        slim
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon" ></v-icon>
        </template>
        <v-list-item-title style="font-size: 15px; line-height: 1.15rem">{{
          item.text
        }}</v-list-item-title>
        <template v-slot:append>
          <v-icon
            icon="fas fa-angle-right"
            size="x-small"
            class="NavBarListItemAppendIcon"
          ></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import NotificationMenu from "@/components/NotificationMenu.vue";
export default {
  setup() {},

  data: () => ({
    appBarItems: [
      { text: "User Profile", icon: "fas fa-user", id: 1 },
      { text: "Logout", icon: "fas fa-right-from-bracket", id: 2 },
    ],
    navdrawer: true,
    navBarItems: [
      { text: "Page 1", icon: "fas fa-file-lines", id: 1 },
      { text: "Form", icon: "fas fa-file-lines", id: 2 },
      { text: "Page 3", icon: "fas fa-file-lines", id: 2 },
    ],
  }),
  methods: {
    appBarItemsAction(id) {},
    navBarItemsAction(id) {
      if (id == 1) {
        this.$router.push({ name: "Page1" });
      } else if (id == 2) {
        this.$router.push({ name: "Form" });
      } else if (id == 3) {
        this.$router.push({ name: "Page3" });
      }
    },
  },
  created() {},
  components: {
    // NotificationMenu,
  },
};
</script>

<style scoped lang="scss">
@import "@/style.scss";

/* hamburger CSS */
label {
  position: absolute;
  /* top: 50%;
  right: 0;
  left: 0;
  display: block; */
  width: 60px;
  height: 60px;
  /* margin: -30px auto 0 auto; */
  cursor: pointer;
  transform: scale(0.3);
}

label div {
  position: relative;
  top: 0;
  height: 12px;
  background-color: $primary-color;
  margin-bottom: 12px;
  transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width,
    0.3s ease right;
  border-radius: 2px;
}

label div:first-child {
  transform-origin: 0;
}

label div:last-child {
  margin-bottom: 0;
  transform-origin: 60px;
}

label div:nth-child(2) {
  right: 0;
  width: 60px;
}

label.active div:first-child {
  top: -6px;
  transform: rotateZ(45deg);
}

label.active div:last-child {
  top: 6px;
  transform: rotateZ(45deg);
}

label.active div:nth-child(2) {
  width: 85px;
  top: 0;
  right: 13px;
  transform: rotateZ(-45deg);
}
</style>
