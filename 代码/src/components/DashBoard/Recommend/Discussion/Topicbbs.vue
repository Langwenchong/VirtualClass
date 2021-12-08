<template>
  <div id="Topicbbs">
    <div id="header">
      <strong>{{ title }}</strong>
      <div id="info">
        <div class="box">
          <span
            ><svg
              t="1638887703473"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="14149"
              width="20"
              height="20"
            >
              <path
                d="M179 64h665.042c13.79 0 24.977 11.167 25 24.958l1.416 846c0.023 13.807-11.15 25.019-24.958 25.042H179c-13.807 0-25-11.193-25-25V89c0-13.807 11.193-25 25-25z"
                fill="#D2D3CF"
                p-id="14150"
              ></path>
              <path
                d="M179 116h665.044c13.79 0 24.976 11.166 25 24.956l1.411 794c0.025 13.807-11.148 25.02-24.955 25.044H179c-13.807 0-25-11.193-25-25V141c0-13.807 11.193-25 25-25z"
                fill="#F2F2F2"
                p-id="14151"
              ></path>
              <path
                d="M179 170h665.047c13.789 0 24.974 11.164 25 24.953l1.405 740c0.027 13.807-11.145 25.02-24.952 25.047H179c-13.807 0-25-11.193-25-25V195c0-13.807 11.193-25 25-25z"
                fill="#FFFFFF"
                p-id="14152"
              ></path>
              <path
                d="M157 621v60H97zM869 621v60h59z"
                fill="#CFA72A"
                p-id="14153"
              ></path>
              <path
                d="M97 675h272.568l46.536 72.907H628.84L668.728 675H928v285H97zM641 169h160v208l-80-37.5-80 37.5z"
                fill="#FFD159"
                p-id="14154"
              ></path>
              <path
                d="M721.5 292.75l-30.859 16.223 5.894-34.361-24.965-24.335 34.5-5.014L721.5 214l15.43 31.263 34.5 5.014-24.965 24.335 5.894 34.361z"
                fill="#FFFFFF"
                p-id="14155"
              ></path>
              <path
                d="M216 293m10 0l213 0q10 0 10 10l0 0q0 10-10 10l-213 0q-10 0-10-10l0 0q0-10 10-10Z"
                fill="#D8D8D8"
                p-id="14156"
              ></path>
              <path
                d="M216 429m10 0l339 0q10 0 10 10l0 0q0 10-10 10l-339 0q-10 0-10-10l0 0q0-10 10-10Z"
                fill="#D8D8D8"
                p-id="14157"
              ></path>
              <path
                d="M216 361m10 0l341 0q10 0 10 10l0 0q0 10-10 10l-341 0q-10 0-10-10l0 0q0-10 10-10Z"
                fill="#D8D8D8"
                p-id="14158"
              ></path>
              <path
                d="M216 496m10 0l341 0q10 0 10 10l0 0q0 10-10 10l-341 0q-10 0-10-10l0 0q0-10 10-10Z"
                fill="#D8D8D8"
                p-id="14159"
              ></path>
              <path
                d="M216 564m10 0l341 0q10 0 10 10l0 0q0 10-10 10l-341 0q-10 0-10-10l0 0q0-10 10-10Z"
                fill="#D8D8D8"
                p-id="14160"
              ></path>
            </svg>
            &nbsp;关注者</span
          >
          <b>{{ num }}</b>
        </div>
        <div class="box">
          <span
            ><svg
              t="1638887607217"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6355"
              width="30"
              height="30"
            >
              <path
                d="M595.856 626.887h145.19v223.054h-145.19z"
                fill="#228E9D"
                p-id="6356"
              ></path>
              <path
                d="M400.214 528.438h145.19v321.503h-145.19z"
                fill="#ED8F27"
                p-id="6357"
              ></path>
              <path
                d="M259.999 802.786H411.14v53.682H259.999z"
                fill="#B12800"
                p-id="6358"
              ></path>
              <path
                d="M256.05 794.086l1.842-55.673-10.342-11.833V532.625l26.338-10.366 16.441-5.141 1.63-38.839 22.457-2.411h8.355l20.2-22.685 18.593-5.118 10.193 18.768v11.446l22.599-7.011 16.784 15.602v187.011l26.33-43.685-2.274-48.321 17.82-10.891 15.762 10.891 4.033 92.006-68.216 93.921v29.226zM743.279 620.698l-1.595-48.193 10.342-11.834V366.716l-26.338-10.366-16.441-5.141-1.63-38.839-22.457-2.411h-8.355l-20.2-22.685-18.594-5.118-10.193 18.768v11.446l-22.599-7.011-16.783 15.602v187.011l-26.331-43.685 2.274-48.321-17.82-10.891-15.762 10.891-4.032 92.006 68.216 93.921 0.875 18.805z"
                fill="#FCE3C3"
                p-id="6359"
              ></path>
              <path
                d="M539.08 520.488l-1.595-48.193 10.343-11.834V266.506L521.49 256.14l-16.442-5.141-1.63-38.839-22.457-2.411h-8.354l-20.201-22.685-18.593-5.118-10.193 18.768v11.446l-22.599-7.011-16.784 15.602v187.011l-26.33-43.685 2.274-48.321-17.82-10.891-15.762 10.891-4.033 92.006 68.216 93.921 0.876 18.805z"
                fill="#FCE3C3"
                p-id="6360"
              ></path>
              <path
                d="M547.102 867.69H411.14v-17.75h127.087V534.913h17.75v323.903c0 4.9-3.976 8.874-8.875 8.874z"
                fill="#300604"
                p-id="6361"
              ></path>
              <path
                d="M405.558 802.786h-146.9a8.877 8.877 0 0 1-8.875-8.875v-45.565c-5.703-5.541-9.002-13.249-9.002-21.43V546.07c0-16.345 13.087-29.647 29.167-29.647 4.068 0 7.945 0.85 11.464 2.386v-22.493c0-16.352 13.076-29.658 29.144-29.658 4.068 0 7.945 0.849 11.469 2.386v-0.775c0-16.351 13.081-29.658 29.161-29.658 15.999 0 29.028 13.174 29.162 29.416a28.517 28.517 0 0 1 11.469-2.392c16.074 0 29.156 13.301 29.156 29.653v155.579l3.045-4.478v-52.944c0-16.358 13.076-29.664 29.144-29.664 16.092 0 29.185 13.307 29.185 29.664v81.781c0 7.905-3.206 15.549-8.84 21.153l-59.016 75.138-0.058 22.418c-0.011 4.894-3.981 8.851-8.875 8.851z m-138.025-17.75h129.173l0.041-16.623c0.005-1.982 0.67-3.9 1.895-5.46l60.588-77.13a8.828 8.828 0 0 1 1.433-1.716c2.536-2.346 3.935-5.495 3.935-8.881v-81.781c0-6.57-5.13-11.914-11.435-11.914-6.281 0-11.394 5.345-11.394 11.914v55.676a8.89 8.89 0 0 1-1.537 4.992l-20.795 30.565c-2.19 3.218-6.246 4.623-9.949 3.49a8.876 8.876 0 0 1-6.263-8.482v-184.4c0-6.563-5.119-11.903-11.406-11.903-6.298 0-11.417 5.339-11.417 11.903v119.588c0 4.9-3.975 8.875-8.875 8.875s-8.927-3.975-8.927-8.875V468.269c0-6.563-5.119-11.908-11.412-11.908-6.292 0-11.411 5.345-11.411 11.908v146.606c0 4.9-3.975 8.875-8.875 8.875s-8.921-3.975-8.921-8.875V496.316c0-6.564-5.126-11.908-11.423-11.908-6.281 0-11.394 5.345-11.394 11.908v118.559c0 4.9-3.975 8.875-8.875 8.875s-8.938-3.975-8.938-8.875V546.07c0-6.558-5.114-11.897-11.4-11.897-6.298 0-11.417 5.339-11.417 11.897v180.846c0 4.022 1.924 7.737 5.143 9.938a8.886 8.886 0 0 1 3.859 7.326v40.856z"
                fill="#300604"
                p-id="6362"
              ></path>
              <path
                d="M411.14 867.69H251.124a8.877 8.877 0 0 1-8.875-8.875v-64.904c0-4.9 3.975-8.875 8.875-8.875H411.14c4.9 0 8.875 3.975 8.875 8.875v64.904a8.877 8.877 0 0 1-8.875 8.875z m-151.141-17.75h142.266v-47.154H259.999v47.154zM740.925 626.887h-146.9c-4.888 0-8.857-3.958-8.875-8.846l-0.063-21.76-58.964-73.288c-5.663-5.501-8.887-13.036-8.887-20.847V422.3c0-16.08 13.087-29.161 29.173-29.161 16.08 0 29.161 13.081 29.161 29.161v51.574l3.033 4.351V326.477c0-16.08 13.081-29.161 29.161-29.161 4.068 0 7.939 0.838 11.464 2.346 0.237-15.878 13.231-28.722 29.167-28.722 16.074 0 29.15 13.087 29.15 29.167v0.566a28.954 28.954 0 0 1 11.487-2.358c16.068 0 29.138 13.087 29.138 29.167v21.766a29.043 29.043 0 0 1 11.464-2.346c16.08 0 29.161 13.076 29.161 29.15v176.552a29.107 29.107 0 0 1-8.996 21.073v44.334a8.876 8.876 0 0 1-8.874 8.876z m-138.054-17.75H732.05v-39.672a8.867 8.867 0 0 1 3.935-7.372 11.395 11.395 0 0 0 5.062-9.488V376.052c0-6.286-5.12-11.4-11.411-11.4-6.286 0-11.406 5.114-11.406 11.4v67.175c0 4.9-3.975 8.875-8.875 8.875s-8.932-3.975-8.932-8.875V327.482c0-6.298-5.108-11.417-11.388-11.417-6.304 0-11.429 5.12-11.429 11.417v115.745c0 4.9-3.975 8.875-8.875 8.875s-8.932-3.975-8.932-8.875v-143.12c0-6.298-5.114-11.417-11.4-11.417-6.298 0-11.423 5.119-11.423 11.417v143.121c0 4.9-3.975 8.875-8.875 8.875s-8.915-3.975-8.915-8.875v-116.75c0-6.292-5.119-11.411-11.417-11.411-6.292 0-11.411 5.119-11.411 11.411v180.019a8.873 8.873 0 0 1-6.217 8.464 8.85 8.85 0 0 1-9.938-3.391l-20.784-29.838a8.858 8.858 0 0 1-1.595-5.073V422.3c0-6.292-5.119-11.411-11.411-11.411-6.298 0-11.423 5.119-11.423 11.411v79.846c0 3.207 1.364 6.205 3.842 8.436a8.901 8.901 0 0 1 1.508 1.763l60.53 75.235a8.891 8.891 0 0 1 1.958 5.535l0.043 16.022z"
                fill="#300604"
                p-id="6363"
              ></path>
              <path
                d="M538.106 532.625H412.099a8.877 8.877 0 0 1-8.875-8.875v-28.463c0-6.563-5.119-11.903-11.406-11.903-3.132 0-6.073 1.347-8.274 3.796-1.733 1.936-4.16 3.201-6.841 2.935a8.854 8.854 0 0 1-6.668-3.305l-5.472-6.795a8.87 8.87 0 0 1-1.964-5.564v-6.183c0-6.465-4.958-11.74-11.117-11.903-0.353 0.04-0.884 0.098-1.011 0.11-2.964 0.179-5.686-1.04-7.5-3.294l-19.674-24.452c-5.656-5.512-8.881-13.047-8.881-20.847v-79.846c0-16.08 13.087-29.162 29.179-29.162 16.074 0 29.156 13.082 29.156 29.162v51.574l3.033 4.351V232.215c0-16.08 13.081-29.161 29.156-29.161 4.068 0 7.945 0.838 11.469 2.346 0.237-15.878 13.226-28.722 29.161-28.722 16.074 0 29.156 13.087 29.156 29.167v0.56a29.013 29.013 0 0 1 11.475-2.351c16.074 0 29.15 13.087 29.15 29.167v21.772a28.988 28.988 0 0 1 11.469-2.352c16.074 0 29.156 13.076 29.156 29.15v120.292a8.87 8.87 0 0 1-2.681 6.356c-1.711 1.67-4.247 2.496-6.414 2.519a15.35 15.35 0 0 1-0.844-0.063c-6.13 0.196-11.054 5.24-11.054 11.406v79.846c0 3.207 1.364 6.205 3.842 8.436a8.901 8.901 0 0 1 1.508 1.763l4.686 5.824a8.896 8.896 0 0 1 1.959 5.565c0.003 4.897-3.973 8.89-8.872 8.89z m-117.132-17.75h99.243a28.819 28.819 0 0 1-2.981-12.729V422.3c0-13.243 8.875-24.452 20.992-27.994V281.79c0-6.286-5.12-11.4-11.406-11.4-6.292 0-11.411 5.114-11.411 11.4v67.175c0 4.9-3.975 8.875-8.875 8.875s-8.932-3.975-8.932-8.875V233.22c0-6.298-5.114-11.417-11.4-11.417-6.298 0-11.417 5.119-11.417 11.417v115.745c0 4.9-3.975 8.875-8.875 8.875s-8.932-3.975-8.932-8.875V205.844c0-6.298-5.12-11.417-11.406-11.417-6.298 0-11.417 5.12-11.417 11.417v143.121c0 4.9-3.975 8.875-8.875 8.875s-8.915-3.975-8.915-8.875v-116.75c0-6.292-5.125-11.411-11.423-11.411-6.286 0-11.406 5.12-11.406 11.411v180.019a8.874 8.874 0 0 1-6.217 8.465 8.861 8.861 0 0 1-9.938-3.391l-20.784-29.838a8.86 8.86 0 0 1-1.595-5.073v-54.359c0-6.292-5.119-11.412-11.406-11.412-6.304 0-11.429 5.12-11.429 11.412v79.846c0 3.207 1.364 6.199 3.848 8.436a9.248 9.248 0 0 1 1.502 1.762l16.635 20.679c14.63 1.514 26.093 14.058 26.197 29.301a28.472 28.472 0 0 1 11.469-2.427c16.074 0 29.156 13.301 29.156 29.653v19.587zM749.921 867.69h-162.94a8.877 8.877 0 0 1-8.875-8.875V618.012c0-4.9 3.975-8.875 8.875-8.875h162.94c4.9 0 8.875 3.975 8.875 8.875v240.804c0 4.9-3.975 8.874-8.875 8.874z m-154.065-17.75h145.19V626.887h-145.19V849.94z"
                fill="#300604"
                p-id="6364"
              ></path>
            </svg>
            &nbsp;回答数</span
          >
          <b>{{ comments }}</b>
        </div>
      </div>
    </div>
    <div id="question" class="animate__animated animate__fadeIn">
      <div class="ql-container ql-snow">
        <div class="content ql-editor" v-html="content" />
      </div>
    </div>
    <div id="comments" class="animate__animated animate__fadeIn">
      <div class="head">
        <div><i class="fas fa-comments"></i>&nbsp;评论</div>
        <div><i class="fas fa-reply" @click="backup"></i>&nbsp;返回</div>
      </div>
      <div id="commentEditor">
        <div class="menu">
          <div class="write">Write</div>
          <div class="emotions">
            <i class="far fa-smile"></i>
            <div class="emotionsBox animate__animated animate__bounceIn">
              <div
                v-for="e in emojis"
                :key="e"
                class="emoji"
                @click="addEmotion(e)"
              >
                {{ e }}
              </div>
            </div>
          </div>
        </div>
        <div class="main">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请输入内容"
            v-model="mycomment"
          >
          </el-input>
        </div>
        <div class="footer">
          <small>请保持文明发言哦~</small>
          <el-button
            class="button"
            type="success"
            style="filter: brightness(90%); opacity: 0.9"
            >Comment</el-button
          >
        </div>
      </div>
      <comment v-for="(comment, i) in arr" :key="i" :obj="comment" />
    </div>
  </div>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import comment from "@/components/DashBoard/Recommend/Discussion/comment.vue";
