export default function loginValidator(e) {
  const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
  const isValid = /^[a-zA-Zа-яА-Я0-9_-]{3,20}$/.test(inputValue); // Regular expression for validation

  if (isValid) {
    this.children.LoginInput.setProps({ error: false, inputText: null });
  } else {
    this.children.LoginInput.setProps({ error: true, inputText: 'Ошибочка' });
  }

  this.setProps({login: inputValue});

}

