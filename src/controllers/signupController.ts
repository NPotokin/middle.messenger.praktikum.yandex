import { SignupAPI } from "../api/signupApi.ts";

class SignupController{
    public static createNewUser(data: Record<string, unknown>){
        SignupAPI.signup(data)
        // .then(data => store.set('user', data))
    }
}

export default SignupController