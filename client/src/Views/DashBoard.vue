<template>
  <!-- LOADING PAGE -->

<div>
  <div>
      <NavBarLogin 
        :notif='notif'
        @change-page='sendPageToParent'
        />
    </div>
  <div id='loading' v-if='isloader'>
    <Loading
      />
  </div> 

<div id='dashboard' v-else-if='!isloader'>
    <div class="container-fluid">
      <div class="bodyDash">

        <div class="leftDash col-2">
          <div>
            <DashBoardLeft 
              @response-site='changeResponse'
              />
          </div>
        </div>

        
        <div class="rightDash col-10">
            <div class="container" id='conBody'>

                <!-- Chat Room -->
                
                <div class='dashHead' v-if='name == "chatRoom"'>
                  <Chat 
                    @change-page='sendPage'
                  />
                </div>

                <!-- My Site Page -->

                <div class="dashHead" v-else-if='name == "mySite"'>
                  
                  <div class="section-head border">
                    <ul>
                      <li>Published <a id='cicle'>{{ getArticle.length }}</a></li>
                    </ul>
                  </div>

                  <div class="section-head2 border">
                    <div class="poss">
                      <div class='ps'>
                        Posts
                      </div>
                      <div class='btnps'>
                        <button class="btnpost btn" @click='gotoPage("makeArticle")'>Add New Post</button>
                      </div>
                    </div>
                  </div>

                  <div class="section-head3 border" v-for='(article, i) in getArticle' :key='i'>
                    <div class="cardd">
                      <div class='card-texts col-8'>
                        <div id='titledesc'>
                          <p id='titlee'> {{ article.title }} </p>
                        </div>
                        <div id='trigbtn'>
                        </div>
                        <div id='tagss'>
                          <div>
                            <ul>
                              <li v-for='(tag, i) in article.tags' :key='i'>  <b-badge href="#" class='taggs' @click='searchTag(tag)'>{{ tag }}</b-badge> &nbsp; </li>
                            </ul>
                          </div>
                          <div class='btntgls'>
                              <button class="btn btn-outline-primary" disabled><v-icon class='ticon' name='thumbs-up'></v-icon> {{ article.Likes.length }}</button>
                            <div v-if='open && target == article._id' :style='tran'>
                              <button class="btn btn-outline-info"><v-icon class='ticon' name='edit'></v-icon>Edit</button>
                              <button class="btn btn-outline-danger" @click='deleteArticle(article._id)'><v-icon class='ticon' name='trash-2'></v-icon>Delete</button>
                            </div>
                            <button class="btn btn-outline-danger" @click='toggle(article._id)'><v-icon class='ticon' name='skip-back'></v-icon></button>
                          </div>
                        </div>
                      </div>
                      <div class='card-imgs col-4'>
                        <img :src='article.featured_image' style='width:320px'>
                      </div>
                    </div>
                  </div>

                </div>


                <!-- Reader Page -->

                <div class="dashHead" v-else-if='name == "public"'>
                  <ReaderPage 
                    @change-page='sendPage'
                  />
                </div>


                <!-- Global User -->

                <div class="dashHead" v-else-if='name == "globalUser"'>
                  <GlobalUser />
                </div>


                <!-- Tags Page -->

                <div class="dashHead" v-else-if='name == "tags"'>
                  <Tag :get-tag='searchTagName' @change-page='sendPage'/>
                </div>


                <!-- Profile Page -->

                <div class='dashHead' v-else-if='name == "profile"'>
                  <Profile :get-user='getUser' />
                </div>

            </div>
        </div>
        </div>
      </div>

      <div class="footerr">
        <p>Powered by <v-icon name='copy' class='iconcop'></v-icon> <span>DreamCar Official</span></p>
      </div>
  </div>
</div>
</template>

<script>
import Loading from '../components/Loading'
import DashBoardLeft from '../components/DashBoardLeft'
import Chat from '../components/RoomChat'
import ReaderPage from '../components/ReaderPage'
import Profile from '../components/Profile'
import GlobalUser from '../components/GlobalUser'
import Tag from '../components/Tag'
import swal from 'sweetalert2'
import axios from 'axios'
import NavBarLogin from '../components/NavBarLogin'
import io from 'socket.io-client'

