<template>
  <div class="body">
    <section class="initial">
      <div class="initial">
        <div class="attention">
          <h1 class="text-uppercase">Plan it, keep it</h1>
          <h4>
            DayLogs is a personal journal and task manager. It makes organizing your day and logging the memories and ideas you want to keep easier.
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