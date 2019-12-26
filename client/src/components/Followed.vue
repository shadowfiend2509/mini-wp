<template>
  <div>
                  
    <div class="section-head border">
      <ul>
        <li>Followed Site <a id='cicle'>{{ count }}</a></li>
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

    <div class="section-head3 border" v-for='(articles1, i) in articles' :key='i'>
      <div v-for='(article, i) in articles1' :key='i'>
        <CardComponent 
          :get-article='article'
          @like-click='likeArticle'
          @change-page='sendReadOneArticle'
          @send-tag='sendTag'
        />
      </div>
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
      articles: [],
      count: 0
    }
  },
  components: {
    CardComponent
  },
  methods: {
    likeArticle (id) {
      axios({
        method: 'patch',
        url: `http://wpserver.dreamcarofficial.com/articles/${ id }`,
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
        url: 'http://wpserver.dreamcarofficial.com/users/getId/fol',
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
      for(let i=0; i<this.gettingId.length; i++ ){
        this.$awn.asyncBlock(
          this.shottingFol(this.gettingId[i]),
          "success",
          null,
          "Loading"
        )
      }
    },
    shottingFol (id) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: `http://wpserver.dreamcarofficial.com/articles/folArt/${id}`,
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(({data}) => {
            data.forEach(el => {
              this.count++
            })
            this.articles.push(data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  created () {
    this.getFollowingId()
    setTimeout(() => {
        this.getArticleFol()
    }, 3000);
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