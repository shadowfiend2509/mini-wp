<template>
  <div>
                  
    <div class="section-head border">
      <ul>
        <li>Tags {{ getTag }} </li>
      </ul>
    </div>

    <div class="section-head2 border">
      <div class="poss">
        <div class='ps'>
          Posts 
        </div>
        <div class='btnps'>
          <button class="btnpost btn" @click='sendPagetoGrandParent("makeArticle")'>Create New Post</button>
        </div>
      </div>
    </div>

    <div class="section-head3 border" v-for='(article, i) in results' :key='i'>
      <div class="cardd">
        <div class='card-texts col-8'>
          <div id='titledesc'>
            <p id='titlee' @click='changeforArticle(article._id)'>{{ article.title }}</p>
          </div>
          <div id='trigbtn'>
            <div id="profille">
              <v-icon name='user' class='ticon'></v-icon> &nbsp; {{ article.Author.username }}
            </div>
            <div class="space">
              <div class='btntgls'>
                <ul>
                  <li v-for='(tag, i) in article.tags' :key='i'>  <b-badge href="#" class='taggs' @click='searchTagAgain(tag)'> {{ tag }}</b-badge> &nbsp;</li>
                </ul>
              </div>
              <div class='imbtn'>
                <button class="btn btn-outline-primary mt-4" @click='likeArticle(article._id)'><v-icon class='ticon' name='thumbs-up'></v-icon> {{ article.Likes.length }}  Likes</button>
              </div>
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
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      results: null
    }
  },
  props: ['getTag'],
  methods: {
    likeArticle (id) {
      axios({
        method: "patch",
        url: `http://wpserver.dreamcarofficial.com/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.gotTemp()
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    sendPage (name) {
      this.$emit('change-page', name)
    },
    searchTagAgain (name) {
      this.getTag = name
      this.gotTemp()
    },
    gotTemp () {
      const name = this.getTag;
      this.searchTag (name) 
        .then(data => {
          this.results = data;
        })
        .catch(err => {
          swal.fire({
            type: 'warning',
            title: err.msg
          })
        })
    },
    searchTag (name) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: `http://wpserver.dreamcarofficial.com/articles/tag/${name}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            resolve(data.article)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    changeforArticle (id) {
      this.$emit('changetoreadpage', id)
    },
    sendPagetoGrandParent (name) {
      this.$emit('to-grand-parent', name)
    }
  },
  created () {
    this.gotTemp()
  }
}
</script>

<style>
.imbtn{
  height: 25px !important
}
.space{
  display: flex;
  justify-content: space-between
}
</style>