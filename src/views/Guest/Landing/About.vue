<template>
  <section class="about">
    <h2 class="text-center">За нас</h2>
    <v-container>
      <v-row>
        <v-col md="4" sm="5" xs="12" offset-md="2" offset-sm="1">
          <v-card
            :raised="active1"
            @mouseover="active1 = true"
            @mouseleave="active1 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">Теодор Илиев</v-list-item-title>
                <v-list-item-subtitle>Съосновател / Учител</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img
              src="@/assets/images/Teodor.png"
              height="300"
            ></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Следва компютърни науки в СУ. Завършил паралелката с най-висок бал в страната - СМГ с немски език
              </div>
              <br>
              <v-divider />
              <br>
              Занимавам се с преподаване на математика на ученици вече две години. Това, че съм завършил толкова скоро 
              ми дава възможността да гледам на проблемите по по-различен начин - близък до мисленето на учениците. 
              Включвам в тази инициатива пенеже ще ми даде възможност да помогна на възможно най-много хора.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="4" sm="5" xs="12">
          <v-card
            :raised="active2"
            @mouseover="active2 = true"
            @mouseleave="active2 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">Кристиян Цветанов</v-list-item-title>
                <v-list-item-subtitle>Съосновател</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img
              src="@/assets/images/Kris.jpg"
              height="300"
            ></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Завършил Компютърни науки и Мениждмънт в <i>Университетът в Единбург (The University of Edinburgh)</i>
                с отличие и медал за най-висок резултат в класа
                Завършил Софийска Математическа гимназия (5-12 клас)
              </div>
              <br>
              <v-divider />
              <br>
              Занимавам се с програмиране професионално от 3 години. Това ми позволи да работя по достатъчно софтуерни проекти,
              които ни помагат да решим ежедневни проблеми по-ефикасно и по-качествено. Вярвам, че в това отношение, 
              образованието е една от сферите, които заслужава, но все още не е получила достатъчно внимание.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      active1: false,
      active2: false
    }
  }
};
</script>

<style scoped lang="sass">
.about
  margin-bottom: 200px
</style>