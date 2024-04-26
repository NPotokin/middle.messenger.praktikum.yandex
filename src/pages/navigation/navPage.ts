import Block from '../../core/Block.ts';

export default class NavigationPage extends Block{
  constructor(props:{}){
    super(props);
  }

  render(){
    return(`
        <nav>
            <ul>
                <li><a href="#" page="loginPage">Login Page</a></li>
                <li><a href="#" page="signInPage">SignIn Page</a></li>
                <li><a href="#" page="errorPage404">Error Page 404</a></li>
                <li><a href="#" page="errorPage500">Error Page 500</a></li>
                <li><a href="#" page="chatPage">Chat Page</a></li>
                <li><a href="#" page="profilePage">Profile Page</a></li>
            </ul>
        </nav>
        `);
  }
}
