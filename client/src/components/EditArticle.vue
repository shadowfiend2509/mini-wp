<template>
  <div>
    <div class="section-head border topp">
      <div class='text ml-2'>
        <h2>Edit Article</h2>
      </div>
      <div>
        <button class='btn btn-outline-dark btn-md mr-4' @click='saveChange'>Save Change</button>
      </div>
    </div>

    <div class='fortag'>

      <div id='tag'>
        <b-form-checkbox-group
          v-model="selected"
          :options="options"
          name="flavour-2a"
          id='checkboxgroup'
        ></b-form-checkbox-group>
      </div>
    </div>

    <div class='titlet'>
        <form @submit.prevent='addNewTag'>
          <input type='text' v-model='updateTag' id='inputTag' placeholder="Add Tag" style='text-align: center'> &nbsp; <input type="submit" value='add' class='btn-outline-dark'>
        </form>
        <div class='clastag'>
          <div v-for='(name, i) in selected' :key='i' class='center'>
              <b-badge pill variant="primary" class='pilltag'>{{ name }}</b-badge>
          </div>
          <button class='btn btn-outline-success' disabled><v-icon class='itcon' name='tag'></v-icon> &nbsp; Tag &nbsp; </button>
        </div>
    </div>


    <div class="section-head2 border">
        <div class="container">
          <div id="titleArt">
            <input type="text" v-model='updateTitle' placeholder="New Title">
          </div>
          <div id="content">
            <tinymce id="d1" 
              :other_options="tinyOptions" 
              v-model="updateContent"
            ></tinymce>
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
      updateTitle: null,
      updateContent: null,
      selected: [],
      tinyOptions: {
        height: '500'
      },
      options: [
        { text: 'Sport', value: 'sport' },
        { text: 'Politic', value: 'politic' },
        { text: 'Games', value: 'games' },
        { text: 'Music', value: 'music' },
        { text: 'Car', value: 'car'}
      ],
      updateTag: null,
    }
  },
  props: ['article'],
  methods: {
    addNewTag () {
      this.options.push({ text: this.updateTag, value: this.updateTag })
      this.updateTag = ''
    },
    saveChange () {
      this.$awn.asyncBlock(
        this.saveChangeP(),
        'success',
        null,
        'Loading'
      )
    },
    saveChangeP () {
      const id = this.article._id;
      const tags = this.selected;
      const title = this.updateTitle;
      const content = this.updateContent;
      return new Promise ((resolve, reject) => {
        axios({
          method: 'put',
          url: `http://wpserver.dreamcarofficial.com/articles/${id}`,
          data: {tags, title, content},
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.$emit('back-fetch')
            resolve()
          })
          .catch(err => {
            this.$awn.warning(err.response.data.msg)
            reject(err)
          })
      })
    }
  },
  created () {
    this.updateTitle = this.article.title;
    this.updateContent = this.article.content;
    this.selected = this.article.tags;
  }
}
</script>

<style scoped>
.text{
  margin-left: 5px;
}
.fortag {
  display: flex;
  flex-direction: column
}
.topp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px
}
.titlet {
  display: flex;
  justify-content: space-between
}
.clastag {
  display: flex;
  align-items: center
}
</style>