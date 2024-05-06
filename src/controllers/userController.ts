import { UserAPI } from "../api/userAPI.ts";
import store from "../core/Store.ts";

class UserController {
    public static async changePassword(data: Record<string, unknown>){
        try {
            await UserAPI.passwordChange(data)
            console.log('Password changed succesfully')
        } catch (error) {
            console.log('Password changed failed')
        }
    }

     public static async changeInfo(data: Record<string, unknown>){
        try {
            const xhr = await UserAPI.profileDataChange(data)
            if (xhr.status === 200) {
                const userData = JSON.parse(xhr.responseText);
                store.setUser(userData);
                console.log('User data fetched and store updated:', userData);
              } else {
                throw new Error('Failed to fetch user data: ' + xhr.statusText);}
        } catch (error) {
            console.log('Error changing data')
        }
     }

     public static async changeAvatar(data: FormData){
        try {
            await UserAPI.profileChangeAvatar(data)
            console.log('Avatar changed')
        } catch (error) {
            console.log('Avatar change error')
        }
     }
}

export default UserController