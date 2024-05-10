import { SignupAPI } from '../api/signupApi.ts';
import store from '../core/Store.ts';

class SignupController {
  public static async createNewUser(data: Record<string, unknown>) {
    try {
      const xhr = await SignupAPI.signup(data);
      if (xhr.status === 200) {
        console.log('Signup successful');
        await this.getUserDataToStore();
        window.router.go('/messenger');
      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error during signup');
    }
  }

  public static async loginUser(data: Record<string, unknown>) {
    try {
      const xhr = await SignupAPI.login(data);
      if (xhr.status === 200) {
        console.log('Login Success');
        await this.getUserDataToStore();

      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error during login');
    }
  }

  public static async logoutUser() {
    try {
      const xhr = await SignupAPI.logout();
      if (xhr.status === 200) {
        sessionStorage.setItem('appState', '{}');
        console.log('Logged out successfully');
        window.router.go('/login');
      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error during logout');
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
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Failed to fetch user data');
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

export default SignupController;
