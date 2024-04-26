export default function firstNameValidator(e: { target: { value: string; }; }) {
  const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
  const isValid = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(inputValue); // Regular expression for validation

  if (isValid) {
    this.children.FirstNameInput.setProps({ error: false, inputText: null });
  } else {
    this.children.FirstNameInput.setProps({ error: true, inputText: 'Ошибочка' });
  }

  this.setProps({firstName: inputValue});

}

