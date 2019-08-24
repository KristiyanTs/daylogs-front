<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title> Task statuses </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="addStatus" color="grey">
        <font-awesome-icon icon="plus" />
      </v-btn>
      <v-btn icon @click="resetStatuses" color="grey">
        <font-awesome-icon icon="redo-alt" />
      </v-btn>
      <v-btn
        rounded
        @click="saveStatuses"
        color="success"
        class="mr-1"
        depressed
        :loading="saving"
      >
        <font-awesome-icon icon="save" class="mr-2" />
        Save
      </v-btn>
    </v-toolbar>
    <v-list two-line v-if="statuses.length">
      <draggable
        v-model="statuses"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
        draggable=".v-list-item"
      >
        <v-list-item v-for="(item, i) in statuses" :key="i">
          <v-list-item-avatar>
            <ColorPicker
              :color="item.color"
              @changeColor="color => changeColor(color, i)"
            />
          </v-list-item-avatar>

          <v-list-item-content v-if="item.editing">
            <v-text-field v-model="item.title" placeholder="Label" />
            <v-text-field v-model="item.description" placeholder="Description" />
          </v-list-item-content>
          <v-list-item-content v-else>
            <v-list-item-title v-text="item.title" />
            <v-list-item-subtitle v-html="item.description" />
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              v-if="item.editing"
              fab
              depressed
              outlined
              small
              color="primary"
              @click="deactivateAllStatuses"
            >
              <font-awesome-icon icon="check" />
            </v-btn>
            <v-flex v-else>
              <v-btn icon @click="activateStatus(i)" color="grey">
                <font-awesome-icon icon="edit" />
              </v-btn>
              <v-btn icon @click="deleteStatus(i)" color="grey">
                <font-awesome-icon icon="trash-alt" />
              </v-btn>
            </v-flex>
          </v-list-item-action>
        </v-list-item>
      </draggable>
    </v-list>
  </v-flex>
</template>

<script>
import ColorPicker from "@/components/ColorPicker";
import draggable from "vuedraggable";

export default {
  components: {
    ColorPicker,
    draggable
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      },
      statuses: [],
      saved_statuses: [],
      loading: true,
      saving: false
    };
  },
  methods: {
    getStatuses() {
      this.loading = true;
      this.axios
        .get(`/api/nodes/${this.rootId}/statuses`)
        .then(response => {
          this.loading = false;
          this.saved_statuses = response.data;
          this.resetStatuses();
        })
        .catch(error => {});
    },
    saveStatuses() {
      this.saving = true;
      this.axios
        .put(`/api/nodes/${this.rootId}`, {
          node: {
            statuses_attributes: this.statuses
          }
        })
        .then(() => {
          this.saving = false;
          this.$store.commit("ADD_ALERT", [
            "Statuses saved successfully",
            "success"
          ]);
        })
    },
    resetStatuses() {
      this.statuses = JSON.parse(JSON.stringify(this.saved_statuses));
    },
    deactivateAllStatuses() {
      let status;

      this.statuses.map((s, idx) => {
        status = s;
        status.editing = false;
        this.statuses.splice(idx, 1, status);
      });
    },
    activateStatus(idx) {
      this.deactivateAllStatuses();

      let status = this.statuses[idx];
      status.editing = true;

      this.statuses.splice(idx, 1, status);
    },
    deleteStatus(idx) {
      this.statuses.splice(idx, 1);
    },
    addStatus() {
      this.deactivateAllStatuses();
      this.statuses.unshift({
        title: "",
        editing: true,
        description: "",
        color: "#9E9E9E"
      });
    },
    changeColor(color, idx) {
      let status = this.statuses[idx];
      status.color = color;
      this.statuses.splice(idx, 1, status);
    }
  },
  computed: {
    rootId() {
      return this.$route.params.id;
    }
  },
  watch: {
    rootId: {
      immediate: true,
      handler() {
        if (this.rootId) {
          this.getStatuses();
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.ghost
  opacity: 0.2
  background: #c8ebfb
  .v-list-item__action, .v-list-item__content, .v-list-item__avatar
    opacity: 0
</style>