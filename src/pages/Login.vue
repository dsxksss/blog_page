<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast()
const name = ref("admin");
const password = ref("");

const handleSubmit = () => {
    if (name.value != "" && password.value != "") {
        if (name.value == "admin" && password.value == "123456") {
            localStorage.setItem("isLogin", "true");
            toast.success("登录成功", {
                position: "top-center",
                timeout: 3500,
                hideProgressBar: true,
                // 根据该id来决定toast的身份
                id: "账号或密码错误"
            });
            router.push("/");
        } else {
            toast.error("账号或密码错误", {
                position: "top-right",
                timeout: 3500,
                // 根据该id来决定toast的身份
                id: "账号或密码错误"
            });
        }
    }
}

</script>

<template>
    <center>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
            <p class="text-[2rem] pt-5">博客管理系统</p>
            <form @submit.prevent="handleSubmit" class="card-body">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">用户名</span>
                    </label>
                    <input v-model="name" type="text" placeholder="请填写用户名" class="input input-bordered" required />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">密码</span>
                    </label>
                    <input v-model="password" type="password" placeholder="请填写密码" class="input input-bordered" required />
                </div>
                <div class="form-control mt-6">
                    <button type="submit" class="btn btn-success text-xl">登 录</button>
                </div>
            </form>
        </div>
    </center>
</template>