<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, TagIcon, CursorArrowRaysIcon } from '@heroicons/vue/24/solid';
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
        <div class="space-y-2 px-20 cursor-pointer" @click="setopen(true)">
            <div class="text-5xl border-b-2 border-opacity-0 border-white hover:border-orange-300 py-1 flex items-center ">
                <TagIcon class="inline w-6 h-6" /> {{ title }}
            </div>
            <div class="flex items-center">
                <CursorArrowRaysIcon class="inline w-6 h-6" />
                <div class="text-xl font-bold ml-2">点击浏览</div>
            </div>
            <div class="flex justify-between flex-row-reverse items-end">
                <div class="avatar">
                    <div class="flex flex-col justify-start">
                        <div class="text-lg"> {{ authorName }} </div>
                        <div>发布</div>
                    </div>
                    <div class="mask mask-circle w-12 h-12 ml-2">
                        <img :src="props.img" alt="加载失败" />
                    </div>
                </div>

                <div class="text-lg font-medium ml-1"> {{ timeFormatted(props.createdAt) }}</div>
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
                                class="relative overflow-scroll  bg-slate-100 scroll-smooth h-[84vh] w-[90vw] transform rounded-lg shadow-xl transition-all">

                                <div class=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="space-y-6">
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