export default {
  components: {
    comment,
  },
  name: "Topicbbs",
  data() {
    return {
      mycomment: ``,
      emojis: ["👍", "👎", "😆", "🎉", "😟", "💝", "🚀", "👀"],
      arr: [
        {
          avatar: `https://gitee.com/Langwenchong/figure-bed/raw/master/author.jpeg`,
          name: `法法师`,
          time: `2020-09-18`,
          content: `哈哈哈哈lorem实现原理：首先获取数据，然后传递给子组件，然后通过$emit函数触发父组件事件，更新父组件的数据，那么传递给子组件的数据也就更新了，在实现子组件更新数据的时候，传递过来的是一个对象，那么我们就需要深度监听对象。实现双向绑定。`,
          like: 20,
          comments: [
            {
              avatar: `https://pengpenglang.cn/img/avatar.jpg`,
              name: `个傻瓜式人个`,
              time: `2021-09-21`,
              content: `发发发`,
              like: 9,
            },
            {
              avatar: `https://code.bdstatic.com/npm/logicdn@1.0.0/logi.im/usr/images/global/logo.webp`,
              name: `过生日过生日`,
              time: `2021-10-21`,
              content: `法师法师果然是`,
              like: 9,
            },
            {
              avatar: `https://image.bestzuo.cn/images/efdc8f3a96e979c21a20b8885fc5dab2.jpeg!getwebp`,
              name: `个傻瓜式个傻瓜式`,
              time: `2021-12-07`,
              content: `阿果然是过生日按格式`,
              like: 9,
            },
          ],
        },
        {
          avatar: `https://gitee.com/Langwenchong/figure-bed/raw/master/author.jpeg`,
          name: `法法师`,
          time: `2020-09-18`,
          content: `哈哈哈哈lorem实现原理：首先获取数据，然后传递给子组件，然后通过$emit函数触发父组件事件，更新父组件的数据，那么传递给子组件的数据也就更新了，在实现子组件更新数据的时候，传递过来的是一个对象，那么我们就需要深度监听对象。实现双向绑定。`,
          like: 20,
          comments: [
            {
              avatar: `https://code.bdstatic.com/npm/logicdn@1.0.0/logi.im/usr/images/global/logo.webp`,
              name: `过生日过生日`,
              time: `2021-10-21`,
              content: `法师法师果然是`,
              like: 9,
            },
            {
              avatar: `https://image.bestzuo.cn/images/efdc8f3a96e979c21a20b8885fc5dab2.jpeg!getwebp`,
              name: `个傻瓜式个傻瓜式`,
              time: `2021-12-07`,
              content: `阿果然是过生日按格式`,
              like: 9,
            },
          ],
        },
        {
          avatar: `https://gitee.com/Langwenchong/figure-bed/raw/master/author.jpeg`,
          name: `法法师`,
          time: `2020-09-18`,
          content: `哈哈哈哈lorem实现原理：首先获取数据，然后传递给子组件，然后通过$emit函数触发父组件事件，更新父组件的数据，那么传递给子组件的数据也就更新了，在实现子组件更新数据的时候，传递过来的是一个对象，那么我们就需要深度监听对象。实现双向绑定。`,
          like: 20,
          comments: [
            {
              avatar: `https://pengpenglang.cn/img/avatar.jpg`,
              name: `个傻瓜式人个`,
              time: `2021-09-21`,
              content: `发发发`,
              like: 9,
            },
            {
              avatar: `https://code.bdstatic.com/npm/logicdn@1.0.0/logi.im/usr/images/global/logo.webp`,
              name: `过生日过生日`,
              time: `2021-10-21`,
              content: `法师法师果然是`,
              like: 9,
            },
          ],
        },
      ],
      num: 1831,
      comments: 70,
      title: `一年内的前端看不懂前端框架源码怎么办？`,
      content: `
          <h1 class="ql-align-center"><span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br></p><p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p><p><br></p><p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p><p><br></p><p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p><p><br></p><p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
         
        `,
    };
  },
  methods: {
    addEmotion(e) {
      this.mycomment += e;
    },
    backup(){
      this.$router.push({name:'TopicList'})
    }
  },
};
</script>

