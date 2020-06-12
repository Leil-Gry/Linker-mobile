<template>
  <div>
    <van-nav-bar
        title="产品列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        :label="item.pid"
        @click="chooseProduct(item)"
        type="flex"
        align="left"
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { NavBar, Divider, List, Cell } from 'vant'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductList',
  components: {
    [NavBar.name]: NavBar,
    [Divider.name]: Divider,
    [List.name]: List,
    [Cell.name]: Cell
  },
  computed: mapGetters({
    email: 'email',
    fullName: 'fullName',
    productList: 'productList'
  }),
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onLoad () {
      console.log(1)
      // 异步更新数据
      setTimeout(() => {
        this.list = this.productList

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        this.finished = true
      }, 500)
    },
    chooseProduct (product) {
      this.$store.commit('product/SET_CURRENT_PRODUCT', product)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.rolStyle{
  height: 60px;
  width: 100%;
}
.left{
  float: left;
  line-height: 60px;
  font-size: 17px;
  margin-left: 10px;
  color: grey
}
.right{
  float: right;
  line-height: 60px;
  font-size: 17px;
  margin-right: 5px;
  color: grey
}
</style>
