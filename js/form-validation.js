// 以下のような HTML 構造とする
//
// <div>
//   <div class="form-group">
//     <input type="email" data-validate="email" />
//     <div class="valid-feedback"></div>
//   </div>
//   <div class="form-group">
//     <textarea type="text" data-validate="required|max:2000"></textarea>
//     <div class="valid-feedback"></div>
//   </div>
// </div>

// 【1】フィールドは form-group のクラスを付けたタグで囲む
// 【2】バリデーションを入れたい input タグ, もしくは textarea タグ に data-validate 属性を追加
// 【3】form-group のクラスを付けたタグ内に,  valid-feedback クラスを付けたタグを追加（エラーメッセージの表示箇所を指定）

// バリデーションは以下に対応
// required --> 空欄禁止
// min:8    --> 8文字以上
// max:2000 --> 2000文字以内
// email    --> email の形式
// tel      --> 電話番号 の形式
//
// 複数指定する場合は | を使用
// （例）data-validate="required|max:2000"

const EMAIL_REGEX = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/;
const TEL_REGEX = /^0\d{1,3}-?\d{2,4}-?\d{3,4}$/;
const submitButton = document.querySelector('input[type="submit"]');

const addInvalidCondition = (element, message) => {
  if (message) {
    element.classList.remove('valid');
    element.classList.add('invalid');
  }
  // メッセージを追加
  element.closest('.form-group').querySelector('.valid-feedback').textContent = message;
};

const removeInvalidCondition = (element) => {
  addInvalidCondition(element, '');
  element.classList.remove('invalid');
  element.classList.add('valid');
};

const validateField = (element) => {
  const validatePattern = element.dataset.validate.split('|');
  const minPattern = validatePattern.find((pattern) => pattern.includes('min:'));
  const minNumber = !minPattern ? null : Number(minPattern.split(':')[1]);
  const maxPattern = validatePattern.find((pattern) => pattern.includes('max:'));
  const maxNumber = !maxPattern ? null : Number(maxPattern.split(':')[1]);
  let isValid = false;

  if (validatePattern.includes('required') && element.value === '') {
    addInvalidCondition(element, '空欄にはできません。');
  } else if (minNumber && element.value < minNumber) {
    addInvalidCondition(element, `${minNumber}文字以上にして下さい。`);
  } else if (maxNumber && element.value < maxNumber) {
    addInvalidCondition(element, `${maxNumber}文字以下にして下さい。`);
  } else if (validatePattern.includes('email') && !element.value.match(EMAIL_REGEX)) {
    addInvalidCondition(element, 'メールアドレスの形式として下さい。');
  } else if (
    validatePattern.includes('tel') &&
    (!element.value.match(TEL_REGEX) || element.value.replaceAll('-', '').length < 10)
  ) {
    addInvalidCondition(element, '電話番号を正しく入力して下さい。');
  } else {
    removeInvalidCondition(element);
    isValid = true;
  }
  return isValid;
};

const getValidateFields = (formElement) => {
  return formElement.querySelectorAll('input[data-validate],textarea[data-validate]');
};

const getValidFields = (formElement) => {
  return formElement.querySelectorAll('input.valid,textarea.valid');
};

const changeButtonCondition = (formElement, button) => {
  if (getValidateFields(formElement).length === getValidFields(formElement).length) {
    button.removeAttribute('disabled');
  } else {
    button.disabled = true;
  }
};

export const validateForm = (form, callback) => {
  let sending = false;
  const formElement = document.querySelector(form);
  const validateFields = getValidateFields(formElement);
  const button = formElement.querySelector('.form-button');

  button.disabled = true;

  validateFields.forEach((field) => {
    field.addEventListener('blur', () => {
      validateField(field);
      changeButtonCondition(formElement, button);
    });
  });

  button.addEventListener('click', async () => {
    if (sending) return;

    sending = true;
    let areAllValid = true;

    validateFields.forEach((element) => {
      const isValid = validateField(element);
      if (areAllValid) areAllValid = isValid;
    });

    if (areAllValid) {
      button.value = '送信中……';
      try {
        await callback();
      } catch (e) {
        let errorMessage;
        if (e.message === 'Failed to fetch') {
          errorMessage = '送信に失敗しました。インターネットに接続できているかご確認下さい。';
        } else {
          errorMessage = '送信に失敗しました。時間をおいて再度お試し下さい。';
        }
        console.log(e.message);
        alert(errorMessage);
        button.value = '送信';
        sending = false;
      }
    } else {
      sending = false;
    }
  });
};
