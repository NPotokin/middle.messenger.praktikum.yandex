import { UserAPI } from "../api/userAPI.ts";
import store from "../core/Store.ts";

class UserController {
    public static async changePassword(data: Record<string, unknown>) {
        try {
            const xhr = await UserAPI.passwordChange(data);
            if (xhr.status === 200) {
                console.log('Password changed successfully');
            } else {
                throw xhr;
            }
        } catch (xhr) {
            this.handleError(xhr, 'Password change failed');
        }
    }

    public static async changeInfo(data: Record<string, unknown>) {
        try {
            const xhr = await UserAPI.profileDataChange(data);
            if (xhr.status === 200) {
                const userData = JSON.parse(xhr.responseText);
                store.setUser(userData);
                console.log('User data updated successfully:', userData);
            } else {
                throw xhr;
            }
        } catch (xhr) {
            this.handleError(xhr, 'Error updating user data');
        }
    }

    public static async changeAvatar(data: FormData) {
        try {
            const xhr = await UserAPI.profileChangeAvatar(data);
            if (xhr.status === 200) {
                const userData = JSON.parse(xhr.responseText);
                store.setUser(userData);
                console.log('Avatar updated successfully:', userData);
            } else {
                throw xhr;
            }
        } catch (xhr) {
            this.handleError(xhr, 'Error updating avatar');
        }
    }

    private static handleError(xhr: XMLHttpRequest, defaultMessage: string) {
        console.error(defaultMessage, xhr.statusText);
        switch (xhr.status) {
            case 400:
                alert('Bad request: Please check your data and try again.');
                break;
            case 401:
                alert('Unauthorized: Please login again.');
                window.router.go('/login');
                break;
            case 500:
                window.router.go('/error500');
                break;
            default:
                alert('An unexpected error occurred. Please try again later.');
                break;
        }
    }
}

export default UserController;
