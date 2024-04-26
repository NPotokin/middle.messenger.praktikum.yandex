export default function passwordValidator(e: { target: { value: string; }; }) {
  const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
  const isValid = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/.test(inputValue); // Regular expression for validation

  if (isValid) {
    this.children.PasswordInput.setProps({ error: false, inputText: null });
  } else {
    this.children.PasswordInput.setProps({ error: true, inputText: 'Ошибочка' });
  }
  this.setProps({password: inputValue});
}

