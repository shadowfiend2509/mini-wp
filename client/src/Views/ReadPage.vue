<template>
  
  <div>
    <nav id='navAr'>
      <div class="mainCreate ml-5 mt-2">
        <h2 id="idText" @click="sendPage('mainPage')">DcWordPress</h2>
      </div>
      <div class="butCreate mr-5">
        <button type="button" class="btn btn-outline-light btn-lg" style='height: 50px'><v-icon class='iconn' name='power'></v-icon></button>
      </div>
    </nav>  
    <div id="bodyAr">


    <div id="imag">
      <a :href='article.featured_image' target="_"><img :src='article.featured_image' style='width: 100%; margin:0px; height: 35vh;'></a>
    </div>


    <div class="section-head3 mainAr container-fluid">
      <div class="section-head headAr">
        <h1>{{ article.title }}</h1>
        <button class="btnpost2 btn btn-outline-primary mr-3"><v-icon name='thumbs-up' class='iconn'></v-icon> {{ article.Likes.length }} Likes</button>
      </div>
      <div class="profilee">
        <div class="leftProf">
          <img :src='article.Author.image' style='width:50px; border-radius: 50px'><a style='margin-left: -20px; font-size: 25px; color: grey'>{{ article.Author.username }}</a>
        </div>
        <div class="rightProf">
          {{ date }}
        </div>
      </div>
      <div class='container'>
        <ul>
          <li v-for='(tag, i) in article.tags' :key='i'>  <b-badge href="#" class='taggs' @click='searchTag(tag)'>{{ tag }}</b-badge> &nbsp; </li>
        </ul>
      </div>
      <div class="container">
        <div id='articleUser' class='border' v-if='privatee'>
          <div id="lock">
            <v-icon name='lock' class='lockProfile'></v-icon>
            <p>Private</p>
          </div>
        </div>


        <div class='contentt' v-else>
          <div id="articleContent" >
            <p v-html='article.content'></p>
          </div>
        </div>
      </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      article: '',
      privatee: false
    }
  },
  props: ['getId'],
  methods: {
    fetchArticle () {
      const id = this.getId;
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: `http://localhost:3000/articles/one/${id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.article = data
            resolve()
          })
          .catch(reject)
      })
    },
    sendPage (name) {
      this.$emit('change-page', name)
    },
    searchTag (name) {
      this.$emit('search-tag', name)
    }
  },
  created () {
    this.$awn.asyncBlock(
      this.fetchArticle(),
      'success fetch article',
      null,
      'Getting Article'
    )
  },
  computed: {
    date () {
      return this.article.createdAt.slice(0,10)
    }
  }
}
</script>

<style scoped>
.iconn{
  width: 20px
}
.profilee{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#bodyAr {
  height: 94vh;
  overflow: auto;
}
#navAr {
  background-color: #0085BE;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.contentt {
  overflow: auto;
}
#articleContent{
  margin-top: 10px;
}
p{
  font-size: 55px;
}
.mainAr {
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.headAr {
  display: flex;
  justify-content: space-around;
  align-items: center
}
.btnpost2 {
  height: 40px
}
.card-body {
  display: flex;
  justify-content: space-around
}
img {
  width: 250px;
  position: relative;
  margin: 0 42px
}
#lock {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh
}
.lockProfile {
  width: 150px
}
</style>