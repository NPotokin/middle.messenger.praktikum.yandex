export default function emailValidator(e) {
  const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
  const isValid = /^[a-zA-Z0-9_-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(inputValue); // Regular expression for validation

  if (isValid) {
    this.children.EmailInput.setProps({ error: false, inputText: null });
  } else {
    this.children.EmailInput.setProps({ error: true, inputText: 'Ошибочка' });
  }

  this.setProps({email: inputValue});

}

