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
    if(!node1 || !node2) return false;
    if(Object.keys(node1).length == 0 || Object.keys(node2).length == 0) return false;
    return node1.ancestry == node2.id.toString() || node2.ancestry == node1.id.toString();
  }
}