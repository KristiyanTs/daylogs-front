<template>
  <v-row v-if="editing">
    <v-col>
      <vue-editor v-model="comment.content" :editor-toolbar="customToolbar" />
      <v-btn color="primary" class="mt-2" @click="saveComment">
        Submit
      </v-btn>
      <v-btn color="grey" class="mt-2" v-if="comment.id == ''" text @click="remove">
        discard
      </v-btn>
      <v-btn color="grey" class="mt-2" v-else text @click="cancel">
        cancel
      </v-btn>
    </v-col>
  </v-row>
  <v-row v-else class="px-2 py-2">
    <v-avatar size="25" class="mr-2">
      <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="avatar">
    </v-avatar>
    {{ comment.user.name }}
    <v-spacer />
    <v-btn text @click="reply" x-small color="grey">
      Reply
    </v-btn>
    <v-btn text @click="edit" x-small color="grey" v-if="current_user.id == comment.user.id">
      Edit
    </v-btn>
    <v-btn text @click="remove" x-small color="grey" v-if="current_user.id == comment.user.id">
      Delete
    </v-btn>
    <v-card v-html="comment.content" :color="current_user.id == comment.user.id ? 'blue-grey lighten-5' : 'grey lighten-4'" class="preview px-2 py-2 comment my-2" elevation="0" tile></v-card>
    <v-btn v-if="comment.has_replies && !show_replies" @click="toggleReplies" text x-small color="grey">
      Show replies
    </v-btn>
    <v-btn v-if="comment.has_replies && show_replies" @click="toggleReplies" text x-small color="grey">
      Hide replies
    </v-btn>
    <v-card v-if="show_replies" tile color="grey lighten-5" elevation="0" class="pl-5 replies">
      <Reply v-for="reply in replies.filter(r => r.ancestry == comment_id)" :key="reply.id" :reply_id="reply.id" />
    </v-card>
  </v-row>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_COMMENT, UPDATE_COMMENT, DESTROY_COMMENT, CREATE_ALERT, FETCH_REPLIES } from "@/store/actions.type";
import { REMOVE_COMMENT, SET_COMMENT, ADD_COMMENT } from "@/store/mutations.type";
import Reply from "./Reply";

export default {
  components: {
    VueEditor,
    Quill,
    Reply
  },
  props: {
    comment_id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      comment: {user: {}},
      editing: false,
      show_replies: false,
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }],
        ["link", "image"],
        ["clean"]
      ]
    };
  },
  mounted() {
    let idx = this.comments.findIndex(c => c.id == this.comment_id);
    if(idx != -1) {
      this.comment = { ...this.comments[idx] };

      if(this.comment.id == "") {
        this.editing = true;
      }
    }
  },
  methods: {
    saveComment() {
      this.editing = false;
      if(this.comment.id != "") {
        store.dispatch(UPDATE_COMMENT, this.comment);
      } else {
        store.dispatch(CREATE_COMMENT, this.comment);
      }
    },
    edit() {
      this.editing = true;
    },
    remove() {
      if(this.comment.id == "") {
        store.commit(REMOVE_COMMENT, "");
      } else {
        store.dispatch(DESTROY_COMMENT, this.comment);
      }
    },
    cancel() {
      let idx = this.comments.findIndex(c => c.id == this.comment_id);
      this.comment = { ...this.comments[idx] };
      this.editing = false;
    },
    reply() {
      if(!this.show_replies) {
        this.toggleReplies();
      }
      store.commit(ADD_COMMENT, this.comment_id);
    },
    toggleReplies() {
      if(!this.show_replies) {
        store.dispatch(FETCH_REPLIES, this.comment)
      }
      this.show_replies = !this.show_replies;
    }
  },
  computed: {
    ...mapGetters(["current_user", "comments", "replies"])
  }
}
</script>

<style lang="sass">
.comment, .replies
  width: 100%
</style>