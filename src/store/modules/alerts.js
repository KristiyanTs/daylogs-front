import {
  CREATE_ALERT,
  DESTROY_ALERT
} from "../actions.type";

import {
  ADD_ALERT,
  REMOVE_ALERT
} from "../mutations.type";

const state = {
  alerts: []
}

const getters = {
  alerts(state) {
    return state.alerts
  }
}

const actions = {
  [CREATE_ALERT](context, [message, status]) {
    context.commit(ADD_ALERT, [message, status]);
    setTimeout(
      () => context.commit(REMOVE_ALERT, message),
      700 + message.length * 75
    );
  },
  [DESTROY_ALERT](context, message) {
    context.commit(REMOVE_ALERT, message);
  }
}

const mutations = {
  [ADD_ALERT](state, alert) {
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