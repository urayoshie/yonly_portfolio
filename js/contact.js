window.addEventListener('DOMContentLoaded', () => {
  const url = `https://cheyonly.microcms.io/api/v1/contact`;
  const headers = {
    'X-WRITE-API-KEY': '880ecf07-15fc-4e55-a407-74f7b6ce96dc',
    'Content-Type': 'application/json',
  };

  const getPostParams = () => {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const tel = document.getElementById('contact-tel').value;
    const body = document.getElementById('contact-body').value;

    return JSON.stringify({ name, email, tel, body });
  };

  const button = document.getElementById('contact-button');
  let loading = false;

  button.addEventListener('click', async (e) => {
    e.preventDefault;
    form.checkValidity();

    if (loading) return;
    console.log('送信ボタンが押されました');
    loading = true;
    button.value = '送信中……';
    button.disabled = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // const response = await fetch(url, {
      //   method: 'POST',
      //   headers,
      //   body: getPostParams(),
      // });
      // if (!response.ok) throw new Error();
      location.href = '/contact-success.html';
    } catch (e) {
      console.log('送信に失敗しました。');
      button.value = '送信';
      button.removeAttribute('disabled');
    }
  });
});
