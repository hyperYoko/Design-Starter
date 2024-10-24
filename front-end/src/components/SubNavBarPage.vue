<template>
  <div class="SubNavBarPageBackgroundDiv">
    <v-navigation-drawer
      width="270"
      v-model="subnavdrawer"
      class="SubNavBar"
      permanent
    >
      <!-- main and sub navbar widths must match -->
      <!-- add floating prop to nav bar and remove bg-color if i want a flat variant -->
      <v-list nav>
        <v-list-item
          v-for="(item, i) in subNavBarItems"
          :key="i"
          :value="item"
          @click="subNavBarItemsAction(item.id)"
          class="py-2 SubNavBarListItems"
          slim
        >
          <v-list-item-title
            style="font-size: 15px; line-height: 1.15rem; padding-left: 20px"
            >{{ item.text }}</v-list-item-title
          >
          <!-- <template v-slot:append>
            <v-icon
              icon="fas fa-angle-right"
              size="x-small"
              class="NavBarListItemAppendIcon"
            ></v-icon>
          </template> -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container
      style="min-height: calc(100vh - 64px)"
      class="SubNavBarPageBackgroundContainer"
      fluid
    >
      <v-tabs-window v-model="navTab">
        <v-tabs-window-item value="navtabone">
          <v-card class="SubNavBarPageTitleCard" variant="flat">
            <div
              style="
                width: 70%;
                display: flex;
                flex-direction: column;
                margin-left: 16px;
              "
              class="SubNavBarPageBorderBottom"
            >
              <!-- I have removed padding-left from card title and margi-left from div and instead added it to the above div to make border-bottom proper -->
              <v-card-title primary-title style="padding-left: 0px">
                <div class="ElevatedTabsLinePageTitleCardText">
                  SubNavBar Page
                </div>
              </v-card-title>
              <div>
                <v-tabs
                  v-model="bodyTab"
                  align-tabs="start"
                  class="SubNavBarPageTabs"
                >
                  <v-tab value="one">Summary</v-tab>
                  <v-tab value="two">Leads</v-tab>
                  <v-tab value="three">Schedule</v-tab>
                </v-tabs>
              </div>
            </div>
            <div
              style="
                width: 30%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-right: 16px;
              "
              class="SubNavBarPageBorderBottom"
            >
              <v-btn
                class="NormalButtonContrastInverse NormalButtonHeaderDimensions"
                style="margin-right: 10px; margin-bottom: 10px"
                variant="flat"
                >Email Tools</v-btn
              >
              <v-btn
                class="NormalButtonContrast NormalButtonHeaderDimensions"
                variant="flat"
                style="margin-bottom: 10px"
                >Create Email</v-btn
              >
              <!-- margin-bottom to counter title card's need for padding-bottom = 0 for tabs  -->
            </div>
          </v-card>

          <v-card class="SubNavBarPageBodyCard" variant="flat">
             </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="navtabtwo"> </v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subnavdrawer: true,
      subNavBarItems: [
        { text: "Sub 1", id: 1 },
        { text: "Sub 2", id: 2 },
      ],
      navTab: "navtabone",
      bodyTab: "one",
    };
  },
  methods: {
    subNavBarItemsAction(id) {
      if (id == 1) {
        this.navTab = "navtabone";
      } else if (id == 2) {
        this.navTab = "navtabtwo";
      }
    },
  },
};
</script>
<style></style>
