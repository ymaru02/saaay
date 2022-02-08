<template>
  <!--VISUAL-->
  <section class="visual">
    <div class="q-pa-md">
      <div class="inner">
        <div class="fade-in">
          <img
            src="images/visual_1.jpg"
            alt="visual_1"
            class="visual_1 image"
          />
        </div>
        <div class="fade-in">
          <img
            src="images/visual_2.jpg"
            alt="visual_2"
            class="visual_2 image"
          />
        </div>
        <div class="fade-in">
          <img
            src="images/visual_3.jpg"
            alt="visual_3"
            class="visual_3 image"
          />
        </div>
        <div class="fade-in">
          <img
            src="images/visual_4.jpg"
            alt="visual_4"
            class="visual_4 image"
          />
        </div>
        <div class="fade-in">
          <img
            src="images/visual_5.jpg"
            alt="visual_5"
            class="visual_5 image"
          />
        </div>
        <div class="title">
          <a href="javascript:void(0)" class="btn btn--brown">입장하기</a>
        </div>
      </div>
    </div>
  </section>

  <!-- software -->
  <section class="software">
    <div class="inner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="images/logo-vue.png" alt="vue" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-quasar.png" alt="quasar" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-Typescript.png" alt="Typescript" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-openvidu.png" alt="openvidu" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-nodejs.png" alt="nodejs" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-Neo4j.png" alt="Neo4j" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// Import Swiper Vue.js components
import { Swiper } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import gsap from 'gsap';

export default {
  mounted() {
    new Swiper('.software .swiper-container', {
      autoplay: {
        // 자동 재생 여부
        delay: 5000, // 5초마다 슬라이드 바뀜
      },
      loop: true, // 반복 재생 여부
      slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
      spaceBetween: 10, // 슬라이드 사이 여백
      centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    });

    /**
     * 순서대로 나타나는 기능
     */
    // 나타날 요소들(.fade-in) 찾기.
    const fadeEls = document.querySelectorAll('.visual .fade-in');
    // 수정할 부분
    let index = 0;
    // 나타날 요소들을 하나씩 반복해서 처리!
    fadeEls.forEach(function (fadeEl) {
      // 각 요소들을 순서대로(delay) 보여지게 함!
      gsap.to(fadeEl, 1, {
        delay: (index + 1) * 0.7,
        opacity: 1,
      });
    });
  },
};
</script>

<style scoped>
/*VISUAL*/
.visual {
  background-image: url('../../public/images/cover_macbook3.png');
  background-position: center;
  background-repeat: no-repeat;
}
.visual .inner {
  height: 646px;
  /* background-color: orange; */
}

.visual .inner img {
  border-radius: 10px;
}

.visual .title {
  position: absolute;
  top: 340px;
  left: 130px;
}
.visual .title .btn {
  position: absolute;
}

.visual .visual_1.image {
  position: absolute;
  bottom: 325px;
  right: 420px;
}
.visual .visual_2.image {
  position: absolute;
  bottom: 325px;
  right: 130px;
}
.visual .visual_3.image {
  position: absolute;
  bottom: 325px;
  right: 275px;
}
.visual .visual_4.image {
  position: absolute;
  bottom: 120px;
  right: 420px;
}
.visual .visual_5.image {
  position: absolute;
  bottom: 120px;
  right: 265px;
}
.visual .fade-in {
  opacity: 0;
}

/*  SOFTWARE  */
.software {
}
.software .inner {
  padding: 40px 0;
}
.software .swiper-container {
  width: 100%;
  height: 128px;
  overflow: hidden;
}
.software .swiper-container img {
  margin: auto;
}
</style>
