import { SignupAPI } from '../api/signupApi.ts';
import store from '../core/Store.ts';

class SignupController{
  public static async createNewUser(data: Record<string, unknown>){
    try{
      await SignupAPI.signup(data);
      console.log('signup succesful');
      await this.getUserDataToStore()
      window.router.go('/chat')
    } catch(error){
      console.log('error Signin');
    }
  };

  public static async loginUser(data: Record<string, unknown>){
    try {
      await SignupAPI.login(data)
      console.log('login Success')
      await this.getUserDataToStore()
      window.router.go('/chat')
    } catch (error) {
      console.log('error Login');
    }
  }

  public static async logoutUser(){
    try {
      await SignupAPI.logout()
      sessionStorage.setItem('appState','{}');
      console.log('See you later alligator')
      window.router.go('/login')
    } catch (error) {
      console.log('Error logging out')
    }
  }
  
  private static async getUserDataToStore() {
    try {
      const xhr = await SignupAPI.getUser();
      if (xhr.status === 200) {
        const userData = JSON.parse(xhr.responseText);
        store.setUser(userData);
        console.log('User data fetched and store updated:', userData);
      } else {
        throw new Error('Failed to fetch user data: ' + xhr.statusText);
      }
    } catch (error) {
      console.log('Failed to fetch user data:', error);
    }
  }
  
}
export default SignupController;