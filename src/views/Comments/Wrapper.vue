<template>
  <v-container class="px-0 py-0">
    <v-row>
      <v-col>
        <h5>Comments ({{comments.filter(c => c.id != "").length}})</h5>
      </v-col>
    </v-row>
    <CommentRow v-for="comment in comments" :key="comment.id" :comment_id="comment.id" />
    <v-btn small color="grey" class="mb-5" text @click="addComment" v-if="!isCommenting">
      <font-awesome-icon
        icon="comment"
        class="mr-2"
      />
      Comment
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { ADD_COMMENT } from "@/store/mutations.type";
import CommentRow from "./Row";

export default {
  components: {
    CommentRow
  },
  data() {
    return {};
  },
  methods: {
    addComment() {
      store.commit(ADD_COMMENT, null, this.inspected_node.id);
    }
  },
  computed: {
    ...mapGetters(["inspected_node", "comments"]),
    isCommenting() {
      return this.comments.findIndex(c => c.id == "") != -1;
    }
  }
}
</script>