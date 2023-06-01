<script setup>
import userAPI from '../api/user';
let users = []
async function getData() {
    users = await userAPI.getAllUsers();
    console.log(users.data);
}

getData()
</script>

<template>
    <div class="overflow-x-auto">

        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                    </th>
                    <th>用户名称</th>
                    <th>电子邮箱</th>
                    <th>密码</th>
                    <th>创建日期</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                    </th>
                    <td>
                        <div class="flex items-center space-x-3">
                            <div class="avatar">
                                <div class="mask mask-circle w-12 h-12">
                                    <img src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                                        alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">Hart Hagerty</div>
                                <div class="text-sm opacity-50">United States</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        Zemlak, Daniel and Leannon
                        <br />
                        <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
                    </td>
                    <td>Purple</td>
                    <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                    </th>
                </tr>
            </tbody>
            <!-- foot -->
            <tfoot>
                <tr>
                    <th></th>
                    <th>用户名称</th>
                    <th>电子邮箱</th>
                    <th>密码</th>
                    <th>创建日期</th>
                </tr>
            </tfoot>

        </table>


    </div>
</template>