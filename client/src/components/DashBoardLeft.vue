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
      <div v-for='(manage, i) in manages' :key='i'>
        <ul class="menu-need-hover" @click='responseSite(manage.click)'>
          <v-icon :name='manage.icon' class='iconn'></v-icon> &nbsp; {{ manage.name }}
        </ul>
      </div>
        <ul class="menu-need-hover" v-b-toggle.collapse-a.collapse-b>
            <v-icon class='ipor' name='award'></v-icon> &nbsp; <a id='portFolio'>Portofolio</a>
        </ul>
        <div id="colaps" v-for='(portfol, i) in collaps' :key='i'>
          <b-collapse id="collapse-a" class="mt-2">
            <a :href='portfol.link' target="_"><b-card class='portIn'>{{ portfol.name }}</b-card></a>
          </b-collapse>
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
        { icon: 'check-circle', name: 'Followed Site', click: '' },
        { icon: 'users', name: 'Find Friends', click: 'searchUser' },
        { icon: 'message-circle', name: 'Chat', click: 'chatRoom' },
        { icon: 'check-circle', name: 'Followed Site', click: '' },
      ],
      manages: [
        { icon: 'minimize', name: 'Site Pages', click: 'mySite' },
        { icon: 'settings', name: 'Profile', click: 'profile' },
        { icon: '', name: 'Testimonials', click: 'mySite' }
      ],
      collaps: [
        { link: 'http://started.dreamcarofficial.com', name: 'E-Commerce' },
        { link: 'http://todo.dreamcarofficial.com', name: 'Fancy-Todo' },
        { link: 'http://dcoverflow.dreamcarofficial.com.s3-website-ap-southeast-1.amazonaws.com/', name: 'Dc-OverFlow' },
        { link: 'https://kamvan-d66ed.firebaseapp.com/', name: 'Dc-Kamban' }
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