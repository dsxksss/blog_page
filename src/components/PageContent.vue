<script setup>
import Home from "../pages/Home.vue"
import BlogManager from '../pages/BlogManager.vue';
import UserManager from "../pages/UserManager.vue";
import {inject} from "vue"

const pages = [
    Home,
    UserManager,
    BlogManager,
];

</script>

<template>
    <KeepAlive>
        <component :is="pages[inject('nowPage').value]" />
    </KeepAlive>
</template>