<template>
   <div>
   <el-card class="box-card " style="min-height: 200px;" align="middle" onclick="">
    <el-container>
      <el-header>{{header}}</el-header>
      <el-main>{{main}}</el-main>
    </el-container>
          <div class="el-card__body mid">
            <el-button @click="Like()"  type="success" icon="el-icon-check" circle></el-button>
             <div>{{likenum}}</div>

        </div>
   </el-card>
    <div class="container">
       <Input @addComment="addComment"/>

        <div style="margin-top: 20px;">
            <el-radio v-model="filterType" :label="1">看全部</el-radio>
            <el-radio v-model="filterType" :label="2">只看自己</el-radio>
        </div>
        <List :list="list"/>
    </div>
    </div>
</template>

<script>
// import { createCommentService, getCommentListService } from './function/comment.js'
import Input from './Input'
import List from './List'
// import event from './function/event.js'

export default {
  created(){
     this.load();
    // this.Like();
    // this.addComment();
    // this.getmain()
  },
    components: {
        Input,
        List
    },
    methods:{
      Like(){
        likenum++;
      },
     //  addComment(content){ const data = {
     // id: this.list.length + 1,
     // username: 'zhangsan',
     // content,
     // createdAt: Date.now()}


      // getmain(){
      //   let main =new FormData();
      //     var ownerId=`789`;
      //     com.append("ownerID",ownerId)
      //     const url=`/apis/talk/api//getRootListByOwnerId`;
      //     fetch(url,{
      //       method:'POST',
      //       headers:{
      //         'Content-Type':'application/getmain'},
      //       body:main
      //     }).then(res=>res.json)
      //     .then(main=>{
      //         // console.log(data);

      //            this.main.push(main)
      //            }
      //     )
      //     .catch(error=>{
      //       alert(`错误`);
      //     })
      //   },

      // addComment(){
      //   let com = new FormData();
      //   var fromContentId=`3048644c3a3d4e219507616d806a44e0`;
      //     com.append("fromContentId",fromContentId)
      //     const url=`/apis/talk/api//addSonComments`;
      //     fetch(url,{
      //       method:'POST',
      //       headers:{
      //         'Content-Type':'application/addcom'},
      //       body:com
      //     }).then(res=>res.json)
      //     .then(newcom=>{
      //         // console.log(data);

      //            this.List.unshift(newcom)
      //            }
      //     )
      //     .catch(error=>{
      //       alert(`错误`);
      //     })
      //   },

      // Like(){

      //   let lk =new FormData();
      //     var Like=`3048644c3a3d4e219507616d806a44e0`;
      //     lk.append("Like",Like)
      //     const url=`/apis/talk/api/getRootLikedNum`;
      //     fetch(url,{
      //       method:'POST',
      //       headers:{
      //         'Content-Type':'application/like'},
      //       body:lk
      //     }).then(res=>res.json)
      //     .then(likenum=>{
      //         // console.log(data);
      //            this.likenum.push(likenum);
      //            this.likenum.unshift(likenum)
      //            }
      //     )
      //     .catch(error=>{
      //       alert(`错误`);
      //     })
      //   },

         load(){
        let fd=new FormData();
        var fromContentId=`3048644c3a3d4e219507616d806a44e0`;
        // fd.append("fromContentId",fromContentId)
        const url=`/apis/talk/api/getReplyListByFromContentId?fromContentId=${fromContentId}`;
        fetch(url,{
          method:'GET',
          // headers:{
          //   'Content-Type':'application/list'},
          // body:fd
        }).then(res=>res.json())
        .then(data=>{
           // console.log(data);
            for(let i=0;i<data.length;i++){
              let comment={};
              // comment.id=data[i].fromId;
              comment.userName=data[i].fromName;
              comment.avatar=`hhh`;
              comment.toName=data[i].toName;
              comment.content=data[i].content;
               this.list.push(comment);
               }
        })
        .catch(error=>{
          // alert(`错误`);
          console.log(`错误`);
        })
      }
    },
    data() {
        return {

            filterType: 1, // 1 - 看全部；2 - 只看自己
            list: [
                //  模拟数据
                 {
                     _id: 1,
                     username: 'zhangsan',
                     content: '我是伞兵 ',
                     createdAt: Date.now()
                 },
                 {
                     _id: 2,
                     username: 'lisi',
                     content: '无语了都 ',
                     createdAt: Date.now() - 5 * 60 * 1000 // 5 分钟以前
                 },
                 {
                     _id: 3,
                     username: 'wangwu',
                     content: '切格瓦拉yyds ',
                     createdAt: Date.now() - 10 * 60 * 1000 // 10 分钟以前
                 },
            ],
            likenum: 432,
            main:'现在，解决打工的问题，是非常非常重要的。 所以， 富勒曾经提到过，苦难磨炼一些人，也毁灭另一些人。这句话语虽然很短, 但令我浮想联翩. 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 从这个角度来看， 每个人都不得不面对这些问题。 在面对这种问题时， 一般来说， 我们都知道，只要有意义，那么就必须慎重考虑。 经过上述讨论， 带着这些问题，我们来审视一下打工。',
            header:'打工是不可能打工的'
        }
    },
    watch: {
        filterType() {
            this.getCommentList()
        }
    },
//     methods: {
//         async getCommentList() {
//             // 获取列表
//             const commentList = await getCommentListService(this.filterType)
//             this.list = commentList
//         },
//        async addComment(content) {
//            // const data = {
//            //     id: this.list.length + 1,
//            //     username: 'zhangsan',
//            //     content,
//            //     createdAt: Date.now()
//            // }

//            const data = await createCommentService(content)

//            this.list.unshift(data)
//        },
//        updateHandler(newComment) {
//            this.list = this.list.map(item => {
//                console.log(item._id, newComment._id)
//                if (item._id === newComment._id) {
//                    console.log('newComment', newComment)
//                    return newComment
//                }
//                return item
//         })
// },
}
// async mounted() {
//         this.getCommentList()

//         // 更新数据时，监听
//         event.$on('onCommentUpdate', this.updateHandler)
//     },
//     beforeDestroy() {
//         event.$off('onCommentUpdate', this.updateHandler)
//     }
// }
</script>

<style>
.container {
    margin: 20px 50px 0;
}
 .el-card {
    min-width: 380px;
    margin-right: 20px;
    transition: all .5s;
  }
  .el-card:hover{
    margin-top: -5px;
}
.mid{
    margin-top: 25%;
    height: 50%;
}
</style>
