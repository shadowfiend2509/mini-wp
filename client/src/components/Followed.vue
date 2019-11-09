<template>
  <div>
                  
    <div class="section-head border">
      <ul>
        <li>Public Site <a id='cicle'>{{articles.length}}</a></li>
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

    <div class="section-head3 border" v-for='(article, i) in articles[0]' :key='i'>
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
import axios from 'axios'
import CardComponent from './CardComponent'

export default {
  data () {
    return {
      gettingId: [],
      articles: []
    }
  },
  components: {
    CardComponent
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
          return this.getArticleFol() 
        })
        .then((data) => {
          this.articles = data
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    sendReadOneArticle (id) {
      this.$emit('changeforarticle', id)
    },
    sendTag (name) {
      this.$emit('send-tag', name);
    },
    getFollowingId () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/getId/fol',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          data.id.forEach(el => {
            this.gettingId.push(el._id)
          })
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    getArticleFol () {
      return new Promise ((resolve,reject) => {
        for(let i=0; i<this.gettingId.length; i++ ){
          this.shottingFol(this.gettingId[i])
        }
        resolve(this.articles)
      })
    },
    shottingFol (id) {
      this.articles = []
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/folArt/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({data}) => {
          this.articles.push(data)
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.getFollowingId()
    setTimeout(() => {
      this.$awn.asyncBlock(
        this.getArticleFol(),
        'fetching article',
        null,
        'Loading'
      )
    }, 1000);
  },
  watch: {
    articles: {
      handler(val) {
        this.articles = val
      }
    }
  }
}
</script>

<style>

</style>