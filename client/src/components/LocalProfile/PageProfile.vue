<template>
  <div>
    <div class="section-head2 border">
      <div class="poss">
        <div class='ps'>
          Profile
        </div>
      </div>
    </div>

    <div class="section-head3 border">
      <div class="cardd">
        <div class='card-imgs imgform col-5'>
          <div>
            <img :src='user.image' style='width:300px'>
          </div>
          <div id='formtext'>
            <b-form-file
              ref="file"
              type="file"
              name='file'
              v-model="file"
              :state="Boolean(file)"
              placeholder="upload.."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </div>
        </div>
        <div class='card-texts col-7'>
          <div id='titledesc'>
            <p>
              <v-icon name='user' class='iconn'></v-icon> &nbsp; Username &nbsp;:&nbsp; {{ user.username }}<br>
              <v-icon name='mail' class='iconn'></v-icon> &nbsp; Email &nbsp;:&nbsp; {{ user.email }}<br>
              <v-icon name='users' class='iconn'></v-icon> &nbsp; Following &nbsp;:&nbsp; {{ user.Following.length }}<br>
              <v-icon name='users' class='iconn'></v-icon> &nbsp; Followers &nbsp;:&nbsp; {{ user.Followers.length }}<br>
              <v-icon name='users' class='iconn'></v-icon> &nbsp; RequestIn &nbsp;:&nbsp; {{ user.RequestIn.length }}<br>
              <v-icon name='users' class='iconn'></v-icon> &nbsp; RequestOut &nbsp;:&nbsp; {{ user.RequestOut.length }}<br>
              <v-icon :name='statusName' class='iconn'></v-icon> &nbsp; Status &nbsp;:&nbsp; {{ name }} <button class='btn btn-outline-warning btn-sm' @click='changeStatus'>change</button>
            </p>
          </div>
          <div id='trigbtn'>
            <div id="profille">
            </div>
          </div>
          <div id='tagss'>
            <div>
              <ul>
                <li>  <b-badge href="#" class='taggs'></b-badge> &nbsp; </li>
              </ul>
            </div>
            <div class='btntgls'>
              <form @submit.prevent='uploadImage' enctype="multipart/form-data">
                <button class="btn btn-outline-primary" type='submit'><v-icon class='ticon' name='upload'></v-icon> Upload Image</button>
              </form>
            </div>
          </div>
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
      user: null,
      statusName: null,
      name: null,
      file: null
    }
  },
  props: ['getProfile'],
  methods: {
    uploadImage () {
      const formData = new FormData()
      formData.append('image', this.file)
      axios({
        method: 'patch',
        url: `http://wpserver.dreamcarofficial.com/users/upload`,
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(({data}) => {
          this.getProfile.image = data.url
          swal.fire({
            position: 'top-right',
            title: 'Success update picture'
          })
        })
        .catch(err => {
          swal.fire({
            type: 'warning',
            title: err.response.data.msg
          })
        })
    },
    changeStatus () {
      axios({
        method: 'patch',
        url : `http://wpserver.dreamcarofficial.com/users/change/status`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.getProfile.status = !this.getProfile.status
          this.getStatus()
        })
        .catch(console.log)
    },
    getStatus() {
      if(this.getProfile.status){
        this.statusName = 'lock'
        this.name = 'Private'
      } else {
        this.statusName = 'unlock'
        this.name = 'Public'
      }
    }
  },
  created () {
    this.getStatus()
    this.user = this.getProfile
  }
}
</script>

<style>
.imgform {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.iconn {
  width: 20px
}
</style>