<template>
  <div class="body">
    <section class="initial">
      <div class="initial">
        <div class="attention">
          <h1 class="text-uppercase">Plan it, keep it</h1>
          <h4>
            DayLogs is the perfect platform for privately logging your day and
            keeping it organized. We listen to your feedback and needs!
          </h4>
          <v-btn
            large
            round
            color="primary"
            class="call-to-action"
            to="/signup"
          >
            <span>Get Started - It's Free!</span>
          </v-btn>
        </div>
        <img src="@/assets/images/landing-mockup.png" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "landing",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped lang="sass">
.body
  padding-top: 70px

  section.initial
    min-height: calc(100vh - 70px)
    div.initial
      margin-left: 10%
      margin-top: 10%
      .attention
        display: inline-block
        width: 500px
        .call-to-action
          color: white
          margin-left: 0px
          margin-top: 30px
          font-weight: bold
      img
        display: inline-block
        width: calc(90vw - 500px)

section.features
</style>