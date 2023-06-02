<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/solid';
import userAPI from '../api/user';
import { ref, onMounted } from "vue";
import timeFormatted from '../tools/timeFormatted';
import UserManagerYesOrNo from './UserManagerYesOrNo.vue';
import { useToast } from "vue-toastification";

onMounted(() => {
    fetchData();
})

const users = ref([])
const loading = ref(true)
const isEditOpen = ref(false)
const currentName = ref("")
const currentEmail = ref("")
const currentPassword = ref("")
const toast = useToast()

async function fetchData() {
    loading.value = true;
    const result = await userAPI.getAllUsers();
    if (result.status === 200) {
        users.value = result.data;
        loading.value = false;
        console.log(users.value);
    }
}

function deleteUser(id) {
    toast.error({
        component: UserManagerYesOrNo,
        listeners: {
            clickYse: async function () {
                await userAPI.deleteUser(id);
                fetchData();
                toast.dismiss("deleteUser")
            },
            clickNo: function () {
                toast.dismiss("deleteUser")
            }
        }
    }, {
        position: "bottom-center",
        timeout: false,
        // 根据该id来决定toast的身份
        id: "deleteUser"
    });
}

function openEdit(id) {
    if(isEditOpen.value){
        toast.error("请编辑完当前用户后,再进行操作!", {
            position: "top-center",
            timeout: 3500,
            // 根据该id来决定toast的身份
            id: "edit"
        });
    }else{
        const index = users.value.findIndex(u => u._id == id);
        users.value[index].edit = true;
        isEditOpen.value = true;
        
        currentName.value = users.value[index].name;
        currentEmail.value = users.value[index].email;
        currentPassword.value = users.value[index].password;
    }
}

function closeEdit(id){
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
    <div v-if="loading.value" class="flex space-x-2 justify-center">
        加载中请稍后......
    </div>

    <div v-else-if="!users.length" class="flex space-x-2 justify-center">
        <div class="flex justify-center items-center space-x-4">
            <span class="text-xl">数据库内没有任何用户 请先添加用户后刷新列表...</span>
            <button class="btn btn-ghost btn-circle" @click="fetchData()">
                <ArrowPathIcon class="w-7 h-7" />
            </button>
        </div>
    </div>

    <div v-else class="space-x-2 flex flex-row justify-center">
        <div class="overflow-x-auto flex lg:justify-center mt-20">
            <table class="table">
                <thead>
                    <tr>
                        <th>用户名称</th>
                        <th>电子邮箱</th>
                        <th>用户密码</th>
                        <th>创建日期</th>
                        <th>操作按钮</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user._id">
                        <td>
                            <div class="flex items-center space-x-3">
                                <div class="avatar">
                                    <div class="mask mask-circle w-12 h-12">
                                        <img src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                                            alt="Avatar Tailwind CSS Component" />
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
                        <td>
                            {{ timeFormatted(user.createdAt) }}
                        </td>

                        <th class="space-x-2">
                            <button v-if="!user.edit" class="btn btn-primary btn-sm"
                                @click="openEdit(user._id)">编辑用户</button>
                            <button v-if="!user.edit" class="btn btn-error btn-sm"
                                @click="deleteUser(user._id)">删除用户</button>

                            <button v-if="user.edit" class="btn btn-success btn-sm"
                                @click="updateUser(user._id)">保存数据</button>
                            <button v-if="user.edit" class="btn btn-primary btn-sm"
                                @click="closeEdit(user._id)">取消编辑</button>

                        </th>
                    </tr>
                </tbody>

            </table>
        </div>

        <button class="btn btn-ghost btn-circle" @click="fetchData()">
            <ArrowPathIcon class="w-7 h-7" />
        </button>

    </div>
</template>