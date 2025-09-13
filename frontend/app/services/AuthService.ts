import {SignUp, SignIn} from "@/app/services/ApiService"

export default class AuthService {

    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    private checkMailAndPassword(): {
        success: boolean,
        email: string,
        password: string
    } {
        const response = {
            success: true,
            email: "",
            password: ""

        };
        if (this.email.length === 0) {
            response.success = false;
            response.email = "Email is required";
        }

        if (this.password.length === 0) {
            response.success = false;
            response.password = "Password is required";
        }

        if (!response.success) return response;

        if (!this.email.includes("@")) {
            response.success = false;
            response.email += "Invalid email format";
        }
        if (this.password.length < 8) {
            response.success = false;
            response.password += "Password must be longer";
        }

        return response;
    }

    async SignIn(): Promise<{
        success: boolean,
        email: string,
        password: string

    }> {
        const responseMailChaker = this.checkMailAndPassword();
        if (!responseMailChaker.success) return responseMailChaker;

        const response = {
            success: true,
            email: "",
            password: ""
        };

        return response;
    }

    async SignUp() :Promise<{
        success: boolean,
        email: string,
        password: string
    }> {
        const responseMailChaker = this.checkMailAndPassword();
        if (!responseMailChaker.success) return responseMailChaker;

        const response = {
            success: true,
            email: "",
            password: ""
        };

        return response;
    }

}