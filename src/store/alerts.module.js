import {
  ADD_ALERT,
  CLOSE_ALERT
} from "./actions.type";

import {
  PUSH_ALERT,
  REMOVE_ALERT
} from "./mutations.type";

const state = {
  alerts: []
}

const getters = {
  alerts(state) {
    return state.alerts
  }
}

const actions = {
  [ADD_ALERT](context, [message, status]) {
    context.commit(PUSH_ALERT, [message, status]);
    setTimeout(
      () => context.commit(REMOVE_ALERT, message),
      700 + message.length * 75
    );
  },
  [CLOSE_ALERT](context, message) {
    context.commit(REMOVE_ALERT, message);
  }
}

const mutations = {
  [PUSH_ALERT](state, alert) {
    let alerts = state.alerts;
    alerts.push(alert);
    state.alerts = alerts;
  },
  [REMOVE_ALERT](state, message) {
    state.alerts = state.alerts.filter(([msg, _status]) => msg != message);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}