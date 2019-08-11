<template>
  <v-layout justify-center>
    <v-dialog
      persistent
      v-model="open"
      width="800"
      scrollable
      @keydown.esc="$emit('closeDialog')"
    >
      <v-card>
        <v-btn
          color="grey"
          fab
          absolute
          right
          text
          @click="$emit('closeDialog')"
        >
          <font-awesome-icon icon="times" />
        </v-btn>
        <v-card-text style="height: 500px;">
          <v-stepper v-model="step">
            <v-stepper-header>
              <template v-for="(s, idx) in steps">
                <v-stepper-step
                  :complete="step > idx + 1"
                  :step="idx + 1"
                  :key="s"
                >
                  {{ s }}
                </v-stepper-step>

                <v-divider :key="idx" v-if="idx + 1 < steps.length"></v-divider>
              </template>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content
                v-for="(s, idx) in steps"
                :key="idx"
                :step="idx + 1"
              >
                <slot :name="s.replace(' ', '')" />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
        <v-card-actions class="grey lighten-3">
          <v-layout justify-space-between class="px-3">
            <span>
              <v-btn v-if="step > 1" text @click="previousStep">Previous</v-btn>
            </span>
            <v-btn
              v-if="step < steps.length"
              color="primary"
              @click="nextStep"
              :disabled="!stepValid"
            >
              Next
            </v-btn>
            <v-btn
              color="primary"
              @click="submit"
              :disabled="!stepValid"
              v-else
            >
              Create
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true
    },
    steps: {
      type: Array,
      default: () => []
    },
    stepValid: {
      type: [Boolean, Number],
      default: false
    }
  },
  name: "Screen",
  data() {
    return {
      step: 1
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    nextStep() {
      this.step++;
      this.$emit("stepUpdated", this.step);
    },
    previousStep() {
      this.step--;
      this.$emit("stepUpdated", this.step);
    },
    submit() {
      this.$emit("submit");
    }
  }
}
</script>

<style lang="sass">
.v-stepper
  box-shadow: none
  .v-stepper__header
    box-shadow: none
  .v-stepper__content
    padding: 0px
    .v-stepper__wrapper
      padding: 20px 24px
</style>