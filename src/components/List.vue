<template lang="html">
  <div class="list">
    <mu-table :showCheckbox="false" multiSelectable enableSelectAll ref="table">
      <mu-thead slot="header">
        <mu-th>电影海报</mu-th>
        <mu-th>电影名称</mu-th>
        <mu-th>简介</mu-th>
        <mu-th>评分</mu-th>
        <mu-th>操作</mu-th>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="movie of movies">
          <mu-td>
            <img :src="movie.image" class="posterImg">
          </mu-td>
          <mu-td>
            <h3>{{movie.title}}</h3>
          </mu-td>
          <mu-td>
            <span class="movie-introduction">
                {{movie.introduction}}
              </span>
          </mu-td>
          <mu-td>
            {{movie.rating}}
          </mu-td>
          <mu-td>
            <mu-raised-button @click="showDetail(movie.title)" label="详细" class="demo-raised-button" primary/>
            <mu-raised-button @click="openEditMovieModel(movie)" label="修改" class="demo-raised-button" primary/>
            <mu-raised-button label="删除" class="demo-raised-button" Secondary/>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
  
    <!-- 添加 -->
    <mu-float-button icon="+" backgroundColor class="demo-float-button" />
    <!-- 添加电影表单 -->
    <vodal :show="addMovieModal" animation="zoom" :width="500" :height="480" :closeButton="true">
      <mu-text-field v-model="title" label="电影名称" labelFloat fullWidth />
      <mu-text-field v-model="image" label="海报地址" labelFloat fullWidth />
      <mu-text-field v-model="rating" label="简介" labelFloat fullWidth :rows="2" :rowsMax="4" multiLine />
      <mu-text-field v-model="introduction" label="评分" labelFloat fullWidth />
      <mu-raised-button label="取消" />
      <mu-raised-button label="确定" primary/>
    </vodal>
    <!-- 修改电影表单 -->
    <vodal :show="editMovieModal" animation="zoom" :width="500" :height="480" :closeButton="true">
      <mu-text-field v-model="title" label="电影名称" labelFloat fullWidth />
      <mu-text-field v-model="image" label="海报地址" labelFloat fullWidth />
      <mu-text-field v-model="rating" label="简介" labelFloat fullWidth :rows="2" :rowsMax="4" multiLine />
      <mu-text-field v-model="introduction" label="评分" labelFloat fullWidth />
      <mu-raised-button label="取消" />
      <mu-raised-button label="确定" primary/>
    </vodal>
  </div>
</template>

<script>
  export default {
    created() {
      this.getMovies()
      document.title = this.$route.name
    },
    data() {
      return {
        title: '',
        image: '',
        rating: null,
        introduction: '',
        movies: [],
        addMovieModal: false,
        editMovieModal: false
      }
    },
    methods: {
      unselect() {
        this.$refs.table.unSelectAll()
      },
      // 獲取所有電影的方法
      getMovies() {
        this.$http.get('/api/movie')
          .then(res => {
            console.dir(res.data)
            this.movies = res.data
          })
          .catch(err => {
            this.toastr.error(`${err.message}`, 'ERROR!')
            console.log(err)
          })
      },
      showDetail(title) {
        this.$route.push(`/movie/${title}`)
      }
    }
  }
</script>


<style lang="css">
  .mu-th {
    text-align: center !important;
  }
  
  .mu-td {
    text-align: center !important;
  }
  
  
  /* .movie-poster {
      width: 80px;
      padding: 4px 0;
    } */
  
  .movie-introduction {
    white-space: normal;
    padding: 4px 4px;
    letter-spacing: 1px;
    font-size: 14px;
    text-align: left;
  }
  
  .posterImg {
    height: 100px;
    border-radius: 6px;
  }
  
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .demo-raised-button {
    margin: 12px;
    display: block;
  }
</style>
