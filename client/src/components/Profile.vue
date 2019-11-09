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


        <!-- Manage Profile --> 

        <div v-else-if='pageLocal == "manage"'>
          <ManageProfile :get-user='getUser'/>
        </div>

        <!-- Request Profile -->

        <div v-else-if='pageLocal == "request"' class="request">
          <RequestProfile
            :get-user='getUser'
            @change-data='okechange'
            />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import PageProfile from './LocalProfile/PageProfile'
import ManageProfile from './LocalProfile/ManageProfile'
import RequestProfile from './LocalProfile/RequestProfile'

export default {
  data () {
    return {
      profiles: [
        { icon: 'minimize', click: 'profile', name: 'Profile' },
        { icon: 'monitor', click: 'manage', name: 'Monitoring' },
        { icon: 'git-pull-request', click: 'request', name: 'Request' }
      ],
      pageLocal: null,
      user: null
    }
  },
  components: {
    PageProfile,
    ManageProfile,
    RequestProfile
  },
  props: ['getUser', 'sibling'],
  methods: {
    changeLocal (name) {
      this.pageLocal = name
    },
    okechange (data) {
      this.getUser = data
    }
  },
  created () {
    if(this.sibling !== null){
      this.pageLocal = this.sibling
      this.user = this.getUser;
      } else {
      this.user = this.getUser
      this.pageLocal = 'profile'
    }
  },
  watch: {
    getUser: {
      handler(val) {
        if(val) {
          this.getUser = val;
          this.user = val
        }
      }
    }
  }
}
</script>

<style>
#cusCon {
  padding: 20px;
  width: 110vh;
  height: 82vh;
}
.custCol {
  height: 82vh;
  overflow: auto;
}
</style>