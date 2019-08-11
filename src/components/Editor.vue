<template>
  <v-layout wrap column style="height: 100%" :class="{ outlined: outlined }">
    <editor-menu-bar :editor="editor">
      <div
        class="menubar my-2 px-2"
        :class="{ 'is-focused': focused }"
        slot-scope="{ commands, isActive, focused }"
      >
        <v-btn
          :text="!isActive.bullet_list()"
          :color="isActive.bullet_list() ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.bullet_list"
          small
        >
          <font-awesome-icon icon="list-ul" />
        </v-btn>

        <v-btn
          :text="!isActive.ordered_list()"
          :color="isActive.ordered_list() ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.ordered_list"
          small
        >
          <font-awesome-icon icon="list-ol" />
        </v-btn>

        <v-btn
          :text="!isActive.bold()"
          :color="isActive.bold() ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.bold"
          small
        >
          <font-awesome-icon icon="bold" />
        </v-btn>

        <v-btn
          :text="!isActive.italic()"
          :color="isActive.italic() ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.italic"
          small
        >
          <font-awesome-icon icon="italic" />
        </v-btn>

        <v-btn
          :text="!isActive.strike()"
          :color="isActive.strike() ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.strike"
          small
        >
          <font-awesome-icon icon="strikethrough" />
        </v-btn>

        <v-btn
          :text="!isActive.underline()"
          :color="isActive.underline() ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.underline"
          small
        >
          <font-awesome-icon icon="underline" />
        </v-btn>

        <v-btn
          :text="!isActive.heading({ level: 1 })"
          :color="isActive.heading({ level: 1 }) ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.heading({ level: 1 })"
          small
        >
          H1
        </v-btn>

        <v-btn
          :text="!isActive.heading({ level: 2 })"
          :color="isActive.heading({ level: 2 }) ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.heading({ level: 2 })"
          small
        >
          H2
        </v-btn>

        <v-btn
          :text="!isActive.heading({ level: 3 })"
          :color="isActive.heading({ level: 3 }) ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.heading({ level: 3 })"
          small
        >
          H3
        </v-btn>

        <v-btn
          :text="!isActive.code_block()"
          :color="isActive.code_block() ? 'primary' : 'default'"
          class="menubar__button"
          @click="commands.code_block"
          small
        >
          <font-awesome-icon icon="code" />
        </v-btn>

        <v-btn
          :text="!isActive.image()"
          :color="isActive.image() ? 'primary' : 'default'"
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
          small
        >
          <font-awesome-icon :icon="['far', 'image']" />
        </v-btn>
      </div>
    </editor-menu-bar>

    <editor-content
      class="editor__content white"
      :editor="editor"
    ></editor-content>
  </v-layout>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from "tiptap-extensions";

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    content: {
      type: String,
      default: "",
      description: "Editor content"
    },
    outlined: {
      type: Boolean,
      default: false,
      description: "Should the editor have a border"
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
        new Image()
      ],
      content: this.content,
      onUpdate: ({ getHTML }) => {
        this.$emit("contentChange", getHTML());
      },
      onFocus: ({ getHTML }) => {
        this.$emit("onFocus", getHTML);
      }
    });
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    }
  },
  watch: {
    content(val) {
      if (val !== this.editor.getHTML()) {
        this.editor.setContent(val);
      }
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style scoped>
.outlined {
  border: 1px solid rgb(200, 200, 200);
}
.menubar {
  margin: 0px !important;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.menubar button {
  padding: 3px 10px;
}
.menubar .menubar__button {
  border-radius: 0px;
}
.editor {
  height: 100%;
}
.editor__content {
  height: calc(100% - 46px);
  padding: 15px;
}
.editor__content.small {
  border-top: 0px;
}
.editor__content /deep/ p {
  margin-bottom: 3px;
}
.editor__content /deep/ .ProseMirror {
  overflow: scroll;
}
.editor__content /deep/ .ProseMirror p,
.editor__content /deep/ .ProseMirror li,
.editor__content /deep/ .ProseMirror code {
  font-size: 1.1rem;
}
.editor__content.small /deep/ .ProseMirror {
  height: 170px;
  min-height: 170px;
  max-height: 170px;
  overflow: scroll;
}
.editor__content /deep/ .ProseMirror:focus {
  outline: none;
}
.editor__content /deep/ img {
  max-width: 100%;
  max-height: 350px;
}
</style>
