<template>
  <div class="editor">
    <editor-menu-bar :editor="editor">
      <div
        class="menubar is-hidden"
        :class="{ 'is-focused': focused }"
        slot-scope="{ commands, isActive, focused }"
      >
        <base-button
          :type="isActive.bullet_list() ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.bullet_list"
        >
          <font-awesome-icon icon="list-ul" />
        </base-button>

        <base-button
          :type="isActive.ordered_list() ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.ordered_list"
        >
          <font-awesome-icon icon="list-ol" />
        </base-button>

        <base-button
          :type="isActive.bold() ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.bold"
        >
          <font-awesome-icon icon="bold" />
        </base-button>

        <base-button
          :type="isActive.italic() ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.italic"
        >
          <font-awesome-icon icon="italic" />
        </base-button>

        <base-button
          :type="isActive.strike() ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.strike"
        >
          <font-awesome-icon icon="strikethrough" />
        </base-button>

        <base-button
          :type="isActive.underline() ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.underline"
        >
          <font-awesome-icon icon="underline" />
        </base-button>

        <base-button
          :type="isActive.heading({ level: 1 }) ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </base-button>

        <base-button
          :type="isActive.heading({ level: 2 }) ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </base-button>

        <base-button
          :type="isActive.heading({ level: 3 }) ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </base-button>

        <base-button
          :type="isActive.code_block() ? 'default' : 'secondary'"
          class="menubar__button btn-sm"
          @click="commands.code_block"
        >
          <font-awesome-icon icon="code" />
        </base-button>
      </div>
    </editor-menu-bar>

    <editor-content
      class="editor__content form-control form-control-alternative"
      :editor="editor"
    >
    </editor-content>
  </div>
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
  History
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
        new History()
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
.menubar {
  position: absolute;
  top: -40px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}
.menubar.is-focused {
  visibility: visible;
  opacity: 1;
}
.editor__content /deep/ .ProseMirror {
  min-height: 500px;
}
.editor__content /deep/ .ProseMirror:focus {
  outline: none;
}
.form-control {
  height: auto;
}
</style>
