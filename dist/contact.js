/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/contact.js":
/*!***********************!*\
  !*** ./js/contact.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _form_validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-validation.js */ \"./js/form-validation.js\");\n\n\nwindow.addEventListener('DOMContentLoaded', () => {\n  const url = `https://cheyonly.microcms.io/api/v1/contact`;\n  const headers = {\n    'X-WRITE-API-KEY': '880ecf07-15fc-4e55-a407-74f7b6ce96dc',\n    'Content-Type': 'application/json',\n  };\n  const EMAIL_REGEX = /^[\\w+\\-.]+@[a-z\\d\\-.]+\\.[a-z]+$/;\n  const TEL_REGEX = /^0\\d{1,3}-?\\d{2,4}-?\\d{3,4}$/;\n\n  const getPostParams = () => {\n    const name = document.getElementById('contact-name').value;\n    const email = document.getElementById('contact-email').value;\n    const tel = document.getElementById('contact-tel').value;\n    const body = document.getElementById('contact-body').value;\n\n    return JSON.stringify({ name, email, tel, body });\n  };\n\n  const postForm = async () => {\n    const response = await fetch(url, {\n      method: 'POST',\n      headers,\n      body: getPostParams(),\n    });\n    if (!response.ok) throw new Error(response.statusText);\n    location.href = '/contact-success.html';\n  };\n\n  (0,_form_validation_js__WEBPACK_IMPORTED_MODULE_0__.validateForm)('.form', postForm);\n\n  // if (loading) return;\n  // const name = document.getElementById('contact-name');\n  // const email = document.getElementById('contact-email');\n  // const tel = document.getElementById('contact-tel');\n  // const body = document.getElementById('contact-body');\n\n  // エラーがあればエラーメッセージを追加\n\n  // エラーメッセージが全てなければ true, エラーメッセージが１つでもあれば false とする\n  // const isValid = [...document.querySelectorAll('.valid-feedback')].every((e) => e.textContent === '');\n  // if (!isValid) return;\n\n  // console.log('送信ボタンが押されました');\n  // loading = true;\n  // button.value = '送信中……';\n  // button.disabled = true;\n  // try {\n  //   await new Promise((resolve) => setTimeout(resolve, 2000));\n\n  //   // const response = await fetch(url, {\n  //   //   method: 'POST',\n  //   //   headers,\n  //   //   body: getPostParams(),\n  //   // });\n  //   // if (!response.ok) throw new Error();\n  //   location.href = '/contact-success.html';\n  // } catch (e) {\n  //   console.log('送信に失敗しました。');\n  //   button.value = '送信';\n  //   button.removeAttribute('disabled');\n  // }\n});\n\n\n//# sourceURL=webpack://portfolio/./js/contact.js?");

/***/ }),

