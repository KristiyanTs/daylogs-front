<template>
  <section class="timeline">
    <h2 class="text-center">Учебен план за 2019/2020</h2>
    <v-container>
      <v-row align-content="center">
        <v-col lg="6" md="8" sm="10" xs="12" offset-lg="3" offset-md="2" offset-sm="1">
          <v-timeline>
            <v-timeline-item
              v-for="(range, i) in material"
              :key="i"
              :color="range.color"
              small
            >
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold ${range.color}--text`"
                  v-text="range.year"
                ></span>
              </template>
              <div class="py-4">
                <h2 :class="`headline font-weight-light mb-4 ${range.color}--text`">{{ range.title }}</h2>
                <div>
                  {{range.description}}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      material: [
        {
          color: 'cyan',
          year: '28.10 - 24.11',
          title: 'Ирационални изрази',
          description: ''
        },
        {
          color: 'green',
          year: '25.11 - 22.12',
          title: 'Ирационални уравнения',
          description: ''
        },
        {
          color: 'pink',
          year: '06.01 - 05.02',
          title: 'Прогресии. Статистика и обработка на данни',
          description: ''
        },
        {
          color: 'amber',
          year: '10.02 - 08.03',
          title: 'Увод в тригонометрията',
          description: ''
        },
        {
          color: 'cyan',
          year: '09.03 - 05.04',
          title: ' Решаване на триъгълник',
          description: ''
        },
        {
          color: 'green',
          year: '06.04 - 10.05',
          title: 'Елементи от стереометрията',
          description: ''
        },
        {
          color: 'pink',
          year: '11.05 - 07.06',
          title: 'Преговор и упражнение',
          description: ''
        }
      ],
    }
  }
};
</script>

<style scoped lang="sass">
h2
  margin-bottom: 50px
.timeline
  margin-bottom: 200px
</style>