<script setup>
import "./index.css";
import NavBar from './components/NavBar.vue';
import PageContent from "./components/PageContent.vue"
import { ref, provide } from "vue";

const nowPage = ref(0);
provide("nowPage", nowPage);
</script>


<template>
  <main class="w-screen overflow-hidden rounded-box">
    <!-- 导航栏 -->
    <NavBar class="z-10 fixed px-10 border-b-slate-700 border-b-[1px]"></NavBar>
    <!-- 页面容器 -->
    <PageContent class="my-10 mt-24 overflow-scroll"></PageContent>
  </main>
</template>