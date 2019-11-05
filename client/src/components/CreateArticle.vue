<template>
  <div id='makeArticles'>
    <nav id='navcreate' class='border'>
      <div class="mainCreate">
        <h2 id="idText" @click="sendPage('mainBody')">DcWordPress</h2>
      </div>
      <div class="butCreate">
        <button type="button" class="btn btn-outline-light btn-lg site-btns btnPub" @click='sendPage("makeArticle")'><v-icon class='ihome' name='upload-cloud'></v-icon> &nbsp; Publish</button>
      </div>
    </nav>
    <div class='body-container border'>
      <div class="col-9 border sideleft">
        <div class="container">
          <div id="titleArt">
            <input type="text" v-model='title' placeholder="Add Title">
          </div>
          <div id='tag'>
            <button class='btn btn-outline-success' disabled><v-icon class='itcon' name='tag'></v-icon> &nbsp; Tag &nbsp; </button>
            <div v-for='(name, i) in selected' :key='i' class='center'>
                <b-badge pill variant="primary" class='pilltag'>{{ name }}</b-badge>
            </div>
          </div>
          <div id="content">
            <tinymce-editor api-key="c3wnyw28t1iji4r87vosh9lp2l4vegqf78rxgkh9xvb1avky" :init="{plugins: 'wordcount'}"></tinymce-editor>
          </div>
        </div>

      </div>
      <div class="col-3 border">
          <b-form-group label="Using options array:">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="options"
              name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>
      </div>
    </div>



    <div class="footerr">
      <p>Powered by <v-icon name='copy' class='iconcop'></v-icon> <span>DreamCar Official</span></p>
    </div>


  </div>
</template>

<script>

import Editor from '@tinymce/tinymce-vue';

export default {
  data() {
    return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Sport', value: 'sport' },
          { text: 'Politic', value: 'politic' },
          { text: 'Games', value: 'games' },
          { text: 'Music', value: 'music' }
        ]
    }
  },
  components:{
    'tinymce-editor': Editor // <- Important part
  },
  methods: {
    sendPage(name) {
      this.$emit('change-page', name)
    }
  }
}
</script>

<style>
.pilltag {
  font-size: 15px !important;
  margin-left : 10px;
}
.itcon {
  width: 20px
}
#titleArt {
  display: flex;
  justify-content: center;
}
#titleArt input {
  width: 100%;
  height: 200px;
  text-align:center;
  font-size: 40px;
  text-decoration: none
}
#tag {
  display: flex;
  margin-top: 10px;
  padding-left: 2px;
  align-items: center;
}
#makeArticles{ 
  height: 100vh;
  background-color:#F6F7F7;
  overflow: auto;
}
.sideleft{ 
  padding: 20px;
  background-color: #ffffff;
}
.body-container {
  display: flex;
  height: 86vh
}
#navcreate {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  justify-content: space-between;
  padding: 20px
}
.btnPub{
  background-color: rgb(1, 123, 186) !important;
}
.btnPub:hover{
  background-color: rgb(58, 149, 195) !important
}
.site-btns{
  margin-right: 15px
}
.site-btns:hover{
  background-color: rgb(1, 123, 186) !important;
}
#idText{
  font-family: 'Yeon Sung', cursive;
  font-size: 40px;
  cursor: pointer;
}
.butCreate {
  display: flex;
}
.ihome {
  width: 20px
}
</style>