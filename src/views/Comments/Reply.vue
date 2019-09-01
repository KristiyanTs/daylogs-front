<template>
  <v-row v-if="editing">
    <v-col>
      <vue-editor v-model="reply.content" :editor-toolbar="customToolbar" />
      <v-btn color="primary" class="mt-2" @click="save">
        Submit
      </v-btn>
      <v-btn color="grey" class="mt-2" v-if="reply.id == ''" text @click="remove">
        discard
      </v-btn>
      <v-btn color="grey" class="mt-2" v-else text @click="cancel">
        cancel
      </v-btn>
    </v-col>
  </v-row>
  <v-row v-else class="px-2 py-1">
    <v-avatar size="25" class="mr-2">
      <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="avatar">
    </v-avatar>
    {{ reply.user.name }}
    <v-spacer />
    <v-btn text @click="edit" x-small color="grey" v-if="current_user.id == reply.user.id">
      Edit
    </v-btn>
    <v-btn text @click="remove" x-small color="grey" v-if="current_user.id == reply.user.id">
      Delete
    </v-btn>
    <v-card v-html="reply.content" :color="current_user.id == reply.user.id ? 'blue-grey lighten-5' : 'grey lighten-4'" class="preview px-2 py-2 comment my-2" elevation="0" tile></v-card>
  </v-row>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_COMMENT, UPDATE_COMMENT, DESTROY_COMMENT, CREATE_ALERT } from "@/store/actions.type";
import { REMOVE_COMMENT, SET_COMMENT, ADD_COMMENT } from "@/store/mutations.type";

export default {
  components: {
    VueEditor,
    Quill
  },
  props: {
    reply_id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      reply: {user: {}},
      editing: false,
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
    let idx = this.replies.findIndex(r => r.id == this.reply_id);
    if(idx != -1) {
      this.reply = { ...this.replies[idx] };

      if(this.reply.id == "") {
        this.editing = true;
      }
    }
  },
  methods: {
    save() {
      this.editing = false;
      if(this.reply.id != "") {
        store.dispatch(UPDATE_COMMENT, this.reply);
      } else {
        store.dispatch(CREATE_COMMENT, this.reply);
      }
    },
    remove() {
      if(this.reply.id == "") {
        store.commit(REMOVE_COMMENT, "");
      } else {
        store.dispatch(DESTROY_COMMENT, this.reply);
      }
    },
    cancel() {
      let idx = this.replies.findIndex(r => r.id == this.reply_id);
      this.reply = { ...this.replies[idx] };
      this.editing = false;
    },
    edit() {
      this.editing = true;
    }
  },
  computed: {
    ...mapGetters(["current_user", "comments", "replies"])
  }
}
</script>

<style lang="sass">
.comment
  width: 100%
</style>