<style scoped>
#Topicbbs {
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
  /* background: pink; */
  display: flex;
  /* justify-content: space-between; */
  flex-direction: column;
  align-items: center;
}
#Topicbbs #comments {
  min-height: 200px;
  margin-top: 20px;
  border-radius: 8px;
  width: 65%;
  box-sizing: border-box;
  padding: 24px;
  background: var(--background3);
  box-shadow: 0 1px 2px 0px rgb(0 0 0 / 20%) !important;
}
#Topicbbs #comments .head {
  display: flex;
  justify-content: space-between;
  color: var(--text1);
  font-size: 20px;
  font-weight: 700;
}
#Topicbbs #comments #commentEditor {
  overflow: hidden;
  margin-top: 20px;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  width: 100%;
  min-height: 200px;
  background: var(--background2);
  border: 1px solid var(--text3);
}
#Topicbbs #comments #commentEditor .main {
  margin: 0 auto;
  width: 98%;
  margin-top: 10px;
}

#Topicbbs #comments #commentEditor .footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* float: right; */
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
}
#Topicbbs #comments #commentEditor .footer small {
  color: var(--text3);
}
#Topicbbs #comments #commentEditor .menu {
  position: relative;
  display: flex;
  height: 45px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  background: var(--background3);
  border-bottom: 1px solid var(--text3);
}
#Topicbbs #comments #commentEditor .main /deep/ .el-textarea__inner {
  color: var(--text1);
  font-size: 18px;
  background: var(--background3);
}
#Topicbbs #comments #commentEditor .menu .write {
  position: absolute;
  bottom: -1px;
  left: 10px;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  background: var(--background2);
  border-top: 1px solid var(--text3);
  border-left: 1px solid var(--text3);
  border-right: 1px solid var(--text3);
  border-bottom: 1px solid var(--background2);
  height: 80%;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#Topicbbs #comments #commentEditor .menu .emotions {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 100px;
  border: 1px solid var(--text3);
}
#Topicbbs #comments #commentEditor .menu .emotions:hover .emotionsBox {
  display: flex;
}
#Topicbbs #comments #commentEditor .menu .emotions .emotionsBox {
  z-index: 999;
  display: none;
  position: absolute;
  left: -40px;
  top: calc(80% + 5px);
  width: 146px;
  height: 80px;
  border-radius: 8px;
  background: var(--background2);
  border: 1px solid var(--text3);
  /* display: flex; */
  flex-wrap: wrap;
  padding: 10px;
}
#Topicbbs #comments #commentEditor .menu .emotions .emotionsBox .emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 50%;
  border-radius: 4px;
}
#Topicbbs #comments #commentEditor .menu .emotions .emotionsBox .emoji:hover {
  font-size: 20px;
  background: var(--background6);
  transition: 0.3s;
}
#Topicbbs #header {
  border-bottom: 1px solid var(--text3);
  background: var(--background2);
  width: calc(100% - 78px);
  position: fixed;
  z-index: 9;
  top: 0px;
  box-sizing: border-box;
  padding: 10px 20px;
  /* height: 20px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#Topicbbs #header strong {
  font-size: 1.7rem;
}
#Topicbbs #header #info {
  background: var(--background2);
  display: flex;
  align-items: center;
}
#Topicbbs #header #info .box {
  min-width: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
}
#Topicbbs #header #info .box:first-child {
  border-right: 2px solid var(--text3);
}
#Topicbbs #header #info .box span {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  color: var(--text3);
  font-size: 18px;
}
#Topicbbs #header #info .box b {
  font-size: 24px;
  font-weight: 700;
}
#Topicbbs #question {
  margin-top: 82px;
  width: 100%;
  min-height: 200px;
  background: var(--background2);
  box-shadow: 0 1px 2px 0px rgb(0 0 0 / 20%) !important;
}
@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 10%, 0) !important;
    transform: translate3d(0, 10%, 0) !important;
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 10%, 0) !important;
    transform: translate3d(0, 10%, 0) !important;
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>

