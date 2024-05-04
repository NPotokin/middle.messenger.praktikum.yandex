import { SignupAPI } from '../api/signupApi.ts';
import { Store, User } from '../core/Store.ts';

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
  
  private static async getUserDataToStore() {
    try {
      const xhr = await SignupAPI.getUser();
      if (xhr.status === 200) {
        const userData = JSON.parse(xhr.responseText);
        window.store.setUser(userData);
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