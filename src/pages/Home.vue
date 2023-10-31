<script setup>
import { ref, onMounted ,watch} from "vue";
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
const searchText = ref("")
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


function fuzzySearch() {
    if (searchText.value != "") {
        const filteredData = blogs.value.filter(item => {
            const title = item.title.toLowerCase();
            const searchQuery = searchText.value.toLowerCase();
            return title.includes(searchQuery);
        });
        if (filteredData.length > 0) {
            blogs.value = filteredData;
        }
    }else{
        fetchData()
    }
}

watch(searchText,fuzzySearch)

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
        <div class="w-screen flex justify-around items-center">
            <button class="mx-20 btn btn-ghost" @click="fetchData()">
                <ArrowPathIcon class="w-7 h-7" />
                <div>刷新列表</div>
            </button>
            <div class="space-x-4">
                <input v-model="searchText" type="text" class="input input-primary input-sm" placeholder="输入搜索内容">
                <button @click="fuzzySearch" class="btn btn-sm">搜索</button>
            </div>
        </div>

        <BlogDialogView v-for="(blog, index) in blogs" :title="blog.title" :content="blog.content"
            :authorName="blog.author.name" :createdAt="blog.createdAt" :img="imgs[index].url">
        </BlogDialogView>
    </div>
</template>