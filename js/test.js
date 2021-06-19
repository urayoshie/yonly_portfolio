window.addEventListener('DOMContentLoaded', () => {
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
    <img src="${data.image}" alt="" />
  </div>
  <div id="inline-${data.id}" style="display:none;">
    <img src="${data.defaultImage}" alt="" />
    <h2>${data.title}</h2>
    <div>${data.year}</div>
    <div>${data.size}</div>
    <div>${data.medium}</div>
  </div>
</div>
    `;
    swiperWrapper.insertAdjacentHTML('afterbegin', description);
    $('.inline').modaal({
      content_source: `#inline-${data.id}`,
      fullscreen: true,
    });
  };

  const fetchImageData = () => {
    fetch('https://cheyonly.microcms.io/api/v1/portrait', {
      headers: {
        'X-API-KEY': '8b151f62-8935-4377-a621-9ad95e8b0bcb',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        for (const content of json.contents) {
        }
        //タイトル
        const title = '<h3>' + content.title + '</h3>';

        // document.getElementById('image').src = json.image.url;
        // document.getElementById('default_img').src = json.default_img.url;
        // document.getElementById('title').innerHTML = json.title;
        // document.getElementById('year').innerHTML = json.year;
        // document.getElementById('size').innerHTML = json.size;
        // document.getElementById('medium').innerHTML = json.medium;
      });

    const dataList = [
      // {
      //   id: 'id',
      //   image: 'image',
      //   defaultImage: 'default_img',
      //   title: 'title',
      //   year: 'year',
      //   size: 'size',
      //   medium: 'Oil / Canvas',
      // },
      {
        id: '1',
        image: 'img/1-1.jpg',
        defaultImage: 'img/1.jpg',
        title: 'タイトル1',
        year: '2020',
        size: '30cm × 40cm',
        medium: 'Oil / Canvas',
      },
      {
        id: '2',
        image: 'img/2-1.jpg',
        defaultImage: 'img/2.jpg',
        title: 'タイトル2',
        year: '2019',
        size: '30cm × 40cm',
        medium: 'Oil / Canvas',
      },
      {
        id: '3',
        image: 'img/3-1.jpg',
        defaultImage: 'img/3.jpg',
        title: 'タイトル3',
        year: '2017',
        size: '30cm × 40cm',
        medium: 'Oil / Canvas',
      },
    ];

    dataList.forEach((data) => addDescription(data));
    new Swiper('.swiper-container', modalSettings);
  };

  fetchImageData();
});
