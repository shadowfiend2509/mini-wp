<template>
  <div>
                  
    <div class="section-head border">
      <ul>
        <li>Public Site <a id='cicle'>{{ articles.length }}</a></li>
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
      <CardComponent 
        :get-article='article'
        @like-click='likeArticle'
        @change-page='sendReadOneArticle'
        @send-tag='sendTag'
        />
    </div>

  </div>
</template>

<script>
import CardComponent from "./CardComponent"
import axios from 'axios';
import swal from 'sweetalert2';
import io from 'socket.io-client'

export default {
  data () {
    return {
      articles: '',
      socket: io.connect('http://localhost:3000')
    }
  },
  components: {
    CardComponent
  },
  methods: {
    sendTag (name) {
      this.$emit('send-tag', name);
    },
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
            .then(data => {
              this.articles = data
            })
            .catch(err => {
              this.$awn.warning(err.response.data.msg)
            })
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    fetchAllArticle () {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/articles/public',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            resolve(data)
          })
          .catch(err => {
            swal.fire({
              type: 'warning',
              title: err.response.data.msg
            })
            reject(err)
          })
      })
    },
    sendPage (name) {
      this.$emit('change-page', name)
    },
    sendReadOneArticle (id) {
      this.$emit('changeforarticle', id)
    }
  },
  created () {
    this.fetchAllArticle()
      .then(data => {
        this.articles = data;
      })
      .catch(err => {
        this.$awn.warning(err.response.data.msg)
      })

    this.socket.on('createArticle', (data) => {
      if(!data.Author.status) {
        this.articles.unshift(data)
        data = null
      } else {
        data = null
      }
    })
  }
}
</script>

<style>
</style>