export default {
  data () {
    return  {
      userr: null,
      articlee: [],
      open: false,
      isloader: false,
      target: null,
      name: null,
      searchTagName: null,
      tran: null,
      socket: io.connect('http://localhost:3000')
    }
  },
  components: {
    Loading,
    Profile,
    DashBoardLeft,
    ReaderPage,
    Tag,
    Chat,
    NavBarLogin,
    GlobalUser
  },
  props: ['getUser', 'getArticle', 'isloading', 'notif', 'promiseArticle'],
  methods: {
    searchTag (name) {
      this.searchTagName = name
      this.name = 'tags'
    },
    changeResponse (name) {
      this.name = name
    },
    gotoPage (name) {
      this.$emit('change-page', name)
    },
    sendPage (name) {
      this.name = name
    },
    sendPageToParent (name) {
      this.$emit('change-page', name)
    },
    toggle(id) {
      this.target = id
      this.open = !this.open;
      this.tran = 'transition: .20s all ease;'
    },
    fetchingData () {
      this.isloader = true
      if(this.userr == null) {
        setTimeout(() => {
          this.userr = this.getUser;
          this.articlee = this.getArticle;
          this.isloader = false
        }, 600);
      } else {
        this.userr = this.getUser;
        this.articlee = this.getArticle;
        this.isloader = false
      }
    },
    deleteArticle (id) {
      this.$awn.asyncBlock(
        this.deleting(id),
        'Deleting success',
        'error',
        'Loading'
      )
    },
    deleting (id) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'delete',
          url: `http://localhost:3000/articles/${id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.$emit('delete-article')
          resolve()
        })
        .catch(err => {
          reject(err.response.data.msg)
        })
      })
    }
  },
  watch: {
    getArticle: {
      handler(val) {
        this.articlee = val
      },
      data: true
    }
  },
  created () {
    this.fetchingData()
    this.name = 'mySite'
  }
}
</script>

<style lang='scss'>
.btntgls {
  display: flex
}
.ticon{
  width: 25px
}
#tagss {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}
.taggs {
  background-color: #3578E5 !important;
  font-size: 15px !important;
}
.taggs:hover {
  background-color: rgb(79, 132, 216) !important;
}
#titlee{
  font-size: 35px;
}
.cardd{
  display: flex;
  flex-direction: row;
  justify-content: space-between
}
.card-texts {
  display: flex;
  flex-direction: column;
  justify-content:space-between;
}
.btnps {
  font-size: 20px;
}
.ps {
  font-size: 20px;
  color: grey;
}
.btnpost {
  background-color: #AB225A !important;
}
.btnpost:hover{
  background-color: rgb(204, 42, 109) !important;
  color: white !important;
}
.poss {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.section-head {
  background-color: #FFFFFF;
}
.section-head2 {
  margin-top: 10px;
  background-color: #FFFFFF;
  padding: 20px
}
.section-head3 {
  overflow: auto;
  margin-top: 0px;
  background-color: #FFFFFF;
  padding: 20px
}
li {
  display: inline-block;
  font-size: 25px;
  margin-top: 20px;
  margin-left: -10px
}
#conBody {
  display: flex;
  height: 84vh;
  flex-direction: column;
  justify-content: space-between;
}
#dashBoard {
  background-color: #F6F7F7
}
#colaps a {
  color: inherit;
  text-decoration: none;
}
.portIn:hover {
  background-color: khaki;
}
.dashHead {
  background-color: #F6F7F7;
}
.menu-need-hover {
  display: flex;
  align-items: center;
  height: 50px;
}
#cicle {
  font-size: 15px;
  border: 1px solid;
  border-radius: 50px;
  padding: 5px;
}
.menu-need-hover:hover{
  background-color:khaki;
  cursor: pointer;
}
.menu-need-hover a{
  color: inherit;
  text-decoration: none;
}
.menu-need-hover a:hover{
  text-decoration: none;
  cursor: pointer;
}
.ipor {
  width: 20px
}
#portFolio {
  cursor: pointer;
}
.left-menus{
  font-size: 35px;
}
.footerr{
  text-align: center;
  margin-top: 15px;
  font-size: 40px;
  background-color: transparent
}
.leftDash {
  padding: 20px;
  background-color: #FFFFFF;
}
.rightDash {
  padding: 20px;
  overflow: auto
}
img{ 
  width:1500px;
}
.bodyDash{
  height: 87.2vh;
  display: flex;
  flex-direction: row;
}

#loading{ 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh
}
</style>