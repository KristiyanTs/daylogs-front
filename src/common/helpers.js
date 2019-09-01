export const NodeHelpers = {
  isProject(node) {
    return node.ancestry == null || node.ancestry == "";
  },
  isNode(node) {
    return !this.isProject(node) && (node.category_id == "" || node.category_id == null);
  },
  isTask(node) {
    return !this.isProject(node) && !this.isNode(node);
  },
  areParentAndChild(node1, node2) {
    return node1.ancestry == node2.id || node2.ancestry == node1.id;
  }
}