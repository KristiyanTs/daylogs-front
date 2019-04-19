<template>
  <div>
    <section class="section-shaped my-0">
      <div class="shape shape-style-3 shape-default shape-skew">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container shape-container d-flex w-100"></div>
    </section>
    <section class="section section-lg pt-lg-0 section-shaped mt--450">
      <div class="container row w-100">
        <div class="col-lg-5 col-xs-12">
          <LogDate :day="day" @dateChanged="changeDate" />
          <card
            shadow
            body-classes="px-lg-3 pt-lg-3 pb-lg-5"
            class="shadow mt-2 tasks-card"
          >
            <Tasks :day="day" />
          </card>
        </div>
        <div class="col-lg-7 col-xs-12">
          <log :day="day" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Log from "./components/Log/Log";
import Tasks from "./components/Tasks/Tasks";
import LogDate from "./components/Navigation/LogDate";

export default {
  name: "home",
  components: {
    Log,
    Tasks,
    LogDate
  },
  data() {
    return {
      day: new Date()
    };
  },
  methods: {
    changeDate(day) {
      this.day = day;
    }
  }
};
</script>

<style scoped lang="sass">
.container.w-100
  max-width: none

.mt--450
  margin-top: -450px

.row
  margin: 0px
</style>
