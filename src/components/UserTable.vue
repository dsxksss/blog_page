<script setup>
import userAPI from '../api/user';
import { ref, onMounted } from "vue";

let users = ref([])

async function fetchData() {
    const result = await userAPI.getAllUsers();
    users.value = result.data;
    console.log(users.value);
}

onMounted(() => {
    fetchData();
})
</script>

<template>
    <!-- TODO 实现无用户时页面显示部分 -->
    <div :hidden="users.value" class="flex justify-start lg:justify-center text-red-500">
        您的数据库内没有任何用户信息
    </div>
    <div :hidden="!users.value" v-if="users.value" class="overflow-x-auto flex justify-start lg:justify-center">
        <table class="table">
            <!-- head -->
            <thead >
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
                                <div class="font-bold">{{user.name}}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        {{ user.email }}
                    </td>
                    <td>
                        {{ user.createAt }}
                    </td>
                    
                    <th class="space-x-2">
                        <button class="btn btn-primary">编辑用户</button>
                        <button class="btn btn-error">删除用户</button>
                    </th>

                </tr>

            </tbody>
            <!-- foot -->
            <tfoot>
                <tr>
                    <th>用户名称</th>
                    <th>电子邮箱</th>
                    <th>创建日期</th>
                </tr>
            </tfoot>
        </table>
    </div>
</template>