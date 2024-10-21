<template>
  <div class="PageBackgroundDiv">
    <v-container
      style="min-height: calc(100vh - 64px)"
      class="PageBackgroundContainer"
      fluid
    >
      <v-card class="PageTitleCard">
        <v-card-title primary-title>
          <div class="PageTitleCardText">{{ formTitle }}</div>
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
          <v-btn
            icon="fas fa-rotate-left"
            size="x-small"
            class="ActionButton ActionButtonDimensions"
            style="margin-right: 3px"
            variant="flat"
            @click="
              () => {
                sections_header = {
                  header_name: 'Form Name',
                  header_description: 'This is the form description.',
                };
                sections = [];
              }
            "
          ></v-btn>
          <v-btn
            icon="fas fa-save"
            size="x-small"
            class="ActionButtonInverse ActionButtonInverseDimensions"
            variant="flat"
          ></v-btn>
        </span>
      </v-card>

      <v-card class="PageBodyCard">
        <v-card :class="['Header', getHeaderClass(sections)]" variant="flat">
          <v-card-title>
            <v-row>
              <v-col md="8" class="pb-0">
                <v-text-field
                  v-model="sections_header.header_name"
                  variant="plain"
                  class="FormHeaderTextField"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col
                md="4"
                class="pb-0"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                "
              >
                <v-tooltip location="start" text="Add Section">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      icon="fas fa-plus"
                      size="small"
                      class="ActionButtonInverse"
                      variant="flat"
                      @click="addSection"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="sections_header.header_description"
              variant="plain"
              class="FormHeaderDescriptionField"
              hide-details
              density="compact"
            ></v-text-field>
          </v-card-text>
        </v-card>

        <v-card
          v-for="(section, sectionIndex) in sections"
          :key="sectionIndex"
          :class="['Section', getSectionClass(sectionIndex)]"
          variant="flat"
        >
          <v-card-text>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 16px;
              "
            >
              <v-text-field
                v-model="section.section_name"
                variant="plain"
                class="FormSectionTextField"
                hide-details
                density="compact"
              ></v-text-field>
              <v-tooltip location="start" text="Delete Section">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="fas fa-trash"
                    size="x-small"
                    class="ActionButton mr-1"
                    variant="flat"
                    @click="
                      () => {
                        this.sections.splice(sectionIndex, 1);
                      }
                    "
                  ></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="start" text="Add Field Group">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="fas fa-plus"
                    size="x-small"
                    class="ActionButtonInverse"
                    variant="flat"
                    @click="addFieldGroup(sectionIndex)"
                  ></v-btn>
                </template>
              </v-tooltip>
            </div>

            <div
              v-for="(fieldGroup, fieldGroupIndex) in section.fieldGroups"
              :key="fieldGroupIndex"
            >
              <v-row
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin: 0 16px !important;
                "
              >
                <v-text-field
                  v-model="fieldGroup.fieldGroup_name"
                  variant="plain"
                  class="FormFieldGroupTextField"
                  hide-details
                  density="compact"
                ></v-text-field>
                <v-tooltip location="start" text="Add Field">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      icon="fas fa-plus"
                      size="x-small"
                      class="ActionButton"
                      variant="flat"
                      @click="addField(sectionIndex, fieldGroupIndex)"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </v-row>

              <v-row style="margin: 16px" justify="space-between">
                <template
                  v-for="(field, fieldIndex) in fieldGroup.fields"
                  :key="fieldIndex"
                >
                  <v-col md="6" class="FieldCols">
                    <p class="FieldLabel">{{ field.field_name }}</p>

                    <v-text-field
                      v-if="field.field_type === 'text'"
                      v-model="field.field_value"
                      variant="outlined"
                      class="Field"
                      hide-details
                      density="compact"
                    ></v-text-field>

                    <v-text-field
                      v-if="field.field_type === 'number'"
                      v-model="field.field_value"
                      type="number"
                      variant="outlined"
                      class="Field"
                      hide-details
                      density="compact"
                    ></v-text-field>

                    <v-text-field
                      v-if="field.field_type === 'date'"
                      type="date"
                      v-model="field.field_value"
                      class="Field FieldDate"
                      variant="outlined"
                      hide-details
                      density="compact"
                    ></v-text-field>

                    <v-item-group
                      v-if="field.field_type === 'boolean'"
                      v-model="field.field_value"
                      class="FieldBoolGroup"
                      :mandatory="true"
                      @update:model-value="console.log(field.field_value)"
                    >
                      <v-item
                        v-slot="{ isSelected, selectedClass, toggle }"
                        v-for="item in ['Yes', 'No']"
                        :key="item"
                        :value="item"
                      >
                        <v-btn
                          :value="item"
                          :class="{
                            FieldBoolButton: true,
                            FieldBoolButton_selected: isSelected,
                          }"
                          variant="flat"
                          @click="toggle"
                        >
                          {{ item }}
                        </v-btn>
                      </v-item>
                    </v-item-group>

                    <v-file-input
                      v-if="field.field_type === 'file'"
                      prepend-icon=""
                      append-inner-icon="fas fa-file-arrow-up"
                      variant="outlined"
                      v-model="field.field_value"
                      class="Field"
                      hide-details
                      clearable
                      chips
                      density="compact"
                    ></v-file-input>

                    <v-select
                      v-if="field.field_type === 'select'"
                      variant="outlined"
                      :items="field.field_format"
                      v-model="field.field_value"
                      class="Field"
                      hide-details
                      density="compact"
                    ></v-select>
                  </v-col>
                </template>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
        <v-card
          class="Section Section-last Section-submit"
          variant="flat"
          v-if="sections.length > 0"
        >
          <v-btn class="NormalButton"> Submit </v-btn>
        </v-card>

        <!-- <v-card class="Header Header-NoSection" variant="flat">
          <v-card-title>
            <v-row>
              <v-col md="8" class="pb-0">
                <v-text-field
                  :model-value="sections_header.header_name"
                  variant="plain"
                  class="FormHeaderTextField"
                  hide-details
                  density="compact"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-text-field
              value="Your response has been submitted."
              variant="plain"
              class="FormHeaderDescriptionField"
              hide-details
              density="compact"
              readonly
            ></v-text-field>
          </v-card-text>
        </v-card> -->
      </v-card>
      <v-dialog v-model="addFieldDialog" width="500" persistent>
        <v-card class="DialogCard">
          <v-card-title primary-title class="DialogCardTitle" style="padding-left: 24px !important;"
            >Add Field</v-card-title
          >
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  label="Field Name"
                  variant="outlined"
                  v-model="newFieldName"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  label="Field Type"
                  variant="outlined"
                  :items="[
                    'text',
                    'number',
                    'date',
                    'boolean',
                    'file',
                    'select',
                  ]"
                  v-model="newFieldType"
                  hide-details
                  density="compact"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- <v-select
                    label="Type Format"
                    variant="outlined"
                    :items="[
                        'text',
                        'number',
                        'date',
                        'boolean',
                        'file',
                    ]"
                    v-model="newFieldType"
                    hide-details
                    density="compact"
                ></v-select> -->
                <v-combobox
                  v-if="newFieldType == 'select'"
                  v-model="newFieldFormatSelect"
                  :items="[]"
                  label="Field Items"
                  variant="outlined"
                  multiple
                  chips
                  closable-chips
                  clearable
                  hide-details
                  density="compact"
                >
                </v-combobox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="NormalButton mr-2 mb-2"
              variant="flat"
              @click="confirmAddField"
            >
              Add
            </v-btn>
            <v-btn
              class="NormalButtonInverse mr-4 mb-2"
              variant="flat"
              @click="closeAddFieldDialog"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
