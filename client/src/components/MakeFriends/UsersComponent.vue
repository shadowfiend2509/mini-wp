<template>
<div>
      <div :class='getColor'>
        {{ getUser.username }}
        <span class="isVerified">
            <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
  </svg>
          </span>
        <div class="isOnline">
          <small>Online</small>
        </div>
      </div>
      <div class="card-body profileBody">
        <div class="profilePic">
          <a :href='getUser.image' target="_"><img class="avatar" :src="getUser.image" alt="Username"></a>
        </div>
        <div class="profileInfo">
          <div class='fol'>
            <div>
              Followers
            </div>
            <div>
              {{ getUser.Followers.length }}
            </div>
          </div>
          <div class='fol'>
            <div>
              Following
            </div>
            <div>
              {{ getUser.Following.length }}
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer actions">
        <div class="actionFirst" @click='actionFolPublic(getUser._id)' v-if='!privatee'>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <v-icon :name='statusFol.iconFol' class='users'></v-icon>
          </svg>  &nbsp; {{ statusFol.messageFol }}
        </div>
        <div class="actionFirst" @click='actionFolPrivate(getUser._id)' v-else-if='privatee'>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <v-icon :name='statusFol.isPrivate.iconPrivate' class='users'></v-icon>
          </svg>  &nbsp; {{ statusFol.isPrivate.messagePrivate }}
        </div>
        <div class="actionSecond" v-if='!privatee'>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M11.83,1.73C8.43,1.79 6.23,3.32 6.23,3.32C5.95,3.5 5.88,3.91 6.07,4.19C6.27,4.5 6.66,4.55 6.96,4.34C6.96,4.34 11.27,1.15 17.46,4.38C17.75,4.55 18.14,4.45 18.31,4.15C18.5,3.85 18.37,3.47 18.03,3.28C16.36,2.4 14.78,1.96 13.36,1.8C12.83,1.74 12.32,1.72 11.83,1.73M12.22,4.34C6.26,4.26 3.41,9.05 3.41,9.05C3.22,9.34 3.3,9.72 3.58,9.91C3.87,10.1 4.26,10 4.5,9.68C4.5,9.68 6.92,5.5 12.2,5.59C17.5,5.66 19.82,9.65 19.82,9.65C20,9.94 20.38,10.04 20.68,9.87C21,9.69 21.07,9.31 20.9,9C20.9,9 18.15,4.42 12.22,4.34M11.5,6.82C9.82,6.94 8.21,7.55 7,8.56C4.62,10.53 3.1,14.14 4.77,19C4.88,19.33 5.24,19.5 5.57,19.39C5.89,19.28 6.07,18.92 5.95,18.6V18.6C4.41,14.13 5.78,11.2 7.8,9.5C9.77,7.89 13.25,7.5 15.84,9.1C17.11,9.9 18.1,11.28 18.6,12.64C19.11,14 19.08,15.32 18.67,15.94C18.25,16.59 17.4,16.83 16.65,16.64C15.9,16.45 15.29,15.91 15.26,14.77C15.23,13.06 13.89,12 12.5,11.84C11.16,11.68 9.61,12.4 9.21,14C8.45,16.92 10.36,21.07 14.78,22.45C15.11,22.55 15.46,22.37 15.57,22.04C15.67,21.71 15.5,21.35 15.15,21.25C11.32,20.06 9.87,16.43 10.42,14.29C10.66,13.33 11.5,13 12.38,13.08C13.25,13.18 14,13.7 14,14.79C14.05,16.43 15.12,17.54 16.34,17.85C17.56,18.16 18.97,17.77 19.72,16.62C20.5,15.45 20.37,13.8 19.78,12.21C19.18,10.61 18.07,9.03 16.5,8.04C14.96,7.08 13.19,6.7 11.5,6.82M11.86,9.25V9.26C10.08,9.32 8.3,10.24 7.28,12.18C5.96,14.67 6.56,17.21 7.44,19.04C8.33,20.88 9.54,22.1 9.54,22.1C9.78,22.35 10.17,22.35 10.42,22.11C10.67,21.87 10.67,21.5 10.43,21.23C10.43,21.23 9.36,20.13 8.57,18.5C7.78,16.87 7.3,14.81 8.38,12.77C9.5,10.67 11.5,10.16 13.26,10.67C15.04,11.19 16.53,12.74 16.5,15.03C16.46,15.38 16.71,15.68 17.06,15.7C17.4,15.73 17.7,15.47 17.73,15.06C17.79,12.2 15.87,10.13 13.61,9.47C13.04,9.31 12.45,9.23 11.86,9.25M12.08,14.25C11.73,14.26 11.46,14.55 11.47,14.89C11.47,14.89 11.5,16.37 12.31,17.8C13.15,19.23 14.93,20.59 18.03,20.3C18.37,20.28 18.64,20 18.62,19.64C18.6,19.29 18.3,19.03 17.91,19.06C15.19,19.31 14.04,18.28 13.39,17.17C12.74,16.07 12.72,14.88 12.72,14.88C12.72,14.53 12.44,14.25 12.08,14.25Z"></path>
          </svg> Profile
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      getColor: `card-header profileName bg-${this.getUser.color}`,
      privatee: null,
      statusFol: {
        messageFol: null,
        iconFol: null,
        isPrivate: {
          messagePrivate: null,
          iconPrivate: null
        }
      }
    }
  },
  props: ['getUser', 'getLoginUser'],
  methods: {
    actionFolPrivate (id) {
      this.statusFol.isPrivate.iconPrivate = ''
      axios({
        method: 'patch',
        url: `http://wpserver.dreamcarofficial.com/users/status/private/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$emit('reload-users', data.msg);
          if(this.statusFol.isPrivate.messagePrivate == 'Private') {
            this.statusFol.isPrivate.messagePrivate = 'Request';
            this.statusFol.isPrivate.iconPrivate = 'refresh-ccw';
          } else {
            this.statusFol.isPrivate.messagePrivate = 'Private';
            this.statusFol.isPrivate.iconPrivate = 'lock'
          }
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    actionFolPublic (id) {
      axios({
        method: 'patch',
        url: `http://wpserver.dreamcarofficial.com/users/status/public/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$emit('reload-users', data.msg)
          if(this.statusFol.messageFol == 'Follow'){
            this.statusFol.messageFol = 'Unfollow';
            this.statusFol.iconFol = 'user-minus'
          } else {
            this.statusFol.messageFol = 'Follow';
            this.statusFol.iconFol = 'user-plus'
          }
          setTimeout(() => {
            this.checkStatus()
          }, 3000);
        })
        .catch(err => {
          this.$awn.warning(err.response)
        })
    },
    checkPossible () {
      let pass = false;
      for(let i=0; i<this.getUser.Followers.length; i++) {
        if(this.getUser.Followers[i] == this.getLoginUser._id) pass = true;
      }
      if(!pass) {
        this.statusFol.messageFol = 'Follow';
        this.statusFol.iconFol = 'user-plus';
      } else{
        this.statusFol.messageFol = 'Unfollow';
        this.statusFol.iconFol = 'user-minus';
        this.privatee = false;
      } 
      let pasRequest = false;
      for(let i=0; i<this.getUser.RequestIn.length; i++) {
        if(this.getUser.RequestIn[i] == this.getLoginUser._id) pasRequest = true;
      }
      if(!pasRequest) {
        this.statusFol.isPrivate.messagePrivate = 'Private';
        this.statusFol.isPrivate.iconPrivate = 'lock';
      } else {
        this.statusFol.isPrivate.messagePrivate = 'Request';
        this.statusFol.isPrivate.iconPrivate = 'refresh-ccw'
      }
    },
    checkStatus () {
      const id = this.getUser._id;
      axios({
        method: 'get',
        url: `http://wpserver.dreamcarofficial.com/users/status/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.privatee = data.status;
          if(this.privatee) {
            this.statusFol.isPrivate.messagePrivate = 'Private'
            this.statusFol.isPrivate.iconPrivate = 'lock'
          }
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.checkStatus()
    setTimeout(() => {
      this.checkPossible()
    }, 1000);
  }
}
</script>

<style scoped>

.profileName {
  background:transparent;
  border:0;
  border-radius: 20px;
  text-align:center;
  font-size:16px;
  font-weight:800;
  color:#eee;
}

.lock {
  width: 25px;
}

.isVerified {
  fill: #eee;
  margin:5px;
}

.card-body {
  color:#eee;
  height: 60%;
  margin-top:1.5em;
}
.avatar {
  border-radius:50%;
  max-width:128px;
  transform: scale(0.95);
  transition:all .5s;
  cursor:pointer;
}
.avatar:hover {
  transform: scale(1);
  box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.2);
}
.profilePic {
  text-align:center;
  margin-top: -35px;
  height: 180px
}
.isOnline {
  text-align:center;
  color:#eee;
}
.profileInfo {
  margin-top:1em;
  font-weight:200;
  font-size:20px;
  color:#eee;
  text-align:center;
  display: flex;
  justify-content: space-around;
}
.actions {
  background:transparent;
  border:0;
  color:#fff;
  display: flex;
  justify-content: center;
}
.actionFirst, .actionSecond {
  width:50%;
  text-align:center;
  fill:#ddd;
  transform: scale(0.8);
  transition:all .3s;
  cursor:pointer;
}
.actionFirst:hover, .actionSecond:hover {
  transform: scale(1);
  fill:#fff;
}
</style>