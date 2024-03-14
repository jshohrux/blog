<template>

    <div class="flex w-[calc(100vw-305px)]">
        <div class="h-screen bg-[#15191C] w-5/6">
            <div class="px-5 py-6 border-b-[1px] border-[#7a7777] bg-black">
                <div class="flex gap-2 items-center">
                    <div>
                        <h1 class="text-2xl font-bold text-white">Message</h1>
                    </div>
                </div>
            </div>
            <div class="flex gap-2 items-center">
                <router-view></router-view>
            </div>
        </div>
        <div class="h-screen border-l-[1px] border-[#7a7777] bg-neutral-950 w-2/6">
            <div class="px-5 py-6 border-b-[1px] border-[#7a7777]">
                <div class="flex gap-2 items-center justify-between cursor-pointer">
                    <h3 class="text-2xl font-bold text-white">All Message</h3>
                    <svg data-slot="icon" fill="none" class="w-6 h-6" stroke-width="1.5" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75">
                        </path>
                    </svg>
                </div>
            </div>
            <!-- <p>{{ conversation }}</p> -->
            <div v-for="conver in conversation">
                <RouterLink :to="{ name: 'Room', params: { id: conver['id'] } }">
                    <div class="px-5 py-3 border-[1px] border-[#7a7777] border-x-0 -mt-[1px]">
                        <div class="flex gap-2 items-center cursor-pointer">
                            <div
                                class="bg-white w-fit h-fit px-2 text-center  font-semibold text-sm capitalize py-2 rounded-full">
                                {{ getLetterAfterSpace(conver['conversation_clent']['name']) }}</div>
                            <div>
                                <h1 class="text-lg font-bold text-white">{{ conver['conversation_clent']['name'] }}</h1>
                                <p>messafe</p>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup>
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
    computed: {
        ...mapActions(useStoreData, { chatUserList: "chatUserList" }),
        ...mapState(useStoreData, ["conversation"]),
    },

    async mounted() {
        window.Echo.channel('public').listen('Message', (e) => {
            console.log('go public');
            console.log(e);
        });
        // window.Echo.private('channel.1').listen('RoomPrivate', (e) => {
        //     console.log(e);
        //     console.log('private channel');
        // });
        // window.Echo.channel('public').listen('PublicTest', (e) => {
        //     console.log('go public');
        //     //code for displaying the serve data
        //     console.log(e); // the data from the server
        // })
        await this.chatUserList;
    },
}
</script>
<style></style>
