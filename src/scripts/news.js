import $ from 'jquery';

export const fetchNews = () => {
  //========================
  //【ページングに必要な情報】

  //★1ページに表示したい記事の数
  const limit = 2;

  const page = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
  const offset = limit * (page - 1);
  //========================

  //microCMSからコンテンツ取得
  fetch(
    //★設定した項目
    `https://cheyonly.microcms.io/api/v1/news?fields=title,text,image01,date&limit=${limit}&offset=${offset}`,
    {
      headers: {
        //★APIキー
        'X-API-KEY': '8b151f62-8935-4377-a621-9ad95e8b0bcb',
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      for (const content of json.contents) {
        //タイトル
        const title = '<h3 class="news-title">' + content.title + '</h3>';

        //日付
        const date = "<p class='news-date'>" + content.date.substr(0, 10) + '</p>';

        //画像1
        const img01 = (content.image01 && content.image01.url) || '../img/noimage.jpg';
        const disp_img01 = img01 && "<img src='" + img01 + "?w=190'>";

        //テキスト
        const text = `<div class="news-text">${content.text || ''}</div>`;

        //表示部分
        $('#content').append('<article class="article">' + title + date + (disp_img01 || '') + text + '</article>');
      }

      //========================
      //ページング
      const totalCount = json.totalCount;
      const pageCount = Math.ceil(totalCount / limit);
      const pager = `<ul class='pager'>${
        //前のページリンクを表示
        page >= 2 ? `<li><a href='./news.html?page=${page - 1}'>&#9664;</a></li>` : ''
      }${
        //必要なページを表示
        Array.from(Array(pageCount))
          .map((noValue, index) => {
            const targetPage = index + 1;
            return targetPage === page
              ? `<li><span>${index + 1}</span></li>`
              : `<li><a href='./news.html?page=${index + 1}'>${index + 1}</a></li>`;
          })
          .join('\n')
      }${
        //次のページリンクを表示
        page < pageCount ? `<li><a href='./news.html?page=${page + 1}'>&#9658;</a></li>` : ''
      }</ul>`;
      $('#content').append(pager);
      //========================
    })
    .catch((e) => {
      console.log(e.message);
    });
}
