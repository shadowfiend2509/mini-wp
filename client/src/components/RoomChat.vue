<template>
<div id='roomChat'>
  <div id="top" class="border">
    <div class="header border">
      <h1>Dc World Chat</h1>
    </div>
    <div id="message" class='border'>
        <div class="chats" v-for='(msg, i) in messages' :key='i'>
          <b-card :border-variant="msg.UserId.color" :header="msg.UserId.username" align="right" class='mb-2'>
            <b-card-text>{{ msg.msg }}</b-card-text>
          </b-card>
        </div>
      </div>

  <div class="border">
    <form id="btm" @submit.prevent='sendMessage()'>
      <div class="inputBox col-10 mt-3">
        <input type="text" id="inpuText" v-model='newMsg' placeholder="All messages will be reset once a day.." style='text-align: center;width: 100%; height: 40px'>
      </div>
      <div class="btnsend col-2">
        <button type="submit" class="btn btn-outline-primary btn-md mt-3"><v-icon name='send' class='iconn'></v-icon> &nbsp; Send</button>
      </div>
    </form>
  </div>
</div>
  
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'

export default {
  data () {
    return {
      messages: null,
      userLogin: null,
      newMsg: null,
      socket: io.connect(`http://wpserver.dreamcarofficial.com`)
    }
  },
  methods: {
    sendMessage () {
      axios({
        method: 'post',
        url: 'http://wpserver.dreamcarofficial.com/msg',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          msg: this.newMsg
        }
      })
        .then(({data}) => {
          this.socket.emit('send', data.msg)
          data.msg = null
          this.newMsg = ''
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    fetchMessage () {
      axios({
        method: 'get',
        url: 'http://wpserver.dreamcarofficial.com/msg',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.messages = data.msg
          this.messages.reverse()
        })
        .catch(err =>{
          this.$awn.warning(err.response.data.msg)
        })
    },
    fetchUser () {
      axios({
        method: 'get',
        url: 'http://wpserver.dreamcarofficial.com/users/find/login',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.userLogin = data
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.fetchMessage();
    this.fetchUser();
    this.socket.on('send-message', (data) => {
      this.messages.unshift(data)
      data = null
    })
  }

}
</script>

<style>
.card {
  width: 100%
}
.header {
  height: 80px;
  padding: 10px;
  display: flex;
  justify-content: center;
}
#message {
  padding: 5px;
  height: 67vh;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  background-color: white
}
#top {
  height: 73vh
}
#roomChat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh
}
.inputBox{
  display: flex;
  justify-content: center;
  align-items: center;
}
#btm {
  display: flex;
  justify-content: space-between;
}
.btnsend {
  display: flex;
  justify-content: center
}
</style>