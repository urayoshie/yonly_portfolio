import { validateForm } from './form-validation.js';

export const fetchContact = () => {
  const url = `https://cheyonly.microcms.io/api/v1/contact`;
  const headers = {
    'X-WRITE-API-KEY': '880ecf07-15fc-4e55-a407-74f7b6ce96dc',
    'Content-Type': 'application/json',
  };
  const EMAIL_REGEX = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/;
  const TEL_REGEX = /^0\d{1,3}-?\d{2,4}-?\d{3,4}$/;

  const getPostParams = () => {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const tel = document.getElementById('contact-tel').value;
    const body = document.getElementById('contact-body').value;

    return JSON.stringify({ name, email, tel, body });
  };

  const postForm = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: getPostParams(),
    });
    if (!response.ok) throw new Error(response.statusText);
    location.href = '/contact-success.html';
  };

  validateForm('.form', postForm);
};
