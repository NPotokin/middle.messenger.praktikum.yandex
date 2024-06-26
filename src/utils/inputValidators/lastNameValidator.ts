export default function lastNameValidator(e: { target: { value: string; }; }) {
  const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
  const isValid = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(inputValue); // Regular expression for validation

  if (isValid) {
    this.children.SecondNameInput.setProps({ error: false, inputText: null });
  } else {
    this.children.SecondNameInput.setProps({ error: true, inputText: 'Фамилия не значится в реестре ФСБ' });
  }

  this.setProps({lastName: inputValue});

}

