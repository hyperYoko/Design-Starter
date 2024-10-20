<template>
  <div class="PageBackgroundDiv">
    <v-container
      style="min-height: calc(100vh - 64px)"
      class="PageBackgroundContainer"
    >
      <!-- remove v-container fluid prop for smaller width -->
      <v-card class="PageTitleCard">
        <v-card-title primary-title>
          <div class="PageTitleCardText">Page 1</div>
        </v-card-title>
        <v-spacer></v-spacer>
        <span
          style="
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-right: 16px;
          "
        >
          <!-- span's margin-right: 16px is to match card-title's padding-left -->
          <v-btn
            icon="fas fa-plus"
            size="x-small"
            class="ActionButton"
            variant="flat"
          ></v-btn>
          <!-- <v-btn
            icon="fas fa-plus"
            size="x-small"
            class="ActionButtonInverse"
            variant="flat"
          ></v-btn> -->
        </span>
      </v-card>

      <v-card class="PageBodyCard">
        <v-row class="CardsRow">
          <v-col md="4" v-for="n in 3">
            <v-card variant="flat" class="ImageCard">
              <v-row style="height: 80%">
                <v-col md="12">
                  <v-img
                    src="/images/Card-Image.svg"
                    class="ImageCardImage"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row style="height: 20%">
                <v-col md="12">
                  <div class="ImageCardText">Users</div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="PageBodyCard mt-2">
        <v-row class="CardsRow">
          <v-col md="4" v-for="n in 3">
            <v-card
              variant="flat"
              :class="{
                SelectableCard: true,
                SelectableCard_selected: cardSelected,
              }"
              @click="cardSelected = !cardSelected"
              :hover="false"
              :ripple="false"
            >
              <v-row style="height: 10%">
                <v-col md="12" class="SelectedCardCheckboxCol">
                  <v-checkbox
                    v-model="cardSelected"
                    hide-details
                    class="SelectableCardCheckbox"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row style="height: 45%">
                <v-col md="12">
                  <v-img
                    src="/images/Card-Image.svg"
                    class="SelectableCardImage"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row style="height: 45%">
                <v-col md="12" class="SelectableCardTextHeadCol">
                  <div class="SelectableCardTextHead">Users</div>
                </v-col>
                <v-col md="12" class="SelectableCardTextBodyCol">
                  <div class="SelectableCardTextBody">
                    This is the card information.
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="PageBodyCard mt-2">
        <v-row class="ButtonsRow">
          <v-col md="12" style="display: flex; justify-content: space-between">
            <v-btn variant="flat" class="PreviousButton">
              <v-icon class="PreviousButtonArrow" size="x-small"
                >fas fa-arrow-left</v-icon
              >
              <span class="PreviousButtonLabel">Prev</span>
            </v-btn>
            <v-btn variant="flat" class="NormalButton"> Normal </v-btn>
            <v-btn variant="flat" class="NormalButtonInverse"> Normal </v-btn>
            <!-- NormalButtonContrast and NormalButtonContrastInverse styles also available -->

            <v-btn variant="flat" class="NextButton">
              <span class="NextButtonLabel">Next</span>
              <v-icon class="NextButtonArrow" size="x-small"
                >fas fa-arrow-right</v-icon
              >
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="PageBodyCard mt-2">
        <v-data-table :items="items" class="DataTable" show-select>
          <template v-slot:top>
            <v-toolbar variant="flat" class="DataTableTop">
              <v-text-field
                v-model="search"
                variant="flat"
                append-inner-icon="fas fa-magnifying-glass"
                hide-details
                density="compact"
                class="SearchField"
              ></v-text-field>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardSelected: false,
      items: [
        {
          name: "African Elephant",
          species: "Loxodonta africana",
          diet: "Herbivore",
          habitat: "Savanna, Forests",
        },
        {
          name: "African Elephant",
          species: "Loxodonta africana",
          diet: "Herbivore",
          habitat: "Savanna, Forests",
        },
        {
          name: "African Elephant",
          species: "Loxodonta africana",
          diet: "Herbivore",
          habitat: "Savanna, Forests",
        },
        {
          name: "African Elephant",
          species: "Loxodonta africana",
          diet: "Herbivore",
          habitat: "Savanna, Forests",
        },
        {
          name: "African Elephant",
          species: "Loxodonta africana",
          diet: "Herbivore",
          habitat: "Savanna, Forests",
        },
      ],
    };
  },
};
</script>
<style></style>
