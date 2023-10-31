<script setup>
import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { ref, onMounted } from "vue";
import userAPI from "../api/user";
import blogAPI from "../api/blog";
import timeFormatted from '../tools/timeFormatted';
import BlogManagerYesOrNo from '../components/BlogManagerYesOrNo.vue';
import { useToast } from "vue-toastification";
import CreateBlogDialog from '../components/CreateBlogDialog.vue';
import UpdateBlogDialog from '../components/UpdateBlogDialog.vue';

const users = ref([])
const blogs = ref([])
const loading = ref(true)
const isCreateOpen = ref(false)
const currentName = ref("")
const currentEmail = ref("")
const currentPassword = ref("")
const pageCount = ref(1)
const pageMaxCount = ref(0)
const toast = useToast()

onMounted(() => {
    getAllUsers();
    fetchData();
    getPageMaxCount();
})


async function getAllUsers() {
    const result = await userAPI.getUsers();
    if (result.status === 200) {
        users.value = result.data;
    }
}

async function getPageMaxCount() {
    const maxCount = await blogAPI.getPageMaxCount()
    pageMaxCount.value = maxCount;
}

async function fetchData(pageCount = 1) {
    await getPageMaxCount();

    loading.value = true;
    const result = await blogAPI.getBlogs(pageCount);
    if (result.status === 200) {
        blogs.value = result.data;
        loading.value = false;
        console.log(blogs.value);
    }
}

async function fetchNextData() {
    await getPageMaxCount();
    if (pageCount.value >= pageMaxCount.value) {
        toast.error("这已经是最后一页了", {
            position: "top-right",
            timeout: 3500,
            // 根据该id来决定toast的身份
            id: "这已经是最后一页了"
        });
        return;
    }

    loading.value = true;
    pageCount.value += 1;
    const result = await blogAPI.getBlogs(pageCount.value)
    if (result.status === 200) {
        blogs.value = result.data;
        loading.value = false;
        console.log(blogs.value);
    }
}

async function fetchBackData() {
    await getPageMaxCount();

    if (pageCount.value <= 1) {
        toast.error("这已经是第一页了", {
            position: "top-right",
            timeout: 3500,
            // 根据该id来决定toast的身份
            id: "这已经是第一页了"
        });
        return;
    }

    loading.value = true;
    pageCount.value -= 1;
    const result = await blogAPI.getBlogs(pageCount.value)
    if (result.status === 200) {
        blogs.value = result.data;
        loading.value = false;
        console.log(blogs.value);
    }
}

async function fetchEndData() {
    await getPageMaxCount();
    loading.value = true;
    pageCount.value = pageMaxCount.value
    const result = await blogAPI.getBlogs(pageCount.value)
    if (result.status === 200) {
        blogs.value = result.data;
        loading.value = false;
        console.log(blogs.value);
    }
}

function deleteBlog(id) {
    toast.error({
        component: BlogManagerYesOrNo,
        listeners: {
            clickYse: async function () {
                await blogAPI.deleteBlog(id);
                if (blogs.value.length === 1) {
                    if (pageCount.value > 1) {
                        pageCount.value -= 1;
                    }
                }
                fetchData(pageCount.value);
                toast.dismiss("deleteBlog")
                toast.success("删除成功", {
                    position: "top-center",
                    timeout: 2000,
                    hideProgressBar: true,
                    // 根据该id来决定toast的身份
                    id: "删除成功"
                });
            },
            clickNo: function () {
                toast.dismiss("deleteBlog")
            }
        }
    }, {
        position: "bottom-center",
        closeOnClick: false,
        timeout: false,
        // 根据该id来决定toast的身份
        id: "deleteBlog"
    });
}
</script>

<template>
    <div>
        <div>
            <div v-if="loading.value" class="flex space-x-2 justify-center">
                加载中请稍后......
            </div>
            <div v-else-if="!blogs.length" class="flex space-x-2 justify-center">
                <div class="flex justify-center items-center space-x-1">
                    <span class="text-xl mr-2">数据库内没有任何博客 请先添加博客后刷新列表... </span>

                    <CreateBlogDialog @createSuccess="() => fetchEndData()" />

                    <button class="btn btn-ghost" @click="fetchData(pageCount)">
                        <ArrowPathIcon class="w-7 h-7" />
                        <div>刷新列表</div>
                    </button>
                </div>
            </div>
            <div v-else class="flex flex-col h-[80vh] space-y-8 justify-center items-center">
                <div class=" space-x-4 flex flex-row">
                    <CreateBlogDialog @createSuccess="() => fetchEndData()" />
                    <button class="btn btn-ghost space-x-2" @click="fetchData(pageCount)">
                        <ArrowPathIcon class="w-7 h-7" />
                        <div>刷新列表</div>
                    </button>
                </div>
                <div class="space-x-2 flex flex-row justify-center ">
                    <div class="overflow-x-auto flex lg:justify-center">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>博客标题</th>
                                    <th>作者名称</th>
                                    <th>作者邮箱</th>
                                    <th v-if="!isCreateOpen.value">创建日期</th>
                                    <th>操作按钮</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(blog, index) in blogs" :key="blog._id">

                                    <!-- title -->
                                    <td v-if="blog.edit">
                                        <input type="text" name="name" v-model="currentName"
                                            class="font-bold text-sm input input-bordered input-sm w-full max-w-xs" />
                                    </td>
                                    <td v-else>
                                        <div class="font-bold">{{ blog.title }}</div>
                                    </td>

                                    <!-- name -->
                                    <td v-if="blog.edit">
                                        <input type="text" name="email" v-model="currentEmail"
                                            class="font-bold text-sm input input-bordered input-sm w-full max-w-xs" />
                                    </td>
                                    <td v-else>
                                        {{ blog.author.name }}
                                    </td>

                                    <!-- email -->
                                    <td v-if="blog.edit">
                                        <input type="text" name="password" v-model="currentPassword"
                                            class="font-bold text-sm input input-bordered input-sm w-full max-w-xs" />
                                    </td>
                                    <td v-else>
                                        {{ blog.author.email }}
                                    </td>

                                    <!-- createdAt -->
                                    <td v-if="blog.createdAt">
                                        {{ timeFormatted(blog.createdAt) }}
                                    </td>
                                    <td v-else>
                                        待创建...
                                    </td>


                                    <th class="space-x-2">
                                        <UpdateBlogDialog :title="blog.title" :content="blog.content"
                                            :authorName="blog.author.name" :blogId="blog._id"
                                            @updateSuccess="() => fetchEndData()" />

                                        <button v-if="!blog.edit" class="btn btn-error btn-sm"
                                            @click="deleteBlog(blog._id)">删除博客</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="join space-x-4 flex justify-center">
                    <button class="join-item btn" @click="fetchBackData()">
                        <ChevronLeftIcon class="w-6 h-6" />
                    </button>
                    <div class="join-item btn font-bold">{{ `第${pageCount}页` }}</div>
                    <button class="join-item btn" @click="fetchNextData()">
                        <ChevronRightIcon class="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>


    </div>
</template>