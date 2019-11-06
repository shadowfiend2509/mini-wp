<template>
<div id='menuu'>
<div>
  <h5 class="left-menus">Streams</h5>
  <hr>
    <div id="sub-menu">
        <ul class="menu-need-hover" @click='responseSite("public")'>
            <v-icon name='more-horizontal' class='iconn'></v-icon> &nbsp;Public Site
        </ul>
        <ul class="menu-need-hover">
            <v-icon name='check-circle' class='iconn'></v-icon> &nbsp; Followed Sites
        </ul>
        <ul class="menu-need-hover">
            <v-icon name='users' class='iconn'></v-icon> &nbsp; Find Friends
        </ul>
        <ul class="menu-need-hover" @click='responseSite("chatRoom")'>
            <v-icon name='message-circle' class='iconn'></v-icon> &nbsp; Chat
        </ul>
        <ul class="menu-need-hover">
            <v-icon name='star' class='iconn'></v-icon> &nbsp; My Like
        </ul>
    </div>
</div>
<div>
  <h5 class="left-menus">Manage</h5>
  <hr>
    <div id="sub-menu">
        <ul class="menu-need-hover" @click='responseSite("mySite")'>
          <v-icon name='minimize' class='iconn'></v-icon> &nbsp;Site Pages
        </ul>
        <ul class="menu-need-hover">
            <i class="submenu-logo far fa-clipboard"></i> &nbsp; Blog Post
        </ul>
        <ul class="menu-need-hover" @click='responseSite("profile")'>
            <v-icon class='iconn' name='settings'></v-icon> &nbsp; Profile
        </ul>
        <ul class="menu-need-hover">
            <i class="submenu-logo fas fa-comment-alt"></i> &nbsp; Feedback
        </ul>
        <ul class="menu-need-hover">
            <i class="submenu-logo fas fa-scroll"></i> &nbsp; Testimonials
        </ul>
        <ul class="menu-need-hover" v-b-toggle.collapse-a.collapse-b>
            <v-icon class='ipor' name='award'></v-icon> &nbsp; <a id='portFolio'>Portofolio</a>

            <!-- Elements to collapse -->
        </ul>
        <div id="colaps">
          <b-collapse id="collapse-a" class="mt-2">
            <a href='http://started.dreamcarofficial.com' target="_"><b-card class='portIn'>E-Commerce</b-card></a>
          </b-collapse>
          <b-collapse id="collapse-b" class="mt-2">
            <a href='http://todo.dreamcarofficial.com' target="_"><b-card class='portIn'>Fancy-Todo</b-card></a>                  
          </b-collapse>
          <b-collapse id="collapse-b" class="mt-2">
            <a href='http://dcoverflow.dreamcarofficial.com.s3-website-ap-southeast-1.amazonaws.com/' target="_"><b-card class='portIn'>Dc-OverFlow</b-card></a>                  
          </b-collapse>
          <b-collapse id="collapse-b" class="mt-2">
            <a href='https://kamvan-d66ed.firebaseapp.com/' target="_"><b-card class='portIn'>Dc-Kamban</b-card></a>                  
          </b-collapse>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
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