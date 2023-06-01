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

let users = ref([])
let loading = ref(true)
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
            clickYse: async function (){
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
        id:"deleteUser"
    });

}

</script>

<template>
    <div v-if="loading.value" class="flex space-x-2 justify-center">
        加载中请稍后......
    </div>

    <div v-else-if="!users.length" class="flex space-x-2 justify-center">
        <div>数据库内没有任何用户,请先添加用户重试</div>
        <button class="btn btn-ghost btn-circle" @click="fetchData()">
            <ArrowPathIcon class="w-7 h-7" />
        </button>
    </div>

    <div v-else class="space-x-2 flex flex-row justify-center">
        <div class="overflow-x-auto flex lg:justify-center mt-20">
            <table class="table">
                <thead>
                    <tr>
                        <th>用户名称</th>
                        <th>电子邮箱</th>
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
                                <div>
                                    <div class="font-bold">{{ user.name }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {{ user.email }}
                        </td>
                        <td>
                            {{ timeFormatted(user.createdAt) }}
                        </td>
                        <th class="space-x-2">
                            <button class="btn btn-primary btn-sm">编辑用户</button>
                            <button class="btn btn-error btn-sm" @click="deleteUser(user._id)">删除用户</button>
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