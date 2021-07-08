import $ from 'jquery';
import './modaal.min.js';
import Swiper from './swiper.min.js';

export const fetchWorkImages = () => {
  const modalSettings = {
    slidesPerView: 2,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    centeredSlides: true,
    effect: 'coverflow',

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  const addDescription = (data) => {
    const description = `
<div class="swiper-slide">
  <div class="inline">
    <img src="${data.image.url}" alt="" />
  </div>
  <div class="works-modal" id="inline-${data.id}" style="display:none;">
  <p class="default_img">
    <img src="${data.default_img.url}?w=300" alt="" />
  </p>
  <div class="works-description">
    <h2 class="works-title">${data.title}</h2>
    <div class="works-year">${data.year}</div>
    <div class="works-size">${data.size}</div>
    <div class="works-medium">${data.medium}</div></div>    
    
  </div>
</div>
    `;
    swiperWrapper.insertAdjacentHTML('afterbegin', description);
    $('.inline').modaal({
      content_source: `#inline-${data.id}`,
      fullscreen: true,
    });
  };

  const type = location.pathname.match(/\/([a-z]+).html/)[1];
  const path = `https://cheyonly.microcms.io/api/v1/${type}?fields=id,image,default_img,title,year,size,medium&limit=50`;
  const headers = {
    'X-API-KEY': '8b151f62-8935-4377-a621-9ad95e8b0bcb',
  };

  const fetchImageData = () => {
    fetch(path, { headers: headers })
      .then((response) => response.json())
      .then((json) => {
        json.contents.forEach((data) => addDescription(data));
        new Swiper('.swiper-container', modalSettings);
      });
  };
  fetchImageData();
};
