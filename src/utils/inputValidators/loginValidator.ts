export default function loginValidator(e: { target: { value: string; }; }) {
  const inputValue = e.target.value.trim(); 
  const isValid = /^[a-zA-Zа-яА-Я0-9_-]{3,20}$/.test(inputValue); 


  if (isValid) {
    this.children.LoginInput.setProps({ error: false, inputText: null });
  } else {
    this.children.LoginInput.setProps({ error: true, inputText: 'Как будто закралась ошибка' });
  }

  this.setProps({login: inputValue});


}
