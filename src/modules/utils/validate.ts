const validate = {
    input: function(e, componentKey, regex, errorMessage){
        const inputValue= e.target.value.trim();
        const isValid = regex.test(inputValue);

        if(isValid){
            this.children[componentKey].setProps({ error: false, inputText: null});
        } else {
            this.children[componentKey].setProps({ error: true, inputText: errorMessage });
        }

        this.setProps({[componentKey]: inputValue});
    },

    email: function(e) {
        const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
        this.input(e, 'EmailInput', emailRegex, 'А это точно почта?');
    },

    firstName: function(e) {
        const firstNameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
        this.input(e, 'FirstNameInput', firstNameRegex, 'Хорошая попытка, но нет' )
    },

    lastName: function(e) {
        const lasttNameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
        this.input(e, 'SecondNameInput', lasttNameRegex, 'Фамилия не значится в реестре ФСБ')
    },
    
    phone: function(e) {
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        this.input(e, 'PhoneInput', phoneRegex, 'Мы не смогли дозвониться по этому номеру' )
    },
    
    login: function(e) {
        console.log('click')
        const loginRegex = /^[a-zA-Zа-яА-Я0-9_-]{3,20}$/;
        this.input(e, 'LoginInput', loginRegex, 'Попробуйте еще раз, что-то пошло не так')
    },

    password: function(e) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
        this.input(e, 'PasswordInput', passwordRegex, 'Слишком просто, заставьте хакеров попотеть!')
    },

    checkPasswordMatch: function(e, newPasswordKey, oldPasswordKey) {
        const newPasswordValue = this.props[newPasswordKey];
        const oldPasswordValue = e.target.value.trim();
    
        if (newPasswordValue === oldPasswordValue) {
          this.children[oldPasswordKey].setProps({ error: false, inputText: null });
        } else {
          this.children[oldPasswordKey].setProps({ error: true, inputText: 'Пароли не совпадают' });
        }
    }
}

export default validate;