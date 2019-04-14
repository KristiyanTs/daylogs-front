<template>
  <div>
    <div class="position-relative">
      <section class="section-shaped my-0">
        <div class="shape shape-style-3 shape-default shape-skew">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container shape-container d-flex w-100">
        </div>
      </section>
      <section class="section section-lg pt-lg-0 mt--400">
        <div class="container row w-100">
          <div class="col-lg-5">
            <div id="date">
              <font-awesome-icon
                icon="angle-double-left"
                class="text-primary mr-1"
              />
              <span
                class="icon icon-shape bg-gradient-secondary text-primary"
                round
              >
                <font-awesome-icon icon="chevron-left" class="text-primary" />
              </span>
              <span class="date mx-3">{{ get_date }}</span>
              <span
                class="icon icon-shape bg-gradient-secondary shadow text-primary"
                round
              >
                <font-awesome-icon icon="chevron-right" class="text-primary" />
              </span>
              <font-awesome-icon
                icon="angle-double-right"
                class="text-primary ml-1"
              />
            </div>
            <card
              type="secondary"
              shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0 shadow mt-5"
            >
            </card>
          </div>
          <div class="col-lg-7">
            <card
              type="secondary"
              shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0 shadow"
            >
              <editor />
            </card>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Editor from "./components/Editor";

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
  computed: {
    get_date() {
      let options = {
        day: "numeric",
        month: "short",
        year: "numeric"
      };

      return this.date.toLocaleDateString("en-ZA", options);
    }
  }
};
</script>

<style scoped lang="sass">
#date
  font-size: 2em
  text-align: center

  .icon-shape
    padding: 5px

  .date
    font-size: 1.5em
    color: white


.container.w-100
  max-width: none

.mt--400
  margin-top: -400px
</style>
