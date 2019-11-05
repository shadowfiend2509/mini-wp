<template>
<div id='dashboard'>
  <div class="container-fluid">
    <div class="bodyDash">

      <div class="leftDash col-2">
        <h5 class="left-menus">Manage</h5>
        <hr>
          <div id="sub-menu">
              <ul class="menu-need-hover">
                  <a href="http://reilvrein.wordpress.com" target="_">
                      <i class="submenu-logo fas fa-file-alt"></i> &nbsp;Site Pages
                  </a>
              </ul>
              <ul class="menu-need-hover">
                  <i class="submenu-logo far fa-clipboard"></i> &nbsp; Blog Post
              </ul>
              <ul class="menu-need-hover">
                  <i class="submenu-logo fas fa-photo-video"></i> &nbsp; Media
              </ul>
              <ul class="menu-need-hover">
                  <i class="submenu-logo far fa-comments"></i> &nbsp; Comments
              </ul>
              <ul class="menu-need-hover">
                  <i class="submenu-logo fas fa-comment-alt"></i> &nbsp; Feedback
              </ul>
              <ul class="menu-need-hover">
                  <i class="submenu-logo fas fa-scroll"></i> &nbsp; Testimonials
              </ul>
              <ul class="menu-need-hover" v-b-toggle.collapse-a.collapse-b>
                  <v-icon class='ipor' name='award'></v-icon> &nbsp; <a id='portFolio'>Portofolio</a>

                  <!-- Elements to collapse -->
              </ul>
              <div id="colaps">
                <b-collapse id="collapse-a" class="mt-2">
                  <a href='http://started.dreamcarofficial.com' target="_"><b-card class='portIn'>E-Commerce</b-card></a>
                </b-collapse>
                <b-collapse id="collapse-b" class="mt-2">
                  <a href='http://todo.dreamcarofficial.com' target="_"><b-card class='portIn'>Fancy-Todo</b-card></a>                  
                </b-collapse>
                <b-collapse id="collapse-b" class="mt-2">
                  <a href='http://dcoverflow.dreamcarofficial.com.s3-website-ap-southeast-1.amazonaws.com/' target="_"><b-card class='portIn'>Dc-OverFlow</b-card></a>                  
                </b-collapse>
                <b-collapse id="collapse-b" class="mt-2">
                  <a href='https://kamvan-d66ed.firebaseapp.com/' target="_"><b-card class='portIn'>Dc-Kamban</b-card></a>                  
                </b-collapse>
              </div>
          </div>
      </div>

      
      <div class="rightDash col-10">
          <div class="container" id='conBody'>


              <div class="dashHead">
                
                <div class="section-head border">
                  <ul>
                    <li>Published <a id='cicle'>{{ articlee.length }}</a></li>
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

                <div class="section-head3 border" v-for='(article, i) in articlee' :key='i'>
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
                            <li>  <b-badge href="#" class='taggs'>Tags</b-badge> &nbsp; </li>
                            <li>  <b-badge href="#" class='taggs'>Tags</b-badge> &nbsp; </li>
                            <li>  <b-badge href="#" class='taggs'>Tags</b-badge> &nbsp; </li>
                            <li>  <b-badge href="#" class='taggs'>Tags</b-badge> &nbsp; </li>
                            <li>  <b-badge href="#" class='taggs'>Tags</b-badge> </li>
                          </ul>
                        </div>
                        <div class='btntgls'>
                            <button class="btn btn-outline-primary" disabled><v-icon class='ticon' name='thumbs-up'></v-icon> {{ article.Likes.length }}</button>
                          <div v-if='open && target == article._id'>
                            <button class="btn btn-outline-info"><v-icon class='ticon' name='edit'></v-icon>Edit</button>
                            <button class="btn btn-outline-danger"><v-icon class='ticon' name='trash-2'></v-icon>Delete</button>
                          </div>
                          <button class="btn btn-outline-danger" @click='toggle(article._id)'><v-icon class='ticon' name='skip-back'></v-icon></button>
                          <VueSlideToggle 
                            :open='open'
                            tag='section'
                            />
                        </div>
                      </div>
                    </div>
                    <div class='card-imgs col-4'>
                      <img :src='article.featured_image' style='width:320px'>
                    </div>
                  </div>
                </div>

              </div>




              <div class="dashFoot border">
              </div>


          </div>
      </div>
      </div>
    </div>

    <div class="footerr">
      <p>Powered by <v-icon name='copy' class='iconcop'></v-icon> <span>DreamCar Official</span></p>
    </div>
</div>
</template>

<script>
import VueSlideToggle from 'vue-slide-toggle'
import swal from 'sweetalert2'

export default {
  data () {
    return  {
      userr: null,
      articlee: [],
      open: false,
      target: null
    }
  },
  components: {
    VueSlideToggle
  },
  props: ['getUser', 'getArticle'],
  methods: {
    toggle(id) {
      this.target = id
      this.open = !this.open;
    }
  },
  created () {
    if(this.userr == null) {
      setTimeout(() => {
        this.userr = this.getUser;
        this.articlee = this.getArticle;
      }, 600);
    } else {
      this.userr = this.getUser;
      this.articlee = this.getArticle;
    }
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
  height: 86vh;
  flex-direction: column;
  justify-content: space-between;
}
#dashBoard {
  background-color: #F6F7F7;
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
  padding: 20px
}
img{ 
  width:1500px;
}
.bodyDash{
  height: 88.5vh;
  display: flex;
  flex-direction: row;
}

</style>