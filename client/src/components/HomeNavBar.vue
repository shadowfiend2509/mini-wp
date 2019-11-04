<template>
  <div>
  <b-navbar toggleable="lg" type="dark" id='NavBar'>
    <div class="dcpress">
      <h2 id="idText">DcWordPress</h2>
    </div>
    <div class='backHome'>
      <button class='btn btn-outline-info btn-sm'><h2>Back</h2></button>
    </div>
  </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.ihome{
  width: 35px;
  margin-left: 10px;
}
button{
  height: 50px;
  width: 125px
}
.backHome {
  margin-right: 20px
}
#Home{
  margin-left: 5px
}
.iplus{
  width: 35px;
}
#idText{
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 50px;
}
.dcpress{
  margin-left: 20px;
}
#NavBar {
  background-color:#0087BE; 
  display: flex;
  justify-content: space-between;
}
</style>