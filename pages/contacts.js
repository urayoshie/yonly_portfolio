import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Contacts = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      tel: tel,
      body: body,
    };

    axios({
      method: 'post',
      url: 'https://cheyonly.microcms.io/api/v1/contact',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'X-WRITE-API-KEY': '880ecf07-15fc-4e55-a407-74f7b6ce96dc',
      },
    })
      .then(() => {
        router.push('/success');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" name="tel" value={tel} onChange={(e) => setName(e.target.value)} />
      <textarea type="text" name="body" value={body} onChange={(e) => setBody(e.target.value)} />
      <button onClick={handleSubmit}>お問い合わせする</button>
    </div>
  );
};

export default Contacts;
