<template>
  <div class="editor">
    <editor-menu-bar :editor="editor">
      <div
        class="menubar p-2"
        :class="{ 'is-focused': focused }"
        slot-scope="{ commands, isActive, focused }"
      >
        <base-button
          :type="isActive.bullet_list() ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.bullet_list"
        >
          <font-awesome-icon icon="list-ul" />
        </base-button>

        <base-button
          :type="isActive.ordered_list() ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.ordered_list"
        >
          <font-awesome-icon icon="list-ol" />
        </base-button>

        <base-button
          :type="isActive.bold() ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.bold"
        >
          <font-awesome-icon icon="bold" />
        </base-button>

        <base-button
          :type="isActive.italic() ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.italic"
        >
          <font-awesome-icon icon="italic" />
        </base-button>

        <base-button
          :type="isActive.strike() ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.strike"
        >
          <font-awesome-icon icon="strikethrough" />
        </base-button>

        <base-button
          :type="isActive.underline() ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.underline"
        >
          <font-awesome-icon icon="underline" />
        </base-button>

        <base-button
          :type="isActive.heading({ level: 1 }) ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </base-button>

        <base-button
          :type="isActive.heading({ level: 2 }) ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </base-button>

        <base-button
          :type="isActive.heading({ level: 3 }) ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </base-button>

        <base-button
          :type="isActive.code_block() ? 'default' : 'link'"
          class="menubar__button"
          @click="commands.code_block"
        >
          <font-awesome-icon icon="code" />
        </base-button>

        <base-button
          :type="isActive.image() ? 'default' : 'link'"
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          <font-awesome-icon :icon="['far', 'image']" />
        </base-button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor"></editor-content>
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
      const src = prompt('Enter the url of your image here')
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
.menubar {
  background-color: #F9F8FF;
}
.menubar .menubar__button {
  border-radius: 0px;
}
.editor__content {
  padding: 15px;
}
.editor__content /deep/ p {
  margin-bottom: 3px;
}
.editor__content /deep/ .ProseMirror {
  min-height: 500px;
}
.editor__content /deep/ .ProseMirror:focus {
  outline: none;
}
.editor__content /deep/ img {
  max-width: 100%;
  max-height: 350px;
}
</style>
