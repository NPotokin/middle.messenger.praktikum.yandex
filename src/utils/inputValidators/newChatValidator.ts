export default function newChatValidator(e: { target: { value: string; }; }) {
    const inputValue = e.target.value.trim(); 
    const isValid = /^.{1,20}$/.test(inputValue);
  
    if (isValid) {
      this.children.NewChatInput.setProps({ error: false, inputText: null });
    } else {
      this.children.NewChatInput.setProps({ 
        error: true, 
        inputText: 'Название не может быть пустым или больше 20 символов',
        
      });
    }
    // this.setProps({value: inputValue}); 
  }