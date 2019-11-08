<template>
  <div>
                  
    <div class="section-head border">
      <ul>
        <li>Public Site</li>
      </ul>
    </div>

    <div class="section-head2 border">
      <div class="poss">
        <div class='ps'>
          Posts
        </div>
        <div class='btnps'>
          <button class="btnpost btn">Add New Post</button>
        </div>
      </div>
    </div>

    <div class="section-head3 border" v-for='(article, i) in articles' :key='i'>
      <div class="cardd">
        <div class='card-texts col-8'>
          <div id='titledesc'>
            <p id='titlee'>{{ article.title }}</p>
          </div>
          <div id='trigbtn'>
            <div id="profille">
              <a href='#' class='nameAuthor btn-outline-primary btn'> <v-icon name='user' class='ticon'></v-icon> &nbsp; {{ article.Author.username.toUpperCase() }}</a>
            </div>
          </div>
          <div id='tagss'>
            <div>
              <ul>
                <li v-for='(tag, i) in article.tags' :key='i'>  <b-badge href="#" class='taggs'>{{ tag }}</b-badge> &nbsp; </li>
              </ul>
            </div>
            <div class='btntgls'>
              <button class="btn btn-outline-primary" @click='likeArticle(article._id)'>
                <v-icon class='ticon' name='thumbs-up'></v-icon> {{ article.Likes.length }} Likes
              </button>
            </div>
          </div>
        </div>
        <div class='card-imgs col-4'>
          <img :src='article.featured_image' style='width:320px'>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import io from 'socket.io-client'

export default {
  data () {
    return {
      articles: null,
      socket: io.connect('http://localhost:3000')
    }
  },
  methods: {
    likeArticle (id) {
      axios({
        method: 'patch',
        url: `http://localhost:3000/articles/${ id }`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.fetchAllArticle()
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAllArticle () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles/public'
      })
        .then(({data}) => {
          this.articles = data
          console.log(this.articles)
        })
        .catch(err => {
          swal.fire({
            type: 'warning',
            title: err.response.data.msg
          })
        })
    },
    sendPage (name) {
      this.$emit('change-page', name)
    }
  },
  created () {
    this.fetchAllArticle()


      
    this.socket.on('createArticle', (data) => {
      console.log(data)
      this.articles.unshift(data)
      data = null
    })
  }
}
</script>

<style>
#profille{

}
</style>