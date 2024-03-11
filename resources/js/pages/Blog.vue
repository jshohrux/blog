<template>
    <div v-if="postsData != null">
        <h2 class="header-title">All Blog Posts</h2>
        <div class="searchbar">
            <form action="">
                <input type="text" placeholder="Search..." name="search" v-model="title" />

                <button type="submit">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </div>
        <div class="categories">
            <ul>
                <li v-for="category in categories" :key="category.id">
                    <a href="#" @click="filterByCategory(category.name)">{{category.name}}</a>
                </li>
            </ul>
        </div>
        <section class="cards-blog latest-blog">
            <!-- <p>{{ postsData['data'] }}</p> -->
            <div class="card-blog-content" v-for="post in postsData['data']" :key="post.id">
                <!-- <p>{{ post['data'] }}</p> -->
                <img :src="post.imagePath" alt="" />
                <p>
                    {{ post.created_at }}
                    <span style="float: right">Written By {{ post.user }}</span>
                </p>
                <h4 style="font-weight: bolder">
                    <a href="single-blog.html"></a>
                    <router-link :to="{name: 'SingleBlog',params: { slug: post.slug },}">{{ post.title }}</router-link>
                </h4>
            </div>
        </section>
        <!-- <h3 v-if="!postsData['data'].length">Sorry, no match was found!</h3> -->
        <!-- <p>{{ postsData['links'] }}</p> -->
        <div class="pagination" id="pagination" v-if="postsData['meta']['links']">
            <a href="#" v-for="(link, index) in postsData['meta']['links']" :key="index" v-html="link.label"
                :class="{ active: link.active, disabled: !link.url }" @click="changePage(link)"></a>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useStoreData } from '@/stores/store'
export default {
    emits: ["updateSidebar"],
    data() {
        return {
            // posts: [],
            title: "",
            links: [],
        };
    },
    computed: {
        ...mapState(useStoreData, ["categories", "postsData"]),
    },
    methods: {
        ...mapActions(useStoreData, { categoriesAction: 'categoriesAction', postsAction: 'postsAction', paginat: 'paginat' }),

        filterByCategory(name) {
            axios
                .get("/api/posts", {
                    params: {
                        category: name,
                    },
                })
                .then((response) => {
                    this.posts = response.data.data;
                    this.links = response.data.meta.links;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        changePage(link) {
            if (!link.url || link.active) {
                retun;
            }
            this.paginat(link.url)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.log("error", err));
        },
    },

    watch: {
        // title() {
        //     axios
        //         .get("/api/posts", {
        //             params: {
        //                 search: this.title,
        //             },
        //         })
        //         .then((response) => {
        //             this.posts = response.data.data;
        //             this.links = response.data.meta.links;
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // },
    },

    mounted() {
        this.postsAction()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log("error", err));
        this.categoriesAction()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log("error", err));
    },
};
</script>
<style scoped>
h3 {
    font-size: 30px;
    text-align: center;
    margin: 50px 0;
    color: #fff;
}

.disabled {
    pointer-events: none;
}
</style>
