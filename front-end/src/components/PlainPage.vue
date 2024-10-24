<template>
  <div class="PlainPageBackgroundDiv">
    <v-container
      style="min-height: calc(100vh - 64px)"
      class="PlainPageBackgroundContainer"
      fluid
    >
      <v-card class="PlainTabsLinePageTitleCard" variant="flat">
        <div style="width: 70%; display: flex; flex-direction: column">
          <v-card-title primary-title>
            <div class="ElevatedTabsLinePageTitleCardText">Plain Page</div>
          </v-card-title>
          <div style="margin-left: 16px">
            <v-tabs
              v-model="tab"
              align-tabs="start"
              class="ElevatedTabsLinePageTabs"
              density="comfortable"
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

      <v-card class="PlainTabsLinePageBodyCard" variant="flat"> </v-card>
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
