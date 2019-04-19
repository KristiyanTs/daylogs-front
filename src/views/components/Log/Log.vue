<template>
  <card
    shadow
    header-classes="pb-5"
    body-classes="px-lg-0 py-lg-0"
    class="shadow editor"
  >
    <Editor
      @contentChange="contentChange"
      @onFocus="onFocus"
      :content="log.content"
    />
    <base-button
      round
      @click="saveDayLog"
      :type="saved ? 'success' : 'warning'"
      class="icon icon-shape p-0 save-log shadow"
    >
      <font-awesome-icon v-if="loading && !saved" icon="spinner" spin />
      <font-awesome-icon v-else icon="save" />
    </base-button>
  </card>
</template>

<script>
import Editor from "./Editor";

export default {
  components: {
    Editor
  },
  props: {
    day: {
      type: Date,
      default: new Date(),
      description: "Log's date"
    }
  },
  data() {
    return {
      log: { content: "" },
      saved: true,
      save_timer: null,
      loading: true
    };
  },
  methods: {
    getDayLog() {
      this.loading = true;
      this.axios
        .get("/api/logs/1", {
          headers: { Authorization: window.$cookies.get("jwt") },
          params: { day: this.day }
        })
        .then(response => {
          this.log = response.data;
          if (this.log.content == null) this.log.content = "Start your log...";
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    saveDayLog() {
      if (this.saved) return;

      this.loading = true;
      this.axios
        .put(`/api/logs/${this.log.id}`, { log: this.log })
        .then(() => {
          this.saved = true;
        })
        .catch(() => {
          this.$store.commit("ADD_ALERT", [
            "Unable to save day's log.",
            "danger"
          ]);
        })
        .finally(() => setTimeout(() => (this.loading = false), 500));
    },
    contentChange(newVal) {
      this.saved = false;
      this.log.content = newVal;
      clearTimeout(this.save_timer);
      this.save_timer = setTimeout(() => {
        this.saveDayLog();
      }, 5000);
    },
    onFocus() {
      if (this.log.content == "Start your log...") this.log.content = "";
    }
  },
  watch: {
    day: {
      immediate: true,
      handler() {
        this.getDayLog();
      }
    }
  }
}
</script>

<style lang="scss">
.editor .save-log {
  position: absolute;
  bottom: -24px;
  right: 10px;
}
</style>
