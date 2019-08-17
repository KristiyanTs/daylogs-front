<template>
  <FormTemplate
    :open="open"
    :steps="steps"
    :stepValid="stepValid"
    @closeDialog="closeDialog"
    @stepUpdated="updateStep"
    @submit="submitProject"
  >
    <template v-slot:General>
      <v-text-field
        outlined
        v-model="project.title"
        placeholder="Project title"
        :rules="rules.title"
        required
      />
      <v-textarea
        outlined
        v-model="project.short_description"
        placeholder="A short description of this project"
      />
    </template>
    <template v-slot:Workflow>
      <StatusList @updated="updateStatusList" />
    </template>
    <template v-slot:NodeTypes>
      <CategoryList @updated="updateCategoryList" />
    </template>
  </FormTemplate>
</template>

<script>
import FormTemplate from "@/components/FormStepperScreen";
import StatusList from "./Statuses/StatusList";
import CategoryList from "./Categories/CategoryList";

export default {
  components: {
    FormTemplate,
    StatusList,
    CategoryList
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      step: 1,
      steps: ["General", "Workflow", "Node Types"],
      project: {
        title: "",
        short_description: ""
      },
      category_list: {},
      status_list: {},
      rules: {
        title: [
          v => !!v || "Title is required",
          v => (v && v.length <= 12) || "Title must be less than 12 characters"
        ]
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    updateStep(step) {
      this.step = step;
    },
    updateStatusList(status_list) {
      this.status_list = status_list;
    },
    updateCategoryList(category_list) {
      this.category_list = category_list;
    },
    submitProject() {
      this.axios
        .post("/api/nodes", {
          node: {
            ...this.project,
            statuses_attributes: this.status_list.statuses,
            categories_attributes: this.category_list.categories
          }
        })
        .then(() => {
          this.closeDialog();
          this.resetForm();
          this.$emit("reload");
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    resetForm() {
      this.step = 1;
      this.project = {
        title: "",
        short_description: ""
      };
      this.category_list = {};
      this.status_list = {};
    }
  },
  computed: {
    stepValid() {
      if (this.step == 1) {
        return this.project.title.length && this.project.title.length < 13;
      } else if (this.step == 2) {
        return this.status_list.statuses.length > 0;
      } else if (this.step == 3) {
        return this.category_list.categories.length > 0;
      } else {
        return false;
      }
    }
  }
}
</script>