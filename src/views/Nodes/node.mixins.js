export const NodeTypeCheck = {
  methods: {
    isNode(node) {
      return !this.isProject(node) && (node.category_id == "" || node.category_id == null);
    },
    isTask(node) {
      return !this.isProject(node) && !this.isNode(node);
    },
    isProject(node) {
      return node.ancestry == null || node.ancestry == "";
    }
  }
};