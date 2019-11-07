<template>
  <div id='cusCon' class="border">
    <div class="row">
      <div class="col-3 custCol border">
          <div id="sub-menu" v-for='(profile, i) in profiles' :key='i'>
            <ul class="menu-need-hover" @click='changeLocal(profile.click)'>
              <v-icon :name='profile.icon' class='iconn'></v-icon> &nbsp; {{ profile.name }}
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
      profiles: [
        { icon: 'minimize', click: 'profile', name: 'Profile' },
        { icon: 'settings', click: 'setting', name: 'Setting' },
        { icon: 'monitor', click: 'manage', name: 'Monitoring' },
        { icon: 'git-pull-request', click: 'request', name: 'Request' }
      ],
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