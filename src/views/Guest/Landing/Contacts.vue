<template>
  <section class="contacts" id="contacts">
    <h2 class="text-center">Свържете се</h2>
    <v-container>
      <v-row>
        <v-col md="4" sm="5" xs="12" offset-md="2" offset-sm="1">
          <table>
            <tr>
              <td><v-icon>mdi-phone</v-icon></td>
              <td>089 780 2497</td>
            </tr>
            <tr>
              <td><v-icon>mdi-email</v-icon></td>
              <td>bgmentor@abv.bg <br> bgmentor@gmail.com</td>
            </tr>
            <tr>
              <td><v-icon>mdi-city</v-icon></td>
              <td>София, ул. Св. Кирил и Методии 27</td>
            </tr>
          </table>
        </v-col>
        <v-col md="4" sm="5" xs="12">
          <v-card
            :raised="active"
            @mouseover="active = true"
            @mouseleave="active = false"
            shaped
            flat
            class="mx-auto"
          >
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe 
                  width="100%" 
                  height="500" 
                  id="gmap_canvas" 
                  src="https://maps.google.com/maps?q=%D1%81%D0%BE%D1%84%D0%B8%D1%8F%2C%20%D0%BA%D0%B8%D1%80%D0%B8%D0%BB%20%D0%B8%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B8%D0%B8%2027&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  frameborder="0" 
                  scrolling="no" 
                  marginheight="0" 
                  marginwidth="0">
                </iframe>
              </div>
            </div>
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
      active: false
    }
  }
};
</script>

<style scoped lang="sass">
h2
  margin-bottom: 50px
.contacts
  margin-bottom: 200px
.mapouter
  position:relative
  text-align:right
  height:500px
  width:600px
.gmap_canvas
  overflow: hidden
  background: none !important
  height:500px
  width:100%
table
  width: 100%
  padding-top: 50px
  td
    padding: 10px
</style>