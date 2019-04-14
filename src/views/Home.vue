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
          <card
            id="date"
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 shadow"
          >
            <span class="icon icon-shape btn" round @click="shiftDate(-5)">
              <font-awesome-icon
                icon="angle-double-left"
                class="text-primary"
              />
            </span>
            <span class="icon icon-shape shadow btn" round @click="shiftDate(-1)">
              <font-awesome-icon
                icon="chevron-left"
                class="text-primary"
                size="2x"
              />
            </span>
            <span class="date align-bottom">{{ get_date }}</span>
            <span class="icon icon-shape shadow btn" round @click="shiftDate(1)">
              <font-awesome-icon
                icon="chevron-right"
                class="text-primary"
                size="2x"
              />
            </span>
            <span class="icon icon-shape btn" round @click="shiftDate(5)">
              <font-awesome-icon
                icon="angle-double-right"
                class="text-primary"
              />
            </span>
          </card>
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 shadow mt-2"
          >
          </card>
        </div>
        <div class="col-lg-7 col-xs-12">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 shadow editor"
          >
            <editor />
          </card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Editor from "./components/Editor";
import moment from "moment";

export default {
  name: "home",
  components: {
    Editor
  },
  data() {
    return {
      date: new Date()
    };
  },
  methods: {
    shiftDate(shift) {
      this.date = moment(this.date).add(shift, "days");
    }
  },
  computed: {
    get_date() {
      return moment(this.date).format("MMM Do YY");
    }
  }
};
</script>

<style scoped lang="sass">
#date
  text-align: center

  .icon-shape
    padding: 5px

  .date
    font-size: 2em
    width:200px 
    max-width:200px 
    display: inline-block

.container.w-100
  max-width: none

.mt--450
  margin-top: -450px
</style>
