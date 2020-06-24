<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><font-awesome-icon size='lg' :icon="['fas','clock']"></font-awesome-icon></router-link>
      <router-link to="/list"><font-awesome-icon size='lg' :icon="['fas','clipboard-list']"></font-awesome-icon></router-link>
      <router-link to="/settings"><font-awesome-icon size='lg' :icon="['fas','music']"></font-awesome-icon></router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
