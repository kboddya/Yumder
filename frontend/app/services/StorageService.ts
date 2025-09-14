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
        console.log("Data to save in stor", jsonValue)
        await AsyncStorage.setItem('cards', jsonValue);
    } catch (error) {
        console.error('Error setting cards:', error);
    }
}

export const GetCards = async (): Promise<card[]|null> => {
    try {
        const jsonValue = await AsyncStorage.getItem('cards');
        console.log("data from stor:", jsonValue)
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

export const SetIngredients = async (ingridients: string[]): Promise<void> => {
    try {
        await AsyncStorage.setItem('ingredients', JSON.stringify(ingridients));
    } catch (error) {
        console.error('Error setting ingridients:', error);
    }
}

export const GetIngredients = async (): Promise<string[]|null> => {
    try {
        const jsonValue = await AsyncStorage.getItem('ingredients');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error getting ingridients:', error);
        return null;
    }
}

export const GetFavoriteRecepts = async (): Promise<card[]|null> => {
    try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        if (jsonValue === null) return null;
        let parsed = JSON.parse(jsonValue);
        parsed = parsed.map((item: card, i: number) => {
            item.id = i;
            return item;
        })
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error getting favorite recepts:', error);
        return null;
    }
}

export const UpdateFavoriteRecepts = async (cardToAdd: card): Promise<void> => {
    try {
        const currentFavorites = await GetFavoriteRecepts() || [];
        const alreadyExists = currentFavorites.some(
            (card) => card.name.toLowerCase() === cardToAdd.name.toLowerCase() && card.url_to_picture === cardToAdd.url_to_picture
        );

        if (alreadyExists) {
            console.log('Card already in favorites');
            return;
        }

        const updatedFavorites = [cardToAdd, ...currentFavorites];
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        const currentCards = await GetCards() || [];
        SetCards(currentCards.filter(card => card.name !== cardToAdd.name && card.url_to_picture !== cardToAdd.url_to_picture));
    } catch (error) {
        console.error('Error updating favorite recepts:', error);
    }
}

export const RemoveFavoriteRecepts = async (cardToRemove: card): Promise<void> => {
    try {
        const currentFavorites = await GetFavoriteRecepts() || [];
        const updatedFavorites = currentFavorites.filter(card => !(card.name === cardToRemove.name && card.url_to_picture === cardToRemove.url_to_picture && card.id === cardToRemove.id && card.time_consumed === cardToRemove.time_consumed && card.energy_value_score === cardToRemove.energy_value_score));
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
        console.error('Error removing favorite recepts:', error);
    }
}

export const GetReceptById = async (id: number): Promise<card | null> => {
    try {
        const currentFavorites = await GetFavoriteRecepts() || [];
        console.log(id)
        console.log(currentFavorites[id]);
        return currentFavorites[id] || null;
    } catch (error) {
        console.error('Error getting recept by id:', error);
        return null;
    }
}