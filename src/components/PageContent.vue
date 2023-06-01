<script setup>
import Home from "../pages/Home.vue"
import My from "../pages/My.vue";
import BlogManager from '../pages/BlogManager.vue';
import UserManager from "../pages/UserManager.vue";
import {inject} from "vue"

const pages = [
    Home,
    BlogManager,
    UserManager,
    My,
];

</script>

<template>
    <KeepAlive>
        <component :is="pages[inject('nowPage').value]" />
    </KeepAlive>
</template>