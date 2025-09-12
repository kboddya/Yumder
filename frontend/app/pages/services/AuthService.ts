export default class AuthService {

    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }


    async signIn(): Promise<{
        success: boolean;
        message: string;
    }> {
        const respons = {
            success: true,
            message: ""
        }
        if (!this.email.includes("@")) {
            respons.success = false;
            respons.message = "Invalid email format";
        }
        if (this.password.length < 6) {
            respons.success = false;
            respons.message = "Password must be at least 6 characters long";
        }
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Here you would normally call your backend API to authenticate the user
        // For this example, we'll just simulate a successful login
        return respons;
    }

}