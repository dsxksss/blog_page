<script setup>
import menuItems from "../data/menuItems"
import { ref, inject } from "vue";
let items = ref(menuItems);
const nowPage = inject('nowPage')

function changePage(pageIndex) {
    items.value.forEach(item => item.isActive = item.index === pageIndex);
    nowPage.value = pageIndex;
}

</script>

<template>
    <ul class="menu menu-horizontal  flex rounded-box p-2 space-x-4">
        <li v-for="item in items" :key="item.index">
            <a :class="item.isActive ? 'border-b-4 border-black' : null" @click="changePage(item.index)">
                <component :is="item.component" :class="`w-6 h-6 ${item.iconColor}`"></component>
                <span>{{ item.title }}</span>
            </a>
        </li>
    </ul>
</template>