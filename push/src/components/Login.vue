<template>
  <div class="w-full mt-24 h-64 bg-yellow flex flex-col items-center">
    <div class="mt-11 text-xl">Welcome back to</div>
    <div class="push-font text-3xl mt-1">Push</div>
    <div class="mt-4 flex flex-row items-center">
      <div class="mr-4">Username</div>
      <input/>
    </div>
    <div class="mt-4 flex flex-row items-center">
      <div class="mr-4">Password</div>
      <input type="password"/>
    </div>
    <router-link class="self-end mr-4 mt-3 button" to="/home">Login</router-link>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
