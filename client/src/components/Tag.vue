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
          <button class="btnpost btn" @click='sendPage("makeArticle")'>Create New Post</button>
        </div>
      </div>
    </div>

    <div class="section-head3 border" v-for='(article, i) in results' :key='i'>
      <div class="cardd">
        <div class='card-texts col-8'>
          <div id='titledesc'>
            <p id='titlee'>{{ article.title }}</p>
          </div>
          <div id='trigbtn'>
            <div id="profille">
              <v-icon name='user' class='ticon'></v-icon> &nbsp; {{ article.Author.username }}
            </div>
          </div>
          <div id='tagss'>
            <div>
              <ul>
                <li v-for='(tag, i) in article.tags' :key='i'>  <b-badge href="#" class='taggs'> {{ tag }}</b-badge> &nbsp;</li>
              </ul>
            </div>
            <div class='btntgls'>
                <button class="btn btn-outline-primary" ><v-icon class='ticon' name='thumbs-up'></v-icon> {{ article.Likes.length }}  Likes</button>
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
    sendPage (name) {
      this.$emit('change-page', name)
    },
    gotTemp () {
      const name = this.getTag;
      this.searchTag (name) 
        .then(data => {
          console.log(data)
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
          url: `http://localhost:3000/articles/tag/${name}`,
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
    }
  },
  created () {
    this.gotTemp()
  }
}
</script>

<style>
</style>