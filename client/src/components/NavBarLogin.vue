<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style='background-color:#0087BE;'>
      <b-row>
        <div class="row">
          <div class="col">
          </div>
          <div class="col dcpress">
            <h2 id="idText">DcWordPress</h2>
          </div>
        </div>
      </b-row>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-col>
          <button type="button" class="btn btn-outline-light btn-lg site-btns btnWrite" @click='sendPage("makeArticle")'><v-icon class='ihome' name='plus-square'></v-icon> &nbsp; Write</button>
        </b-col>
        <b-col>
          <div class='angkanotif'>{{ notif }}</div>
          <button type="button" class="btn btn-outline-light btn-lg site-btns" @click='sendPageToSibling("profile")'><v-icon class='ihome' name='bell'></v-icon></button>
        </b-col>
        <b-col>
          <button type="button" class="btn btn-outline-light btn-lg site-btns" @click='signout("home")'><v-icon class='ihome' name='power'></v-icon></button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  props: ['notif'],
  methods: {
    signout (name) {
      localStorage.removeItem('token');
      this.$emit('change-page', name)
      swal.fire({
        position: 'top-end',
        title: 'see youu',
        showConfirmButton: false,
        timer: 1500
      })
    },
    sendPage (name) {
      this.$emit('change-page', name)
    },
    goToDash () {
      this.$emit('go-dash', "mySite")
    },
    sendPageToSibling (name) {
      this.$emit('go-sibling', { name, target: 'Request'})
    }
  }
}
</script>

<style scoped>
.btnWrite {
  width:160px
}
.ml-auto{
  justify-content: center;
  align-items: center;
}
.ihome{
  width: 30px;
}
.iplus{
  width: 50px;
  margin-right: -20px
}
.dcpress{
  margin-left: -20px
}
.angkanotif{
  text-align: center;
  background-color: red;
  border-radius: 50px;
  width: 25px;
  margin: -5px 50px;
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  color: indigo
}

#idText{
  font-family: 'Yeon Sung', cursive;
  font-size: 50px;
}
</style>