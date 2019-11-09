<template>
<div id='menuu'>
<div>
  <h5 class="left-menus">Streams</h5>
  <hr>
    <div id="sub-menu">
      <div v-for='(stream, i) in streams' :key='i'>
        <ul class="menu-need-hover" @click='responseSite(stream.click)'>
            <v-icon :name='stream.icon' class='iconn'></v-icon> &nbsp; {{ stream.name }}
        </ul>
      </div>
    </div>
</div>
<div>
  <h5 class="left-menus">Manage</h5>
  <hr>
    <div id="sub-menu">
      <div v-for='(manage, i1) in manages' :key='i1'>
        <ul class="menu-need-hover" @click='responseSite(manage.clickM)'>
          <v-icon :name='manage.iconM' class='iconn'></v-icon> &nbsp; {{ manage.nameM }}
        </ul>
      </div>
        <ul class="menu-need-hover" v-b-toggle.collapse-a.collapse-b>
            <v-icon class='ipor' name='award'></v-icon> &nbsp; <a id='portFolio'>Portofolio</a>
        </ul>
        <div>
        <div id="colaps" v-for='(portfol, i2) in collaps' :key='i2'>
          <b-collapse id="collapse-a" class="mt-2">
            <a :href='portfol.link' target="_"><b-card class='portIn'>{{ portfol.nameC }}</b-card></a>
          </b-collapse>
        </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      streams: [
        { icon: 'more-horizontal', name: 'Public Site', click: 'public' },
        { icon: 'check-circle', name: 'Followed Site', click: 'followed' },
        { icon: 'users', name: 'Find Friends', click: 'globalUser' },
        { icon: 'message-circle', name: 'Chat', click: 'chatRoom' }
      ],
      manages: [
        { iconM: 'minimize', nameM: 'Site Pages', clickM: 'mySite' },
        { iconM: 'settings', nameM: 'Profile', clickM: 'profile' },
      ],
      collaps: [
        { link: 'http://started.dreamcarofficial.com', nameC: 'E-Commerce' },
        { link: 'http://todo.dreamcarofficial.com', nameC: 'Fancy-Todo' },
        { link: 'http://dcoverflow.dreamcarofficial.com.s3-website-ap-southeast-1.amazonaws.com/', nameC: 'Dc-OverFlow' },
        { link: 'https://kamvan-d66ed.firebaseapp.com/', nameC: 'Dc-Kamban' }
      ]
    }
  },
  methods: {
    responseSite (name) {
      this.$emit('response-site', name)
    }
  }
}
</script>

<style>
.iconn{
  width: 20px
}
</style>