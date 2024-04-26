export default function phoneValidator(e: { target: { value: string; }; }) {
  const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
  const isValid = /^\+?[0-9]{10,15}$/.test(inputValue); // Regular expression for validation

  if (isValid) {
    this.children.PhoneInput.setProps({ error: false, inputText: null });
  } else {
    this.children.PhoneInput.setProps({ error: true, inputText: 'Мы не смогли дозвониться по этому номеру' });
  }

  this.setProps({phone: inputValue});

}

