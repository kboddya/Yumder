import {sha256, sha256Bytes} from 'react-native-sha256';
import * as ImagePicker from 'expo-image-picker';
import { GetIngredients, SetIngredients } from './StorageService';

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

    if (apiResponse.ok) {
        const data = await apiResponse.json();
        console.log(data)
        return data;
    } else {
        console.error(apiResponse.status.toString());
        return {globalErrorMessage: apiResponse.status.toString()};
    }
}

export async function uploadImageToApi() {              
    // Request permissions first
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        console.log('Permission to access media library denied');
        return { success: false, message: 'Permission denied.' };
    }

    // Pick an image from the device
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
    });

    if (result.canceled || !result.assets?.[0]?.uri) {
        console.log('No image selected.');
        return { success: false, message: 'No image selected.' };
    }

    const uri = result.assets[0].uri;
    const filename = uri.split('/').pop() || 'image.jpg';
    const type = 'image/jpeg';

    // Prepare form data
    const formData = new FormData();
    formData.append('image', {
        uri,
        name: filename,
        type,
    } as any);

    console.log('Uploading image:', { filename, type });

    try {
        const response = await fetch(API_URL+"/upload", {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();
        
        if (response.ok) {
            console.log('Image uploaded successfully');
            
            // Extract ingredients from response
            let ingredients: string[] = [];
            if (responseData.ingredients) {
                ingredients = responseData.ingredients;
            } else if (responseData.error) {
                return { success: false, message: responseData.error };
            } else {
                ingredients = responseData;
            }

            console.log(ingredients);
            await SetIngredients([...ingredients, ...(await GetIngredients() || [])]);

        } else {
            console.log('Upload failed:', responseData.error);
            return { 
                success: false, 
                message: responseData.error || 'Upload failed' 
            };
        }
    } catch (err: any) {
        console.log('Upload error:', err);
        return { success: false, message: 'Network error. Please check your connection.' };
    }
}