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
const toast = useToast()
const emit = defineEmits(['updateSuccess'])

function setopen(value) {
    open.value = value
}

</script>

<template>
    <div class="inline">
        <h1 class="" @click="setopen(true)">{{ title }}</h1>
        <h2 class="">内容: {{ title }}</h2>
        <h3 class="">作者: {{ authorName }}</h3>

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

