<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style='background-color:#0087BE;'>
      <b-row>
        <div class="row">
          <div class="col">
            <v-icon class='ihome' name="home"></v-icon>
          </div>
          <div class="col dcpress">
            <h2>DcPres</h2>
          </div>
        </div>
          <div class="col">
            <v-icon class='ihome' name='paperclip'></v-icon>
          </div>
          <div class="col dcpress">
            <h2>Reader</h2>
          </div>
      </b-row>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-col>
          <v-icon class='iplus' name='plus-square'></v-icon>
        </b-col>
        <b-col>
          <h3>User</h3>
        </b-col>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped>
.ihome{
  width: 35px;
  margin-left: 10px;
}
#Home{
  margin-left: 5px
}
.iplus{
  width: 35px;
}
.dcpress{
  margin-left: -20px
}
</style>