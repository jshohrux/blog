<template>
    <section class="single-blog-post">
        <h1>{{ post.title }}</h1>

        <p class="time-and-author">
            {{ post.created_at }}
            <span v-if="post.user != null">Written By {{ post.user.name }}</span>
        </p>

        <div class="single-blog-post-ContentImage" data-aos="fade-left">
            <img :src="`${post.imagePath}`" alt="" />
        </div>

        <div class="about-text">
            <p>
                {{ post.body }}
            </p>
        </div>
    </section>
    <section class="recommended">
        <p>Related</p>
        <div class="recommended-cards">
            <router-link v-for="relatedPost in relatedPosts" :key="relatedPost.id" :to="{
            name: 'SingleBlog',
            params: { slug: relatedPost.slug },
        }">
                <div class="recommended-card">

                    <img :src="`${relatedPost.imagePath}`" alt="" loading="lazy" />
                    <h4>{{ relatedPost.title }}</h4>
                </div>
            </router-link>
        </div>
    </section>
        <div class="p-2 cursor-pointer bg-white w-fit fixed right-10 bottom-10 rounded-2xl" @click="getConversation">
            <svg xmlns="http://www.w3.org/2000/svg"  class="w-7 h-7 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                    clip-rule="evenodd" />
            </svg>
        </div>
</template>
<script setup>
import { useStoreData } from '@/stores/store';

const store = useStoreData();
</script>
<script>
import axios from 'axios';
import { mapActions, mapState } from 'pinia';

export default {
    emits: ["updateSidebar"],
    props: ["slug"],
    data() {
        return {
            post: {},
            relatedPosts: [],
            chatMenu: false,
        };
    },
    methods:{
        ...mapActions(useStoreData, { conver: 'conver'}),
        getConversation() {
            const store = useStoreData();
            console.log(store.user.id)
            const data = {
                'seller_id': this.post.user.id,
                'client_id': store.user.id
            }
            console.log(this.post.user.id);

            this.conver(data)
                .then((res) => {
                    this.$router.push({ name: "Chat" });
                })
                .catch((err) => {
                    console.log("error", err)
                    this.errors = err.errors;
                });

        },
    },
    mounted() {

        axios
            .get("posts/" + this.slug)
            .then((response) => (this.post = response.data.data))
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("related-posts/" + this.slug)
            .then((response) => (this.relatedPosts = response.data.data))
            .catch((error) => {
                console.log(error);
            });



    },
};
</script>
<style>
i:hover {
    color: #be79df;
}

.d-none {
    display: none !important;
}

.others-show {
    top: -55px !important;
    z-index: 10 !important;
}

.emoji-show {
    display: flex !important;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 150px !important;
    height: 100px !important;
    padding: 10px;
    top: -135px !important;
    right: 10px !important;
    background-color: #fff;
    box-shadow: 0 0 25px -5px lightgray;
    border-radius: 5px 5px 0 5px;
}

button {
    border: 0;
    outline: none;
}

img {
    width: 100%;
    object-fit: cover;
}

.avatar-wrapper {
    border-radius: 50%;
    overflow: hidden;
}

.chat-box {
    width: 350px;
    margin: auto;
}

.chat-box .header {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    padding: 15px;
}

.chat-box .header .avatar-big {
    width: 35px;
    height: 35px;
}

.chat-box .header .name {
    margin-left: 20px;
    font-size: 20px;
    font-weight: 500;
}

.chat-box .header .options {
    font-size: 20px;
    color: lightgrey;
    margin-left: auto;
    cursor: pointer;
}

.chat-box .chat-room {
    min-height: 300px;
    background-color: #f7f9fb;
    padding: 15px;
}

.chat-box .chat-room .avatar-small {
    width: 25px;
    height: 25px;
}

.chat-box .chat-room .message {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

.chat-box .chat-room .message-left {
    align-items: flex-start;
}

.chat-box .chat-room .message-left .bubble {
    border-radius: 0 5px 5px 5px;
}

.chat-box .chat-room .message-right {
    align-items: flex-end;
}

.chat-box .chat-room .message-right .bubble {
    border-radius: 5px 0 5px 5px;
}

.chat-box .chat-room .bubble {
    padding: 10px;
    font-size: 14px;
    margin-top: 5px;
    display: inline-block;
}

.chat-box .chat-room .bubble-light {
    background-color: #fbcffc;
}

.chat-box .chat-room .bubble-dark {
    color: #fff;
    background-color: #be79df;
}

.chat-box .type-area {
    display: flex;
    height: 65px;
    background-color: #fff;
    border-radius: 0 0 20px 20px;
}

.chat-box .type-area .input-wrapper {
    overflow: hidden;
    border-radius: 0 0 0 20px;
}

.chat-box .type-area .input-wrapper input {
    outline: none;
    border: none;
    padding-left: 20px;
    height: 100%;
    width: 220px;
    font-size: 14px;
}

.chat-box .type-area .button-add {
    display: flex;
    align-items: center;
    position: relative;
}

.chat-box .type-area .button-add i {
    font-size: 30px;
    color: lightgrey;
    cursor: pointer;
}

.chat-box .type-area .button-add i:hover {
    color: #be79df;
}

.chat-box .type-area .button-add .others {
    display: flex;
    padding: 10px 15px;
    background-color: #fff;
    position: absolute;
    top: 5px;
    z-index: -1;
    right: -52px;
    border-radius: 999px;
    box-shadow: 0 0 25px -5px lightgray;
    transition: 0.3s all ease-out;
}

.chat-box .type-area .button-add .others span i {
    font-size: 20px;
    color: #be79df;
}

.chat-box .type-area .button-add .others span.image-button {
    margin: 0 25px;
}

.chat-box .type-area .button-add .others .emoji-button {
    position: relative;
}

.chat-box .type-area .button-add .others .emoji-button .emoji-box {
    display: none;
    position: absolute;
    width: 0px;
    height: 0px;
    top: 0px;
    right: 0px;
    transition: 0.3s all ease-out;
}

.chat-box .type-area .button-add .others .emoji-button .emoji-box span {
    user-select: none;
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 5px;
    width: 20px;
    height: 20px;
}

.chat-box .type-area .button-send {
    background-color: #fff;
    margin-left: auto;
    width: 65px;
    color: #be79df;
    font-weight: bold;
    border-left: 2px solid #f7f9fb;
    border-radius: 0 0 20px 0;
}

.chat-box .type-area .button-send:hover {
    background-color: #be79df;
    color: #fff;
}
</style>
