<script setup>
import { ArrowPathIcon, UserPlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import userAPI from '../api/user';
import { ref, onMounted } from "vue";
import timeFormatted from '../tools/timeFormatted';
import UserManagerYesOrNo from '../components/UserManagerYesOrNo.vue';
import { useToast } from "vue-toastification";
import avatarAPI from "../api/avatar";

onMounted(() => {
    fetchData();
    getPageMaxCount();
    getAvatar();
})

const users = ref([])
const imgs = ref([])
const loading = ref(true)
const isEditOpen = ref(false)
const isCreateOpen = ref(false)
const currentName = ref("")
const currentEmail = ref("")
const currentPassword = ref("")
const pageCount = ref(1)
const pageMaxCount = ref(0)
const toast = useToast()

async function getPageMaxCount() {
    const maxCount = await userAPI.getPageMaxCount()
    pageMaxCount.value = maxCount;
}

async function fetchData(pageCount = 1) {
    await getPageMaxCount();

    loading.value = true;
    const result = await userAPI.getUsers(pageCount);
    if (result.status === 200) {
        users.value = result.data;
        loading.value = false;
        console.log(users.value);
    }
}

async function fetchNextData() {
    if (!openCheck()) return;
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
    const result = await userAPI.getUsers(pageCount.value)
    if (result.status === 200) {
        users.value = result.data;
        loading.value = false;
        console.log(users.value);
    }
}

async function fetchBackData() {
    if (!openCheck()) return;
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
    const result = await userAPI.getUsers(pageCount.value)
    if (result.status === 200) {
        users.value = result.data;
        loading.value = false;
        console.log(users.value);
    }
}

async function fetchEndData() {
    if (!openCheck()) return;
    await getPageMaxCount();
    loading.value = true;
    pageCount.value = pageMaxCount.value
    const result = await userAPI.getUsers(pageCount.value)
    if (result.status === 200) {
        users.value = result.data;
        loading.value = false;
        console.log(users.value);
    }
}

async function getAvatar() {
    const result = await avatarAPI.getCats(100);
    imgs.value = result.data
}

function validCurrentData() {
    let can = true;

    if (currentName.value.trim() === "") {
        can = false;
    }
    if (currentEmail.value.trim() === "") {
        can = false;
    }
    if (currentPassword.value.trim() === "") {
        can = false;
    }

    return can;
}

async function hisEmail() {
    const result = await userAPI.getAllUsers()
    const emailList = result.data.map(user => user.email);
    return emailList.includes(currentEmail.value)
}

function clearCurrent() {
    currentName.value = ""
    currentEmail.value = ""
    currentPassword.value = ""
}

function openCheck() {
    if (isEditOpen.value || isCreateOpen.value) {
        toast.error("请编辑完当前用户后,再进行操作!", {
            position: "top-center",
            timeout: 3500,
            // 根据该id来决定toast的身份
            id: "edit"
        });
        return false;
    }
    return true;
}

function openCreate() {
    if (!openCheck()) return;
    users.value.push({
        name: "",
        email: "",
        password: "",
        edit: true,
    })
    loading.value = false;
    isCreateOpen.value = true;
    isEditOpen.value = true;
}

function closeCreate() {
    loading.value = true;
    fetchData();
    isCreateOpen.value = false;
    isEditOpen.value = false;
}

async function createUser() {
    if (!validCurrentData()) {
        toast.error("请填写完整 再创建用户!", {
            position: "top-center",
            timeout: 3500,
            // 根据该id来决定toast的身份
            id: "请填写完整 再创建用户!"
        });
        return;
    }

    if (await hisEmail()) {
        toast.error("该邮箱已使用 请修改后重试!", {
            position: "top-center",
            timeout: 3500,
            // 根据该id来决定toast的身份
            id: "该邮箱已使用 请修改后重试!"
        });
        return;
    }

    await userAPI.createUser({
        name: currentName.value,
        email: currentEmail.value,
        password: currentPassword.value
    })

    toast.success("创建成功", {
        position: "top-center",
        timeout: 2000,
        hideProgressBar: true,
        // 根据该id来决定toast的身份
        id: "创建成功"
    });

    closeCreate();
    clearCurrent()
    fetchEndData()
}

function deleteUser(id) {
    toast.error({
        component: UserManagerYesOrNo,
        listeners: {
            clickYse: async function () {
                await userAPI.deleteUser(id);
                if (users.value.length === 1) {
                    if (pageCount.value > 1) {
                        pageCount.value -= 1;
                    }
                }
                fetchData(pageCount.value);
                toast.dismiss("deleteUser")
                toast.success("删除成功", {
                    position: "top-center",
                    timeout: 2000,
                    hideProgressBar: true,
                    // 根据该id来决定toast的身份
                    id: "删除成功"
                });
            },
            clickNo: function () {
                toast.dismiss("deleteUser")
            }
        }
    }, {
        position: "bottom-center",
        closeOnClick: false,
        timeout: false,
        // 根据该id来决定toast的身份
        id: "deleteUser"
    });
}

function openEdit(id) {
    if (!openCheck()) return;

    const index = users.value.findIndex(u => u._id == id);
    users.value[index].edit = true;
    isEditOpen.value = true;

    currentName.value = users.value[index].name;
    currentEmail.value = users.value[index].email;
    currentPassword.value = users.value[index].password;
}


function closeEdit(id) {
    const index = users.value.findIndex(u => u._id == id);
    users.value[index].edit = false;
    isEditOpen.value = false;
}

async function updateUser(id) {
    const result = await userAPI.updateUser(id, {
        name: currentName.value,
        email: currentEmail.value,
        password: currentPassword.value
    });

    if (result.data != null || result.data != undefined) {
        toast.success("修改成功", {
            position: "top-center",
            timeout: 2000,
            hideProgressBar: true,
            // 根据该id来决定toast的身份
            id: "deleteUser"
        });
    }

    closeEdit(id)
    fetchData()
}

</script>

<template>
    <div>
        <div v-if="loading.value" class="flex space-x-2 justify-center">
            加载中请稍后......
        </div>
        <div v-else-if="!users.length" class="flex space-x-2 justify-center">
            <div class="flex justify-center items-center space-x-1">
                <span class="text-xl mr-2">数据库内没有任何用户 请先添加用户后刷新列表... </span>
                <button class="btn btn-ghost space-x-2" @click="openCreate()">
                    <UserPlusIcon class="w-7 h-7" />
                    <div>添加用户</div>
                </button>
                <button class="btn btn-ghost" @click="fetchData()">
                    <ArrowPathIcon class="w-7 h-7" />
                    <div>刷新列表</div>
                </button>
            </div>
        </div>
        <div v-else class="flex flex-col h-[80vh] space-y-8 justify-center items-center xl:mr-40">
            <div class=" space-x-4">
                <button class="btn btn-ghost space-x-2" @click="openCreate()">
                    <UserPlusIcon class="w-7 h-7" />
                    <div>添加用户</div>
                </button>
                <button class="btn btn-ghost" @click="fetchData()">
                    <ArrowPathIcon class="w-7 h-7" />
                    <div>刷新列表</div>
                </button>
            </div>
            <div class="space-x-2 flex flex-row justify-center ">
                <div class="overflow-x-auto flex lg:justify-center">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>用户名称</th>
                                <th>电子邮箱</th>
                                <th>用户密码</th>
                                <th v-if="!isCreateOpen.value">创建日期</th>
                                <th>操作按钮</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user._id">
                                <td>
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">
                                            <div class="mask mask-circle w-12 h-12">
                                                <img :src="imgs[index].url" alt="加载失败" />
                                            </div>
                                        </div>
                                        <!-- name -->
                                        <div v-if="user.edit">
                                            <input type="text" name="name" v-model="currentName"
                                                class="font-bold text-sm input input-bordered input-sm w-full max-w-xs" />
                                        </div>
                                        <div v-else>
                                            <div class="font-bold">{{ user.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <!-- email -->
                                <td v-if="user.edit">
                                    <input type="text" name="email" v-model="currentEmail"
                                        class="font-bold text-sm input input-bordered input-sm w-full max-w-xs" />
                                </td>
                                <td v-else>
                                    {{ user.email }}
                                </td>
                                <!-- password -->
                                <td v-if="user.edit">
                                    <input type="text" name="password" v-model="currentPassword"
                                        class="font-bold text-sm input input-bordered input-sm w-full max-w-xs" />
                                </td>
                                <td v-else>
                                    {{ user.password }}
                                </td>
                                <!-- createdAt -->
                                <td v-if="user.createdAt">
                                    {{ timeFormatted(user.createdAt) }}
                                </td>
                                <td v-else>
                                    待创建...
                                </td>
                                <th class="space-x-2">
                                    <button v-if="!user.edit" class="btn btn-primary btn-sm"
                                        @click="openEdit(user._id)">编辑用户</button>
                                    <button v-if="!user.edit" class="btn btn-error btn-sm"
                                        @click="() => { if (!openCheck()) return; deleteUser(user._id) }">删除用户</button>
                                    <button v-if="user.edit" class="btn btn-success btn-sm"
                                        @click="isCreateOpen ? createUser() : updateUser(user._id)">{{ isCreateOpen ?
                                            "创建用户" : "保存数据" }}</button>
                                    <button v-if="user.edit" class="btn btn-primary btn-sm"
                                        @click="isCreateOpen ? closeCreate() : closeEdit(user._id)">{{ isCreateOpen ? "取消创建"
                                            :
                                            "取消编辑" }}</button>
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
</template>