<template>
  <div id="gallery">
    <div class="card" v-if="i<10" v-for="(item,i) in data" :key="item.id">
      <div class="imgBx">
        <img :src="item.img" alt="img" />
      </div>
      <div class="content">
        <p class="title">{{item.title}}</p>
        <p class="teacher">{{item.teacher}}</p>
        <p class="time">进行至第{{item.time}}</p>
        <p class="snum">{{item.snum}}</p>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "gallery",
  props: {
    data: Array
  }
};
</script>

<style scoped>
#gallery {
  width: 100%;
  height: 570px;
  /* background: orange; */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
p {
  padding: 0;
  margin: 0;
}
#gallery .card {
  overflow: hidden;
  width: 225px;
  height: 255px;
  background: var(--background2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 0 3px rgb(0 0 0 / 2%);
  transition: 0.2s;
}
#gallery .card:hover {
  box-shadow: 0 4px 16px 0 rgb(0 0 0 / 12%);
}
#gallery .card .imgBx {
  width: 100%;
  height: 127px;
}
#gallery .card .imgBx img {
  width: 100%;
}
#gallery .card .content {
  position: relative;
  height: calc(100% - 127px);
}
#gallery .card .content .title {
  position: absolute;
  top: 8px;
  left: 10px;
  font-weight: 600;
}
#gallery .card .content .teacher {
  position: absolute;
  top: 35px;
  left: 10px;
  font-size: 14px;
  font-weight: 300;
  color: var(--text2);
}
#gallery .card .content .time {
  position: absolute;
  color: var(--text5);
  font-size: 12px;
  bottom: 10px;
  left: 10px;
}
#gallery .card .content .snum {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: var(--text2);
}
</style>