<template>
    <!-- header -->
    <header class="header">
        <div class="header-text">
            <h1>Alphayo Blog</h1>
            <h4>Home of verified news...</h4>
        </div>
        <div class="overlay"></div>
    </header>
    <h2 class="header-title">Latest Blog Posts</h2>
    <section class="cards-blog latest-blog">
        <div class="card-blog-content" v-for="post in posts" :key="post.id">
            <img :src="post.imagePath" alt="" />
            <p>
                {{ post.created_at }}
                <span style="float: right">Written By {{ post.user.name }}</span>
            </p>
            <h4 style="font-weight: bolder">
                <a href="single-blog.html"></a>
                <router-link :to="{
            name: 'SingleBlog',
            params: { slug: post.slug },
        }">{{ post.title }}</router-link>
            </h4>
        </div>
    </section>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useStoreData } from '@/stores/store'
export default {
    emits: ["updateSidebar"],
    data() {
        return {
            posts: [],
        };
    },
    methods: {
        ...mapActions(useStoreData, { homePost: 'homePost' }),
    },
    mounted() {
        this.homePost()
            .then((res) => {
                 this.posts = res.data;
            })
            .catch((err) => console.log("error", err));
    },
};
</script>
