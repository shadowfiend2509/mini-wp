<template>
  <div class="containerr">
    <div class="mainCont">
      <div class="row btn2F">
        <div class="col-6 buttonFol">
          <div class="followers">
            <a>{{ getUser.Followers.length }} &nbsp; Followers</a>
          </div>
        </div>
        <div class="col-6 buttonFol">
          <div class="following">
            <a>{{ getUser.Following.length }} &nbsp; Following</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['getUser']
}
</script>

<style>
.btn2F button {
  border-radius: 10px;
}
.buttonFol:hover {
  background-color: rgb(147, 213, 240)
}
.buttonFol {
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: center;
  font-size: 40px;
  background-color:rgb(50, 179, 230);
}
.containerr {
  margin-top: 20px;
}
</style>