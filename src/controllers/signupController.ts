import { SignupAPI } from '../api/signupApi.ts';

class SignupController{
  public static async createNewUser(data: Record<string, unknown>){

    try{
      await SignupAPI.signup(data);
      console.log('signup succesful');
    } catch(error){
      console.log('error');
    }

  }
}

export default SignupController;
