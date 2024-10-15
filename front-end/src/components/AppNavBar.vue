<template>
  <v-app-bar
    class="AppBar"
    scroll-behavior="fade-image elevate"
    scroll-threshold="200"
  >
    <v-app-bar-nav-icon @click="navdrawer = !navdrawer"></v-app-bar-nav-icon>

    <v-app-bar-title> Design Starter </v-app-bar-title>
    <!-- <v-app-bar-title>
      <v-img
        src="/src/assets/Images/LSC_Customer_Logo.png"
        :width="380"
      ></v-img>
    </v-app-bar-title> -->
    <v-spacer></v-spacer>
    <!-- <NotificationMenu /> -->
    <span style="height: 43px !important; margin-right: 25px">
      <v-menu location="bottom">
        <template v-slot:activator="{ isHovering, props }">
          <v-btn
            v-bind="props"
            append-icon="fas fa-sort-down"
            style="height: 43px !important"
          >
            <div style="margin-top: 6px">Super Admin</div>
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
    width="290"
    v-model="navdrawer"
    class="NavBar"
    elevation="2"
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in navBarItems"
        :key="i"
        :value="item"
        @click="navBarItemsAction(item.id)"
        class="py-2 NavBarListItems"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
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
      { text: "Page 1", icon: "fas fa-chart-simple", id: 1 },
      { text: "Page 2", icon: "fas fa-file-lines", id: 2 },
    ],
  }),
  methods: {
    appBarItemsAction(id) {},
    navBarItemsAction(id) {
      if (id == 1) {
        this.$router.push({ name: "Page1" });
      } else if (id == 2) {
        this.$router.push({ name: "Page2" });
      }
    },
  },
  created() {},
  components: {
    // NotificationMenu,
  },
};
</script>

<style scoped></style>
