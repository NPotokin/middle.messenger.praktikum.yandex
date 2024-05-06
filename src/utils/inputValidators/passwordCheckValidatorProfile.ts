export default function passwordCheckValidatorProfile(e: { target: { value: string; }; }) {
  const inputValue = e.target.value.trim();
  const isMatch = inputValue === this.props.newPassword; // Compare with password set in props

  if (isMatch) {
    this.children.PasswordCheckInput.setProps({ error: false, inputText: null });
  } else {
    this.children.PasswordCheckInput.setProps({ error: true, inputText: 'К сожалению, пароли не совпадают' });
  }
}
