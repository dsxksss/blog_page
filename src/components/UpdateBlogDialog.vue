<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useToast } from "vue-toastification";
import blogAPI from '../api/blog';

const props = defineProps({
    title: String,
    content: String,
    authorName: String,
    blogId: String
})

const open = ref(false)
const currentTitle = ref(props.title)
const currentContent = ref(props.content)
const toast = useToast()
const emit = defineEmits(['updateSuccess'])

function validCurrentData() {
    let can = true;
    if (currentTitle.value.trim() === "") {
        can = false;
    }
    if (currentContent.value.trim() === "") {
        can = false;
    }
    return can;
}

async function updateBlog() {
     if (!validCurrentData()) {
        toast.error("请填写完整 再编辑博客!", {
            position: "top-center",
            timeout: 3500,
            // 根据该id来决定toast的身份
            id: "请填写完整 再编辑博客!"
        });
        return;
    }

    await blogAPI.updateBlog(
        props.blogId, {
        title: currentTitle.value,
        content: currentContent.value,
    })

    toast.success("修改成功", {
        position: "top-center",
        timeout: 2000,
        hideProgressBar: true,
        // 根据该id来决定toast的身份
        id: "创建成功"
    });

    emit('updateSuccess')
    open.value = false;
}

function setopen(value) {
    open.value = value
}

</script>

<template>
    <div class="inline">
        <button class="btn btn-primary btn-sm" @click="setopen(true)">编辑博客</button>

        <TransitionRoot class="z-50" as="template" :show="open">
            <Dialog as="div" class="relative z-10" @close="open = false">

                <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4  sm:items-center sm:p-0">
                        <TransitionChild as="template" enter="ease-out"
                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel
                                class="relative bg-slate-700 h-[75vh] w-[90vw] transform overflow-hidden rounded-lg shadow-xl transition-all">
                                <div class=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class=" space-y-6">

                                        <div class="flex items-center justify-around">

                                            <div class="flex space-x-6">
                                                <div class="space-y-2">
                                                    <div class="text-2xl">博客标题:</div>
                                                    <input type="text" name="name" v-model="currentTitle"
                                                        placeholder="在这里填写你的博客标题"
                                                        class="font-bold text-sm input input-bordered input-md w-full max-w-xs" />
                                                </div>
                                                <div class="space-y-2">
                                                    <div class="text-2xl">发布用户:</div>
                                                    <select class="select select-bordered w-full max-w-xs">
                                                        <option disabled selected>{{ authorName }}</option>

                                                    </select>
                                                </div>
                                            </div>

                                            <div class="flex flex-row justify-end p-6 space-x-4">
                                                <button class="btn btn-success" @click="updateBlog()">修改博客</button>
                                                <button class="btn btn-primary" @click="open = false">取消操作</button>
                                            </div>

                                        </div>


                                        <div>
                                            <v-md-editor v-model="currentContent" height="500px"></v-md-editor>
                                        </div>


                                    </div>
                                </div>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

    </div>
</template>

