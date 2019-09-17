import { NodeHelpers, TaskHelpers } from '@/common/helpers.js';

export const NodeTypeCheck = {
  methods: {
    isNode: NodeHelpers.isNode,
    isTask: NodeHelpers.isTask,
    isProject: NodeHelpers.isProject,
    areParentAndChild: NodeHelpers.areParentAndChild
  }
};

export const TaskCommonFinders = {
  computed: {
    category: TaskHelpers.category,
    status: TaskHelpers.status,
    assignees: TaskHelpers.assignees
  }
};