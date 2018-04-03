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
            <mu-raised-button @click="removeMovie(movie)" label="删除" class="demo-raised-button" Secondary/>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
  
    <!-- 添加 -->
    <mu-float-button icon="+" backgroundColor class="demo-float-button" @click="openAddMovieModel" />
    <!-- 添加电影表单 -->
    <vodal :show="addMovieModal" animation="zoom" :width="500" :height="480" :closeButton="true">
      <mu-text-field v-model="title" label="电影名称" labelFloat fullWidth />
      <mu-text-field v-model="image" label="海报地址" labelFloat fullWidth />
      <mu-text-field v-model="rating" label="简介" labelFloat fullWidth :rows="2" :rowsMax="4" multiLine />
      <mu-text-field v-model="introduction" label="评分" labelFloat fullWidth />
      <mu-raised-button @click="closeModel" label="取消" />
      <mu-raised-button @click="addMovie" label="确定" primary/>
    </vodal>
    <!-- 修改电影表单 -->
    <vodal :show="editMovieModal" animation="zoom" :width="500" :height="480" :closeButton="true">
      <mu-text-field v-model="title" label="电影名称" labelFloat fullWidth />
      <mu-text-field v-model="image" label="海报地址" labelFloat fullWidth />
      <mu-text-field v-model="rating" label="简介" labelFloat fullWidth :rows="2" :rowsMax="4" multiLine />
      <mu-text-field v-model="introduction" label="评分" labelFloat fullWidth />
      <mu-raised-button @click="closeModel" label="取消" />
      <mu-raised-button @click="editMovie" label="确定" primary/>
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
        movie_id: '',
        movies: [],
        addMovieModal: false,
        editMovieModal: false
      }
    },
    methods: {
      // 獲取所有電影的方法
      getMovies() {
      this.$http.get('/api/movie').then(res => {
          this.movies = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    },
      // 打開添加電影model方法
      openAddMovieModel(){
        this.addMovieModal = true
      },
      // 打開編輯電影model方法
      openEditMovieModel(movie){
        this.editMovieModal = true
        this.title = movie.title
        this.image = movie.image
        this.introduction = movie.introduction
        this.rating = movie.rating
        this.movie_id = movie._id
      },
      // 訪問後端添加電影的方法
      addMovie(){
        this.$http.post('/api/movie',{
          title: this.title,
          image: this.image,
          introduction: this.introduction,
          rating: this.rating
        }).then(res=>{
          this.addMovieModal = false
          this.getMovies()
        })
      },
      // 編輯
      editMovie(){
        this.editMovieModal = false
        let id = this.movie_id
        this.$http.put(`/api/movie/${id}`,{
          title: this.title,
          image: this.image,
          introduction: this.introduction,
          rating: this.rating
        }).then(res=>{
          this.toastr.success('修改电影成功');
          this.editMovieModal =false
          this.title = ''
          this.image = ''
          this.introduction = ''
          this.rating = null
          this.movie_id = ''
          this.getMovies()
        })
      },
      showDetail(title) {
        this.$router.push(`/movie/${title}`);
      },
      // 刪除
      removeMovie(movie){
        let id = movie._id
        // console.log(id)
        this.$http.delete(`/api/movie/${id}`).then(res=>{
          this.toastr.success('删除成功')
          // console.log(res.data)
          this.getMovies()
        })
      },
      // 取消
      closeModel(){
        this.addMovieModal = false
        this.editMovieModal = false
        this.title = ''
        this.image = ''
        this.introduction = ''
        this.rating = ''
        this.movie_id = ''
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
