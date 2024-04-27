export default function chatInputValidator(e: { target: { value: string; }; }) {
  const inputValue = e.target.value
  const isValid = inputValue.length !== 0;


  if (isValid) {
    this.children.ChatInputField.setProps({ error: false, placeHolder: 'Сообщение' });
  } else {
    this.children.ChatInputField.setProps({ error: true, placeHolder: 'Пусто!' });
  }

  this.setProps({message: inputValue});


}
