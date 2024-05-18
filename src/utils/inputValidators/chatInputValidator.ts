export default function chatInputValidator(e: { target: { value: string; }; }) {
  const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
  const isValid = /.+/.test(inputValue); // Regular expression for validation


  if (isValid) {
    this.children.ErrorLine.setProps({ error: false, ErrorText: null });
  } else {
    this.children.ErrorLine.setProps({ error: true, ErrorText: 'Сообщение не может быть пустым' });
  }

  this.setProps({message: inputValue});


}
