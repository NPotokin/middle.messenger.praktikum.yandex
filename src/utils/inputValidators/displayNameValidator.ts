export default function displayNameValidator(e: { target: { value: string; }; }) {
  const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
  const isValid = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(inputValue); // Regular expression for validation

  if (isValid) {
    this.children.DisplayNameInput.setProps({ error: false, inputText: null });
  } else {
    this.children.DisplayNameInput.setProps({ error: true, inputText: 'А это точно Ваше имя?' });
  }

  this.setProps({displayName: inputValue});

}

