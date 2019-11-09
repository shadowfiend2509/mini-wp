<template>
  
      <div class="cardd">
        <div class='card-texts col-8'>
          <div id='titledesc'>
            <p id='titlee' @click='changePage(getArticle._id)'>{{ getArticle.title }}</p>
          </div>
          <div id='trigbtn'>
            <div id="profille">
              <a href='#' class='nameAuthor btn-outline-primary btn'> <v-icon name='user' class='ticon'></v-icon> &nbsp; {{ getArticle.Author.username.toUpperCase() }}</a>
            </div>
          </div>
          <div id='tagss'>
            <div>
              <ul>
                <li v-for='(tag, i) in getArticle.tags' :key='i'>  <b-badge href="#" class='taggs' @click='sendTag(tag)'>{{ tag }}</b-badge> &nbsp; </li>
              </ul>
            </div>
            <div class='btntgls'>
              <button class="btn btn-outline-primary" @click='sendLike(getArticle._id)'>
                <v-icon class='ticon' name='thumbs-up'></v-icon> {{ getArticle.Likes.length }} Likes
              </button>
            </div>
          </div>
        </div>
        <div class='card-imgs col-4'>
          <img :src='getArticle.featured_image' style='width:320px'>
        </div>
      </div>
</template>

<script>
export default {
  props: ['getArticle'],
  methods: {
    sendLike (id) {
      this.$emit('like-click', id)
    },
    changePage (id) {
      this.$emit('change-page', id)
    },
    sendTag (name) {
      this.$emit('send-tag', name)
    }
  }
}
</script>

<style>
#titlee {
  cursor: pointer;
}
#titlee:hover {
  color: blue
}
</style>