<script setup>
import { ref, onMounted } from "vue";
import { ArrowPathIcon } from '@heroicons/vue/24/solid';
import BlogDialogView from "../components/BlogDialogView.vue";
import blogAPI from "../api/blog";
import avatarAPI from "../api/avatar";

async function getAvatar() {
    const result = await avatarAPI.getCats(50);
    imgs.value = result.data
}

onMounted(() => {
    fetchData();
    getAvatar();
})

const blogs = ref([])
const imgs = ref([])
const loading = ref(true)

async function fetchData() {
    loading.value = true;

    const result = await blogAPI.getAllBlogs();
    if (result.status === 200) {
        blogs.value = result.data;
        loading.value = false;
        console.log(blogs.value);
    }
}


</script>

<template>
    <div v-if="loading.value" class="flex space-x-2 justify-center">
        加载中请稍后......
    </div>
    <div v-else-if="!blogs.length" class="flex space-x-2 justify-center">
        <div class="flex justify-center items-center space-x-1">
            <span class="text-xl mr-2">数据库内没有任何博客 请先添加博客后刷新列表... </span>

            <CreateBlogDialog @createSuccess="() => fetchEndData()" />

            <button class="btn btn-ghost" @click="fetchData()">
                <ArrowPathIcon class="w-7 h-7" />
                <div>刷新列表</div>
            </button>
        </div>
    </div>
    <div v-else class=" space-y-6 flex flex-col justify-center">
        <button class="mx-20 btn btn-ghost" @click="fetchData()">
            <ArrowPathIcon class="w-7 h-7" />
            <div>刷新列表</div>
        </button>
        <BlogDialogView v-for="(blog, index) in blogs" :title="blog.title" :content="blog.content"
            :authorName="blog.author.name" :createdAt="blog.createdAt" :img="imgs[index].url">
        </BlogDialogView>
    </div>
</template>