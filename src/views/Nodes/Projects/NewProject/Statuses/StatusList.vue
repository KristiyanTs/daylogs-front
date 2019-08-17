<template>
  <div>
    <v-banner two-lines elevation="0" tile>
      <font-awesome-icon
        icon="info-circle"
        color="grey"
        slot="icon"
        size="2x"
      />
      Create your own set of statuses or customize an existing one. <br />
      <b>The order of the statuses matters(drag to reorder).</b> The first one is set to newly created items.
    </v-banner>
    <v-toolbar dense elevation="1">
      <v-toolbar-title>
        {{ status.label }} <span class="grey--text">({{ status.statuses.length }})</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text v-for="s in statuses" :key="s.label" @click="setStatus(s)">
          {{ s.label }}
        </v-btn>
      </v-toolbar-items>
      <v-btn icon @click="resetStatus">
        <font-awesome-icon icon="redo-alt" color="grey" />
      </v-btn>
      <v-btn icon @click="addStatus">
        <font-awesome-icon icon="plus" color="grey" />
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <draggable
        v-model="status.statuses"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
        draggable=".v-list-item"
      >
        <v-list-item v-for="(item, i) in status.statuses" :key="i">
          <v-list-item-avatar>
            <ColorPicker
              :color="item.color"
              @changeColor="color => changeColor(color, i)"
            />
          </v-list-item-avatar>
          <v-list-item-content v-if="item.editing">
            <v-text-field v-model="item.title" placeholder="Label" />
            <v-text-field
              v-model="item.description"
              placeholder="Description"
            />
          </v-list-item-content>
          <v-list-item-content v-else>
            <v-list-item-title v-text="item.title" />
            <v-list-item-subtitle v-html="item.description" />
          </v-list-item-content>
          <v-list-item-action>
            <v-flex v-if="!item.editing">
              <v-btn icon @click="activateStatus(i)">
                <font-awesome-icon icon="edit" color="grey" />
              </v-btn>
              <v-btn icon @click="deleteStatus(i)">
                <font-awesome-icon icon="trash-alt" color="grey" />
              </v-btn>
            </v-flex>
            <v-btn v-else fab color="success" @click="deactivateStatus(i)">
              <font-awesome-icon icon="check" />
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </draggable>
    </v-list>
  </div>
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
      drag: false,
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      },
      status: {},
      statuses: [
        {
          label: "Custom",
          statuses: [
            { title: "New", color: "#9E9E9E", description: "The initial ", editing: false },
            { title: "In Progress", color: "#03A9F4", description: "Hello, this is a description", editing: false },
            { title: "Resolved", color: "#4CAF50", description: "Hello, this is a description", editing: false },
          ]
        },
        {
          label: "Agile",
          statuses: [
            { title: "Open", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "In Progress", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "Resolved", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "Closed", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "Ignored", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "Duplicate", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "Reopened", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "Blocked", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "In Evaluation", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "No Reproducible", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "Enhancement", color: "#000", description: "Hello, this is a description", editing: false },
            { title: "Rejected", color: "#000", description: "Hello, this is a description", editing: false }
          ]
        },
        {
          label: "Kanban",
          statuses: [
            
          ]
        }
      ]
    };
  },
  mounted() {
    this.setStatus(this.statuses[0]);
  },
  methods: {
    setStatus(s) {
      this.status = JSON.parse(JSON.stringify(s));
      this.$emit("updated", this.status);
    },
    resetStatus() {
      this.setStatus(this.statuses.find(s => s.label == this.status.label));
    },
    activateStatus(idx) {
      this.deactivateAllStatuses();
      this.status.statuses[idx].editing = true;
    },
    deactivateStatus(idx) {
      this.status.statuses[idx].editing = false;
    },
    deactivateAllStatuses() {
      this.status.statuses.map(s => (s.editing = false));
    },
    addStatus() {
      this.deactivateAllStatuses();
      this.status.statuses.unshift({
        title: "",
        editing: true,
        description: "",
        color: "#9E9E9E"
      });
      this.$emit("updated", this.status);
    },
    deleteStatus(idx) {
      this.status.statuses.splice(idx, 1);
      this.$emit("updated", this.status);
    },
    changeColor(color, idx) {
      this.status.statuses[idx].color = color;
      this.$emit("updated", this.status);
    }
  }
}
</script>

<style lang="sass" scoped>
.v-list-item__content
  .v-input
    padding: 0px
    margin: 0px
    .v-input__slot
      margin: 0px
.ghost
  opacity: 0.2
  background: #c8ebfb
  .v-list-item__action, .v-list-item__content, .v-list-item__avatar
    opacity: 0
</style>