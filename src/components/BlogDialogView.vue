<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/solid';
import timeFormatted from '../tools/timeFormatted';

const props = defineProps({
    title: String,
    content: String,
    authorName: String,
    createdAt: Date,
    img: String,
})

const open = ref(false)
const emit = defineEmits(['updateSuccess'])

function setopen(value) {
    open.value = value
}

</script>

<template>
    <div>
        <div class="space-y-4 px-20" @click="setopen(true)">
            <div class="text-5xl border-b-4 border-opacity-0 border-white hover:border-sky-300 py-2">{{ title }}</div>
            <div class="text-lg"> {{ timeFormatted(props.createdAt) }}</div>
            <div class="flex justify-between items-end">
                <div class="avatar">
                    <div class="mask mask-circle w-12 h-12 mr-4">
                        <img :src="props.img" alt="加载失败" />
                    </div>
                    <div class="flex flex-col justify-start">
                        <div class="text-lg"> {{ authorName }} </div>
                        <div>编辑</div>
                    </div>
                </div>
                <div class="text-xl">浏览更多</div>
            </div>
        </div>




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
                                class="relative bg-slate-700 overflow-scroll scroll-smooth h-[84vh] w-[90vw] transform rounded-lg shadow-xl transition-all">
                                <button class="btn btn-ghost btn-circle absolute right-3 top-3" @click="setopen(false)">
                                    <XMarkIcon class="w-7 h-7" />
                                </button>
                                <div class=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class=" space-y-6">
                                        <div>
                                            <v-md-preview :text="props.content" height="500px"></v-md-preview>
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

