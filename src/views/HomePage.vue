<template>
    <div class="container">
        <div class="nav">
            <div @click="homePage">随笔</div>
            <div>
                <n-popselect @update:value="searchByCategory" v-model:value="selectedCategory" :options="categortyOptions" trigger="click">
                    <p>分类<span>{{ categoryName }}</span></p>
                </n-popselect>
            </div>
            <div @click="dashboard">管理文章</div>
        </div>
        <n-divider />
        <n-space class="search">
            <n-input v-model:value="pageInfo.keyword" :style="{ width: '500px' }" placeholder="请输入关键字" />
            <n-button :loading="searchBtnLoading" type="primary" ghost @click="loadBlogs(0)"> 搜索 </n-button>
        </n-space>
        <n-skeleton v-if="loading" class="mb15" :width="1200" :height="154" :sharp="false" size="medium" />
        <n-skeleton v-if="loading" class="mb15" :width="1200" :height="154" :sharp="false" size="medium" />
        <n-skeleton v-if="loading" class="mb15" :width="1200" :height="154" :sharp="false" size="medium" />
        <div v-else class="blog-content" v-for="(blog, index) in blogListInfo" style="margin-bottom:15px;cursor: pointer;">
            <n-card  class="blog-card" :title="blog.title" @click="toDetail(blog)">
                {{ blog.content }}
                <template #footer>
                    <n-space class="content-time" align="center">
                        <div>发布时间：{{ blog.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>

        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />

        <n-divider />
        <div class="footer">
            <div>云锦</div>
            <!-- <div>XICP备XXXXX号-1</div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 路由
const router = useRouter()
const route = useRoute()

const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")

// 选中的分类
const selectedCategory = ref(0)
// 分类选项
const categortyOptions = ref([])
// 文章列表
const blogListInfo = ref([])
// 骨架屏
const loading = ref(true)
// 按钮loading
const searchBtnLoading = ref(false)

// 查询和分页数据
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
    keyword: "",
    categoryId:0,
})

onMounted(() => {
    loadCategorys();
    loadBlogs()
})

/**
 * 获取博客列表
 */
const loadBlogs = async (page = 0) => {
    if (page != 0) {
        pageInfo.page = page;
    }
    let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
    let temp_rows = res.data.data.rows;
    // 处理获取的文章列表数据
    for (let row of temp_rows) {
        row.content += "..."
        // 把时间戳转换为年月日
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    blogListInfo.value = temp_rows;
    loading.value = false
    pageInfo.count = res.data.data.count;
    //计算分页大小
    pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
    console.log(res)
}

const categoryName = computed(() => {
    //获取选中的分类
    let selectedOption = categortyOptions.value.find((option) => { return option.value == selectedCategory.value })
    //返回分类的名称
    return selectedOption ? selectedOption.label : ""
})

/**
 * 获取分类列表
 */
const loadCategorys = async () => {
    let res = await axios.get("/category/list")
    categortyOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
    console.log(categortyOptions.value)
}

/**
 * 选中分类
 */
const searchByCategory = (categoryId)=>{
    pageInfo.categoryId = categoryId ;
    loadBlogs()
}

//页面跳转
const toDetail = (blog)=>{
    router.push({path:"/detail",query:{id:blog.id}})
}

const homePage = () => {
    // 
    router.push("/")
}

const dashboard = () => {
    router.push("/login")
}


</script>

<style lang="scss" scoped>

.search{
    margin-bottom: 15px;
}
.container {
    width: 1200px;
    margin: 0 auto;
}

.nav {
    //width: 200px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border-radius: 8px;
    // padding-top: 20px;
    color: #64676a;
    background-color: rgb(222, 222, 222);
    div {
        cursor: pointer;
        //margin-right: 15px;
        padding-left: 20px;
        &:hover {
            color: rgb(150, 150, 150);
        }

        span {
            font-size: 12px;
        }
    }
  //div:nth-child(2) {
  //  margin-left: 10px;
  //}

}
// .blog-content {
//     background-color: grey;
// }
.blog-card {
    border-radius: 8px;
    background-color: rgb(222, 222, 222);
}
.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
.content-time {
    color: rgb(116, 111, 111);
}
.mb15 {
  margin-bottom: 15px;
  border-radius: 8px;
}

</style>