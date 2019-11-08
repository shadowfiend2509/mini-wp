<template>
  <div id='makeArticles'>
    <nav id='navcreate' class='border'>
      <div class="mainCreate">
        <h2 id="idText" @click="sendPage('mainPage')">DcWordPress</h2>
      </div>
      <div class="butCreate">
        <form @submit.prevent='publishArticle' enctype="multipart/form-data">
          <input type="submit" value='Publish' class="btn btn-outline-light btn-lg site-btns btnPub">
        </form>
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
            <tinymce id="d1" 
              :other_options="tinyOptions" 
              v-model="Content"
            ></tinymce>
          </div>
        </div>

      </div>
      <div class="col-3 rightMenu">

                <ul class="menu-need-hover" v-b-toggle.collapse-a.collapse-b>
                    <v-icon class='ipor' name='award'></v-icon> &nbsp; <a id='portFolio'>Add Tags</a>

                    <!-- Elements to collapse -->
                </ul>
                <div id="colaps">
                  <b-collapse id="collapse-a" class="mt-2">
                      <b-form-checkbox-group
                        v-model="selected"
                        :options="options"
                        name="flavour-2a"
                        id='checkboxgroup'
                      ></b-form-checkbox-group>
                  </b-collapse>
                  <b-collapse id="collapse-b" class="mt-2">
                    <form @submit.prevent='addTag'>
                      <b-card class='portIn'><input type='text' v-model='newtag' id='inputTag' placeholder="Add Tag" style='text-align: center'> &nbsp; <input type="submit" value='add' class='btn-outline-dark btn'></b-card>
                    </form>                
                  </b-collapse>
                </div>
                <ul class="menu-need-hover" v-b-toggle.collapse-c.collapse-d>
                    <v-icon class='ipor' name='image'></v-icon> &nbsp; <a id='portFolio'>Featured Image</a>

                    <!-- Elements to collapse -->
                </ul>

                <div id="colaps">
                  <b-collapse id="collapse-c" class="mt-2">
                    <b-card class='portIn'>
                      <b-form-file
                        ref="file"
                        type="file"
                        name='file'
                        v-model="file"
                        :state="Boolean(file)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                    </b-card>
                  </b-collapse>
                </div>
      </div>
    </div>



    <div class="footerr">
      <p>Powered by <v-icon name='copy' class='iconcop'></v-icon> <span>DreamCar Official</span></p>
    </div>


  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import axios from 'axios'
import io from 'socket.io-client'

export default {
  data() {
    return {
      selected: [], // Must be an array reference!
      file: null,
      Content: null,
      title: null,
      options: [
        { text: 'Sport', value: 'sport' },
        { text: 'Politic', value: 'politic' },
        { text: 'Games', value: 'games' },
        { text: 'Music', value: 'music' },
        { text: 'Car', value: 'car'}
      ],
      newtag: null,
      tinyOptions: {
        'height': 600,
      },
      socket: io.connect('http://localhost:3000')
    }
  },
  components:{
    'tinymce-editor': Editor
  },
  methods: {
    sendPage(name) {
      this.$emit('change-page', name)
    },
    sendChange (article) {
      this.$emit('change-send', article)
    },
    addTag () {
      this.options.push({ text: this.newtag, value: this.newtag})
      this.newtag = null
    },
    publishArticle () {
      this.$awn.asyncBlock(
        this.uploading(),
        'Success create new Post!',
        'Failed',
        'Uploading'
      )
    },
    uploading () {
      return new Promise ((resolve, reject) => {
      const tags = this.selected;
      const title = this.title;
      const content = this.Content;
      let formData = new FormData();
      formData.append('image', this.file);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tags', tags)
      
      axios({
        method: 'post',
        url: 'http://localhost:3000/articles/upload',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(({data}) => {
          console.log(data)
          this.socket.emit('createArticle', data.article._id)
          this.sendChange(data.article)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    }
  }
}
</script>

<style>
#content {
  margin-top: 10px
}
#inputTag{
  border-radius: 10px
}
.rightMenu{
  margin-top: 50px
}
#checkboxgroup{
  padding: 20px
}
#checkbox-group-1 {
  display: flex;
}
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
  height: 85.5vh
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