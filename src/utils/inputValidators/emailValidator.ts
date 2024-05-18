export default function emailValidator(e: { target: { value: string; }; }) {
  const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
  const isValid = /^[a-zA-Z0-9_-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(inputValue); // Regular expression for validation

  if (isValid) {
    this.children.EmailInput.setProps({ error: false, inputText: null });
  } else {
    this.children.EmailInput.setProps({ error: true, inputText: 'Не похоже на адрес электронной почты' });
  }

  this.setProps({email: inputValue});

}

