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
    if(!node1 || !node2 || !node1.id || !node2.id) return false;
    if(Object.keys(node1).length == 0 || Object.keys(node2).length == 0) return false;
    return node1.ancestry == node2.id.toString() || node2.ancestry == node1.id.toString();
  }
}

export const TaskHelpers = {
  category() {
    if(this.categories) {
      return this.categories.find(c => c.id == this.item.category_id);
    } else {
      return { title: "", icon: "", color: "", icon_color: "" }
    }
  },
  status() {
    if(this.statuses) {
      return this.statuses.find(s => s.id == this.item.status_id);
    } else {
      return { title: "", color: "" }
    }
  },
  assignees() {
    if(this.inspected_node.hasOwnProperty("assignees") && this.inspected_node.assignees instanceof Array && this.members instanceof Array) {
      return this.members.filter(m => this.item.assignees.includes(m.id));
    } else {
      return [];
    }
  }
}