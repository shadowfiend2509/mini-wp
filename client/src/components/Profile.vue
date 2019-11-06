<template>
  <div id='cusCon' class="border">
    <div class="row">
      <div class="col-3 custCol border">
          <div id="sub-menu">
            <ul class="menu-need-hover" @click='changeLocal("profile")'>
              <v-icon name='minimize' class='iconn'></v-icon> &nbsp;Profile
            </ul>
            <ul class="menu-need-hover" @click='changeLocal("setting")'>
                <v-icon class='iconn' name='settings'></v-icon> &nbsp; Setting
            </ul>
            <ul class="menu-need-hover" @click='changeLocal("manage")'>
                <v-icon class='iconn' name='monitor'></v-icon> &nbsp; Monitoring
            </ul>
            <ul class="menu-need-hover" @click='changeLocal("request")'>
                <v-icon class='iconn' name='git-pull-request'></v-icon> &nbsp; Request
            </ul>
          </div>
      </div>
      <div class="col-9 custCol border">

        <!-- Profile (local) -->
        
        <div v-if='pageLocal == "profile"' class='container'>
          <PageProfile :get-profile='user'/>
        </div>

        <!-- Setting Profile -->

        <div v-else-if='pageLocal == "setting"'>
          Setting
        </div>

        <!-- Manage Profile --> 

        <div v-else-if='pageLocal == "manage"'>
          <ManageProfile :get-user='getUser'/>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import PageProfile from './LocalProfile/PageProfile'
import ManageProfile from './LocalProfile/ManageProfile'

export default {
  data () {
    return {
      pageLocal: null,
      user: null
    }
  },
  components: {
    PageProfile,
    ManageProfile
  },
  props: ['getUser'],
  methods: {
    changeLocal (name) {
      this.pageLocal = name
    }
  },
  created () {
    this.user = this.getUser
    this.pageLocal = 'profile'
  }
}
</script>

<style>
#cusCon {
  padding: 20px;
  width: 110vh;
  height: 80vh;
}
</style>