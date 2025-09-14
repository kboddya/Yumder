import {GetRecepts} from "@/app/services/ApiService";
import {GetIngredients, SetIngredients, SetCards} from "@/app/services/StorageService";

export const GenerReceps = async () => {
    const ingredients = await GetIngredients();
    if (!ingredients) return {globalErrorMessage: "No ingredients found."};

    const response = await GetRecepts(ingredients);
    if ('globalErrorMessage' in response) {
        return {success: false, globalErrorMessage: response.globalErrorMessage};
    } else {
        await SetCards(response);
        console.log(response);
        return {success: true};
    }
    // await
    //     SetCards([{
    //         name: 'Classic Margherita Pizza',
    //         ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Fresh basil', 'Olive oil'],
    //         instructions: 'Spread tomato sauce on dough, add cheese, bake at 220°C for 12 min, top with basil and drizzle olive oil.',
    //         time_consumed: '20 min',
    //         energy_value_score: '320 kcal',
    //         url_to_picture: 'https://images.example.com/margherita.jpg'
    //     },
    //         {
    //             name: 'Chicken Caesar Salad',
    //             ingredients: ['Romaine lettuce', 'Grilled chicken breast', 'Parmesan', 'Croutons', 'Caesar dressing'],
    //             instructions: 'Toss lettuce with dressing, add sliced chicken, sprinkle parmesan and croutons.',
    //             time_consumed: '15 min',
    //             energy_value_score: '280 kcal',
    //             url_to_picture: 'https://images.example.com/caesar.jpg'
    //         }])
    // return {success: true};
};