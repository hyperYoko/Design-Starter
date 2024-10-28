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
            class="NavBarListItemTitle"
            style="padding-left: 20px"
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
                >Reset</v-btn
              >
              <v-btn
                class="NormalButtonContrast NormalButtonHeaderDimensions"
                variant="flat"
                style="margin-bottom: 10px"
                >Save</v-btn
              >
              <!-- margin-bottom to counter title card's need for padding-bottom = 0 for tabs  -->
            </div>
          </v-card>

          <v-card class="SubNavBarPageBodyCard" variant="flat">
            <div>
              <h3>Profile</h3>
              <v-row style="margin-top: 10px">
                <v-col sm="8" md="4">
                  <p class="SubNavBarPageFieldLabel mb-2">Profile Image</p>

                  <v-img
                    rounded="circle"
                    aspect-ratio="1/1"
                    cover
                    src="/images/profile.png"
                    class="ProfileImage"
                  >
                    <div class="ProfileImageOverlay">
                      <v-icon
                        icon="fas fa-pen"
                        style="display: flex; color: white"
                      ></v-icon>
                    </div>
                  </v-img> </v-col
              ></v-row>
              <v-row style="margin-top: 10px">
                <v-col sm="8" md="4">
                  <p class="SubNavBarPageFieldLabel">First Name</p>

                  <v-text-field
                    variant="outlined"
                    class="SubNavBarPageField"
                    hide-details
                    density="comfortable"
                  ></v-text-field> </v-col
              ></v-row>
              <v-row style="margin-top: 10px; margin-bottom: 10px">
                <v-col sm="8" md="4">
                  <p class="SubNavBarPageFieldLabel">Last Name</p>

                  <v-text-field
                    variant="outlined"
                    class="SubNavBarPageField"
                    hide-details
                    density="comfortable"
                  ></v-text-field> </v-col
              ></v-row>
            </div>
            <div style="margin-top: 20px">
              <v-card variant="flat" class="SubNavBarPageCard">
                <!-- <template v-slot:prepend>
                  <v-icon icon="fas fa-gear" size="small" style="display: flex;"></v-icon>
                </template> -->
                <v-card-item class="SubNavBarPageHeader">
                  <template v-slot:title>
                    <h3 class="PageTitleCardText" style="font-size: 19px"
                      >Export Config</h3
                    >
                  </template>
                </v-card-item>

                <v-card-text class="SubNavBarPageText">
                  <h3 style="font-size: 16px">SubTotal</h3>
                  <p style="margin-top: 10px">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi, ratione debitis quis est labore voluptatibus! Eaque
                    cupiditate minima, at placeat totam, magni doloremque veniam
                    neque porro libero rerum unde voluptatem!
                  </p>
                </v-card-text>
              </v-card>
            </div>
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
