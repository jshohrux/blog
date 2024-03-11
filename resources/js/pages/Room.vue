<template>
    <div class="h-[calc(100vh-100px)] w-full flex flex-col justify-end">
        <div class="py-5 px-10 w-full flex flex-col gap-2  overflow-y-auto">
            <div v-for="data in roomData">
                <div class="flex items-end flex-col w-full " v-if="data['sender_id'] === user['id']">
                    <div class="rounded-xl bg-black leading-relaxed">
                        <div class="px-5 py-2 text-white  max-w-96 break-all">
                            <h1>{{ data['message'] }}</h1>
                            <p class="text-[11px]  text-gray-500 text-right">{{ time(data['created_at']) }}</p>
                        </div>
                    </div>

                </div>
                <div class="flex items-start  flex-col w-full" v-else-if="data['sender_id'] !== user['id']">
                    <div class="flex gap-3 items-center">
                        <div class="bg-white w-fit  p-2 font-semibold text-md  rounded-full">{{
                getLetterAfterSpace(data['sender_user']['name']) }}
                        </div>
                        <div class="border rounded-xl bg-white leading-relaxed">
                            <div class="px-5 py-2 text-black  max-w-96 break-all">
                                <h1>{{ data['message'] }}</h1>
                                <p class="text-[11px]  text-gray-500 text-right">{{ time(data['created_at']) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-5 py-3 w-full">
            <form method="post" class="flex items-center" @submit.prevent="e.preventDefault()">
                <input type="text" v-model="message"
                    class="bg-[#1E2126] rounded-lg w-full pl-6 py-3 border-2  text-md border-[#0a0b0c]  text-white placeholder:text-slate-400"
                    placeholder="Write any message">
                 <button type="submit" @click="sendMessageHadnler">
                     <svg data-slot="icon" fill="none" class="w-8 h-8 mx-5 text-white cursor-pointer " stroke-width="1.5"
                         stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5">
                        </path>
                    </svg>
                 </button>
            </form>
        </div>
    </div>
</template>
<script setup>
function time(data) {
    const parsedDate = new Date(data);
    const options = { hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('uz-UZ', options).format(parsedDate);
    return formattedDate;
}
function getLetterAfterSpace(text) {
    const words = text.split(' ');
    const lastWord = words[words.length - 1];
    const lastLetter = lastWord.charAt(0);
    const firstLetters = text.charAt(0);
    return firstLetters + lastLetter
}
</script>
<script>
import { mapActions, mapState } from 'pinia'
import { useStoreData } from '@/stores/store'

export default {
    data() {
        return {
            message: '',
            param: Number(this.$route.params.id),
        }
    },
    computed: {
        ...mapState(useStoreData, ["user", 'roomData']),

    },
    methods: {
        ...mapActions(useStoreData, { roomInfo: "roomInfo", sendMess: "sendMess" }),
        sendMessageHadnler() {
            const data = {
                message: this.message,
                userId: this.user.id,
                param: this.param,
            };
            this.sendMess(data).then((response) => {
                console.log(response);
                this.message = '';
                this.roomInfo(this.param);
            })
                .catch((error) => {
                    console.log(error);
                });
            // console.log(data);
        }
    },
    async mounted() {
        await this.roomInfo(this.param);
    },
}
</script>
<style></style>
