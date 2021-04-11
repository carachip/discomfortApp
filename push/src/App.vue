<template>
  <div id="app" class="bg-blue h-full">
    <router-view class="flex" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.push-font {
  font-family: 'Satisfy', cusive;
}

.blue {
  color: #4c736e;
}
.bg-blue {
  background-color: #4c736e;
}
.border-blue {
  border-color: #4c736e;
}
.yellow {
  color: #d9b459;
}
.bg-yellow {
  background-color: #d9b459;
}
.blue-light {
  color: #c4c2b3;
}
.bg-blue-light {
  background-color: #c4c2b3;
}
.gray {
  color: #e7e7e7ab;
}
.bg-gray {
  background-color: #e7e7e7ab;
}
.button {
  padding-right: 1rem;
  padding-left: 1rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
  border-radius: 1.5rem;
  background-color: #c4c2b3;
  cursor: pointer;
}
input {
  padding-left: .5rem;
}
</style>
