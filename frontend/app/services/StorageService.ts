import AsyncStorage from '@react-native-async-storage/async-storage';
import {card} from "@/app/entitis/card";

export const SetUserTocken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('user-token', token);
    } catch (error) {
        console.error('Error setting user token:', error);
    }
};

export const GetUserToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('user-token');
        return token;
    } catch (error) {
        console.error('Error getting user token:', error);
        return null;
    }
};

export const RemoveUserToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem('user-token');
    } catch (error) {
        console.error('Error removing user token:', error);
    }
};

export const SetCards = async (cards: card[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(cards);
        await AsyncStorage.setItem('cards', jsonValue);
    } catch (error) {
        console.error('Error setting cards:', error);
    }
}

export const GetCards = async (): Promise<card[]|null> => {
    try {
        const jsonValue = await AsyncStorage.getItem('cards');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error getting cards:', error);
        return null;
    }
}

export const SetFavorites = async (cards: card[]): Promise<void> => {
    try {
        await AsyncStorage.setItem('favorites', JSON.stringify(cards));
    } catch (error) {
        console.error('Error setting favorites:', error);
    }
}

export const GetFavorite = async (): Promise<card[]|null> => {
    try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error getting favorites:', error);
        return null;
    }
}

export const SetIngridients = async (ingridients: string[]): Promise<void> => {
    try {
        await AsyncStorage.setItem('ingridients', JSON.stringify(ingridients));
    } catch (error) {
        console.error('Error setting ingridients:', error);
    }
}

export const GetIngridients = async (): Promise<string[]|null> => {
    try {
        const jsonValue = await AsyncStorage.getItem('ingridients');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error getting ingridients:', error);
        return null;
    }
}