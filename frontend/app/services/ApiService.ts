import {sha256, sha256Bytes} from 'react-native-sha256';

const API_URL = "http://192.168.168.34:5001"

export const SignIn = async (email: string, password: string): Promise<{
    success: boolean,
    emailErrorMessage?: string,
    passwordErrorMessage?: string,
    token?: string,
    globalErrorMessage?: string
}> => {
    const apiResponse = await fetch(API_URL + "/sing_in", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: await sha256(password)
        })
    })

    if (apiResponse.ok) {
        const data = await apiResponse.json();
        if (data.success) {
            return {
                success: true,
                token: await sha256(email + await sha256(password))
            };
        } else {
            return {
                success: false,
                emailErrorMessage: data.emailErrorMessage,
                passwordErrorMessage: data.passwordErrorMessage,
                globalErrorMessage: data.globalErrorMessage
            };
        }
    } else {
        return {
            success: false,
            globalErrorMessage: apiResponse.status.toString()
        };
    }
}

export const SignUp = async (email: string, password: string): Promise<{
    success: boolean,
    emailErrorMessage?: string,
    passwordErrorMessage?: string,
    token?: string,
    globalErrorMessage?: string
}> => {
    const apiResponse = await fetch(API_URL + "/sing_in", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: await sha256(password)
        })
    })

    if (apiResponse.ok) {
        const data = await apiResponse.json();
        if (data.success) {
            return {
                success: true,
                token: await sha256(email + await sha256(password))
            };
        } else {
            return {
                success: false,
                emailErrorMessage: data.emailErrorMessage,
                passwordErrorMessage: data.passwordErrorMessage,
                globalErrorMessage: data.globalErrorMessage
            };
        }
    } else {
        return {
            success: false,
            globalErrorMessage: apiResponse.status.toString()
        };
    }
}

export const GetRecepts = async (ingredients: string[]) => {
    const apiResponse = await fetch(API_URL + "/upload_json", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            ingredients: ingredients
        })
    });
    console.log(apiResponse)
    if (apiResponse.ok) {
        const data = await apiResponse.json();
        if (data.success) {
            console.warn(data)
            return data.recepts;
        } else {
            console.error(apiResponse.status.toString());
            return {globalErrorMessage: data.globalErrorMessage};
        }
    } else {
        console.error(apiResponse.status.toString());
        return {globalErrorMessage: apiResponse.status.toString()};
    }
}