// import { useCommonStore } from '@/stores/common'
// import { useLinkStore } from '@/stores/links'
// import axios from '@/axios'
export default {
  //   setup() {
  //     const commonStore = useCommonStore()
  //     const linkStore = useLinkStore()
  //     return { commonStore, linkStore }
  //   },

  data() {
    return {
      sections_header: {
        header_name: "Form Name",
        header_description: "This is the form description.",
      },

      sections: [],
      addFieldDialog: false,
      sectionIndexForNewField: null,
      fieldGroupIndexForNewField: null,
      newFieldName: null,
      newFieldType: null,
      newFieldFormatSelect: null,
      submitFormCompleted: false,
    };
  },
  created() {
    this.sections_header = {
      header_name: "Add Customer",
      header_description: "This is the form description.",
    };
    this.sections = [
      {
        section_name: "Basic Information",
        fieldGroups: [
          {
            fieldGroup_name: "Field Group 1",
            fields: [
              {
                field_name: "Customer Entity Name",
                field_type: "text",
                field_value_type: "text",
                field_value: "",
              },
              {
                field_name: "Customer Type",
                field_type: "select",
                field_value_type: "text",
                field_format: ["Individual", "Business"],
                field_value: "",
              },
              {
                field_name: "Business Registration Number",
                field_type: "text",
                field_value_type: "text",
                field_value: "",
              },
              {
                field_name: "Type of Business",
                field_type: "select",
                field_value_type: "text",
                field_format: [
                  "Public",
                  "Private",
                  "LLP",
                  "Proprietorship",
                  "Freelancer",
                ],
                field_value: "",
              },
            ],
          },
        ],
      },
      {
        section_name: "Advanced Information",
        fieldGroups: [
          {
            fieldGroup_name: "Field Group 2",
            fields: [
              {
                field_name: "Primary Contact Email",
                field_type: "text",
                field_value_type: "text",
                field_value: "",
              },
              {
                field_name: "Business Description",
                field_type: "text",
                field_value_type: "text",
                field_value: "",
              },
            ],
          },
        ],
      },
    ];
    console.log(this.sections);
  },
  computed: {
    formTitle() {
      return "Form";
    },
  },
  methods: {
    addSection() {
      this.sections.push({
        section_name: "Section",
        fieldGroups: [],
      });
    },
    addFieldGroup(sectionIndex) {
      this.sections[sectionIndex].fieldGroups.push({
        fieldGroup_name: "Field Group",
        fields: [],
      });
    },
    addField(sectionIndex, fieldGroupIndex) {
      this.sections[sectionIndex].fieldGroups[fieldGroupIndex].fields.push({
        field_name: null,
        field_type: null,
        field_value_type: null,
        field_format: null,
        field_value: null,
      });
      this.sectionIndexForNewField = sectionIndex;
      this.fieldGroupIndexForNewField = fieldGroupIndex;
      this.addFieldDialog = true;
    },
    confirmAddField() {
      let fieldGroup =
        this.sections[this.sectionIndexForNewField].fieldGroups[
          this.fieldGroupIndexForNewField
        ];
      let field = fieldGroup.fields[fieldGroup.fields.length - 1];
      field.field_name = this.newFieldName;
      field.field_type = this.newFieldType;
      field.field_value_type =
        this.newFieldType === "select" ? "text" : this.newFieldType;
      field.field_format = this.newFieldFormatSelect;
      this.newFieldName = null;
      this.newFieldType = null;
      this.newFieldFormatSelect = null;
      this.addFieldDialog = false;
    },
    closeAddFieldDialog() {
      let fieldGroup =
        this.sections[this.sectionIndexForNewField].fieldGroups[
          this.fieldGroupIndexForNewField
        ];
      fieldGroup.fields.pop();
      this.newFieldName = null;
      this.newFieldType = null;
      this.newFieldFormatSelect = null;

      this.addFieldDialog = false;
    },
    getHeaderClass(sections) {
      if (this.sections.length > 0) {
        return "Header-Section";
      } else {
        return "Header-NoSection";
      }
    },
    getSectionClass(index) {
      return "Section-middle";
    },
  },
};
</script>
<style></style>