/***/ "./js/form-validation.js":
/*!*******************************!*\
  !*** ./js/form-validation.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validateForm\": () => (/* binding */ validateForm)\n/* harmony export */ });\n// 以下のような HTML 構造とする\n//\n// <div>\n//   <div class=\"form-group\">\n//     <input type=\"email\" data-validate=\"email\" />\n//     <div class=\"valid-feedback\"></div>\n//   </div>\n//   <div class=\"form-group\">\n//     <textarea type=\"text\" data-validate=\"required|max:2000\"></textarea>\n//     <div class=\"valid-feedback\"></div>\n//   </div>\n// </div>\n\n// 【1】フィールドは form-group のクラスを付けたタグで囲む\n// 【2】バリデーションを入れたい input タグ, もしくは textarea タグ に data-validate 属性を追加\n// 【3】form-group のクラスを付けたタグ内に,  valid-feedback クラスを付けたタグを追加（エラーメッセージの表示箇所を指定）\n\n// バリデーションは以下に対応\n// required --> 空欄禁止\n// min:8    --> 8文字以上\n// max:2000 --> 2000文字以内\n// email    --> email の形式\n// tel      --> 電話番号 の形式\n//\n// 複数指定する場合は | を使用\n// （例）data-validate=\"required|max:2000\"\n\nconst EMAIL_REGEX = /^[\\w+\\-.]+@[a-z\\d\\-.]+\\.[a-z]+$/;\nconst TEL_REGEX = /^0\\d{1,3}-?\\d{2,4}-?\\d{3,4}$/;\nconst submitButton = document.querySelector('input[type=\"submit\"]');\n\nconst addInvalidCondition = (element, message) => {\n  if (message) {\n    element.classList.remove('valid');\n    element.classList.add('invalid');\n  }\n  // メッセージを追加\n  element.closest('.form-group').querySelector('.invalid-feedback').textContent = message;\n};\n\nconst removeInvalidCondition = (element) => {\n  addInvalidCondition(element, '');\n  element.classList.remove('invalid');\n  element.classList.add('valid');\n};\n\nconst validateField = (element, type) => {\n  const validatePattern = element.dataset.validate.split('|');\n  const minPattern = validatePattern.find((pattern) => pattern.includes('min:'));\n  const minNumber = !minPattern ? null : Number(minPattern.split(':')[1]);\n  const maxPattern = validatePattern.find((pattern) => pattern.includes('max:'));\n  const maxNumber = !maxPattern ? null : Number(maxPattern.split(':')[1]);\n  let isValid = false;\n  const skipInvalid =\n    type === 'input' && !element.classList.contains('valid') && !element.classList.contains('invalid');\n\n  if (validatePattern.includes('required') && element.value === '') {\n    if (!skipInvalid) addInvalidCondition(element, '空欄にはできません。');\n  } else if (minNumber && element.value.length < minNumber) {\n    if (!skipInvalid) addInvalidCondition(element, `${minNumber}文字以上にして下さい。`);\n  } else if (maxNumber && element.value.length > maxNumber) {\n    if (!skipInvalid) addInvalidCondition(element, `${maxNumber}文字以下にして下さい。`);\n  } else if (validatePattern.includes('email') && !element.value.match(EMAIL_REGEX)) {\n    if (!skipInvalid) addInvalidCondition(element, 'メールアドレスの形式\bとして下さい。');\n  } else if (\n    validatePattern.includes('tel') &&\n    (!element.value.match(TEL_REGEX) || element.value.replaceAll('-', '').length < 10)\n  ) {\n    if (!skipInvalid) addInvalidCondition(element, '電話番号を正しく入力して下さい。');\n  } else {\n    removeInvalidCondition(element);\n    isValid = true;\n  }\n  return isValid;\n};\n\nconst getValidateFields = (formElement) => {\n  return formElement.querySelectorAll('input[data-validate],textarea[data-validate]');\n};\n\nconst getValidFields = (formElement) => {\n  return formElement.querySelectorAll('input.valid,textarea.valid');\n};\n\nconst changeButtonCondition = (formElement, button) => {\n  if (getValidateFields(formElement).length === getValidFields(formElement).length) {\n    button.removeAttribute('disabled');\n  } else {\n    button.disabled = true;\n  }\n};\n\nconst setInitialCount = (formElement) => {\n  formElement.querySelectorAll('.form-count').forEach((formCount) => {\n    const formControl = formCount.closest('.form-group').querySelector('.form-control');\n    formCount.querySelector('.current').textContent = formControl.value.length;\n    const validatePattern = formCount.closest('.form-group').querySelector('.form-control').dataset.validate.split('|');\n    const maxPattern = validatePattern.find((pattern) => pattern.includes('max:'));\n    const maxNumber = !maxPattern ? null : Number(maxPattern.split(':')[1]);\n    formCount.querySelector('.max').textContent = maxNumber;\n  });\n};\n\nconst setCount = (field) => {\n  const formCount = field.closest('.form-group').querySelector('.form-count');\n  if (!formCount) return;\n  const length = field.value.length;\n  const maxLength = Number(formCount.querySelector('.max').textContent);\n  formCount.querySelector('.current').textContent = field.value.length;\n  if (length > maxLength) {\n    formCount.classList.add('count-over');\n  } else {\n    formCount.classList.remove('count-over');\n  }\n};\n\nconst validateForm = (form, callback) => {\n  const formElement = document.querySelector(form);\n  const validateFields = getValidateFields(formElement);\n  const button = formElement.querySelector('.form-button');\n\n  let sending = false;\n  button.disabled = true;\n  setInitialCount(formElement);\n\n  validateFields.forEach((field) => {\n    field.addEventListener('blur', (e) => {\n      validateField(field, e.type);\n      changeButtonCondition(formElement, button);\n    });\n  });\n\n  validateFields.forEach((field) => {\n    field.addEventListener('input', (e) => {\n      validateField(field, e.type);\n      setCount(field);\n      changeButtonCondition(formElement, button);\n    });\n  });\n\n  button.addEventListener('click', async () => {\n    if (sending) return;\n\n    sending = true;\n    let areAllValid = true;\n\n    validateFields.forEach((element) => {\n      const isValid = validateField(element, 'click');\n      if (areAllValid) areAllValid = isValid;\n    });\n\n    if (areAllValid) {\n      button.value = '送信中……';\n      try {\n        await callback();\n      } catch (e) {\n        let errorMessage;\n        if (e.message === 'Failed to fetch') {\n          errorMessage = '送信に失敗しました。インターネットに接続できているかご確認下さい。';\n        } else {\n          errorMessage = '送信に失敗しました。時間をおいて再度お試し下さい。';\n        }\n        console.log(e.message);\n        alert(errorMessage);\n        button.value = '送信';\n        sending = false;\n      }\n    } else {\n      sending = false;\n    }\n  });\n};\n\n\n//# sourceURL=webpack://portfolio/./js/form-validation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/contact.js");
/******/ 	
/******/ })()
;