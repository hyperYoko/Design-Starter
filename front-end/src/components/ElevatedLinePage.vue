<template>
  <div class="PageBackgroundDiv">
    <v-container
      style="min-height: calc(100vh - 64px)"
      class="PageBackgroundContainer"
    >
      <v-card class="ElevatedTabsLinePageTitleCard mb-3">
        <div style="width: 90%; display: flex; flex-direction: column">
          <v-card-title primary-title>
            <div class="ElevatedTabsLinePageTitleCardText">Elevated Page</div>
          </v-card-title>
          <v-divider :thickness="2" style="margin-left: 16px;"></v-divider>
          <div style="margin-left: 16px">
            <v-tabs
              v-model="tab"
              align-tabs="start"
              class="ElevatedTabsLinePageTabs"
              density="comfortable"
            >
              <!-- align tabs center if needed -->
              <v-tab value="one">Summary</v-tab>
              <v-tab value="two">Leads</v-tab>
              <v-tab value="three">Schedule</v-tab>
            </v-tabs>
          </div>
        </div>
        <div
          style="
            width: 10%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-right: 16px;
          "
        >
          <v-btn
            icon="fas fa-plus"
            size="small"
            class="ActionButton"
            variant="flat"
            style="margin-bottom: 10px"
          ></v-btn>
          <!-- margin-bottom to counter title card's need for padding-bottom = 0 for tabs  -->
        </div>
      </v-card>
      <v-card class="ElevatedCrumbsLinePageTitleCard">
        <div style="width: 90%; display: flex; flex-direction: column">
          <v-card-title primary-title>
            <div class="ElevatedTabsLinePageTitleCardText">Elevated Page</div>
          </v-card-title>
          <v-divider :thickness="2" style="margin-left: 16px;"></v-divider>
          <div style="margin-left: 16px">
            <v-breadcrumbs
              :items="['Foo', 'Bar', 'Fizz']"
              density="compact"
              class="ElevatedCrumbsLinePageCrumbs"
            >
              <template v-slot:divider>
                <v-icon size="x-small" icon="fas fa-angle-right" style="display: flex;"></v-icon>
              </template>
            </v-breadcrumbs>
            <!-- make the previous crumbs black and underlined when hover but leave current page crumb as just black -->
          </div>
        </div>
        <div
          style="
            width: 10%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-right: 16px;
          "
        >
          <v-btn
            icon="fas fa-plus"
            size="small"
            class="ActionButton"
            variant="flat"
          ></v-btn>
        </div>
      </v-card>
      <!-- <v-card class="PageBodyCard"> </v-card> -->
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return { tab: "one" };
  },
};
</script>
<style></style>
