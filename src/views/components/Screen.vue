<template>
  <div class="col-xs-12 row max-height">
    <div class="col-xs-12 col-md-5 col-left">
      <slot name="left"></slot>
    </div>
    <div class="col-xs-12 col-md-7 col-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Screen",
  data() {
    return {};
  }
}
</script>

<style scoped lang="sass">
.col-left
  max-height: 100vh
  -webkit-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75)
  -moz-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75)
  box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75)
  box-sizing: border-box
  display: flex
  flex-direction: column
  padding-bottom: 40px

.col-right
  padding: 0px
</style>