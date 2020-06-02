<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">番茄鐘</router-link>|
      <router-link to="/list">待辦清單</router-link>|
      <router-link to="/settings">鈴聲設定</router-link>|
      <router-link to="/finish">今日完成</router-link>
    </div>
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
  </div>
</template>
