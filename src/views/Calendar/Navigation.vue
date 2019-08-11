<template>
  <v-sheet height="64">
    <v-toolbar flat color="white">
      <v-btn outlined class="mr-3" @click="setToday">
        Today
      </v-btn>
      <v-btn fab text small @click="prev">
        <v-icon small>arrow_back_ios</v-icon>
      </v-btn>
      <v-btn fab text small @click="next">
        <v-icon small>arrow_forward_ios</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom right v-if="type == 'day'">
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on" class="mr-2">
            <span>{{ view }}</span>
            <v-icon right>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="view = 'events'">
            <v-list-item-title>Events</v-list-item-title>
          </v-list-item>
          <v-list-item @click="view = 'tasks'">
            <v-list-item-title>Tasks</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom right>
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on">
            <span>{{ typeToLabel[type] }}</span>
            <v-icon right>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'day'">
            <v-list-item-title>Day</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'week'">
            <v-list-item-title>Week</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'month'">
            <v-list-item-title>Month</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = '4day'">
            <v-list-item-title>4 days</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-sheet>
</template>

<script>
export default {
  props: {
    view: {
      type: String,
      default: "events"
    },
    today: {
      type: Date,
      default: new Date()
    },
    focus: {
      type: Date,
      default: new Date()
    },
    type: {
      type: String,
      default: "week"
    },
    start: {
      type: String,
      default: ""
    },
    end: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    }
  }),
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    }
  }
};
</script>
