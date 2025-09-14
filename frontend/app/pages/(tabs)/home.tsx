// app/(tabs)/home.tsx

import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Swiper, type SwiperCardRefType} from 'rn-swiper-list';
import {GetCards, UpdateFavoriteRecepts, GetIngredients, SetCards, GetFavorite} from "@/app/services/StorageService";
import {GenerReceps} from "@/app/services/FoodService";
import {card} from '@/app/entitis/card';


export default function HomeScreen() {
    const [cardList, setCardList] = useState<card[]>([]);
    const [currentIngredients, setCurrentIngredients] = useState<string[]>([]);
    const [remainingCards, setRemainingCards] = useState<number>(-1);
    const [changedIngredients, setChangedIngredients] = useState<boolean>(false);
    const [appStart, setAppStart] = useState<boolean>(true);
    const [inWork, setInWork] = useState<boolean>(false);
    useEffect(() => {
        if (appStart) {
            GetFavorite().then(res => {
                if (res) setCardList(res.slice(0, 3));
            });
            setRemainingCards(cardList.length);
            setAppStart(false);
        }

        if ((remainingCards <= 3 || changedIngredients) && !inWork) {
            setInWork(true);
            if (changedIngredients) setChangedIngredients(false);
            console.log("Fetching new recipes due to ingredient change or initial load.");
            GenerReceps().then(res => {
                if (res.success) {
                    GetCards().then(cards => {
                        if (cards) {
                            setCardList([...cardList, ...cards]);
                            setRemainingCards(remainingCards + cards.length);
                            setInWork(false);
                        }
                    });
                }
            })

        }
    });

    GetIngredients().then(res => {
        if (res && JSON.stringify(res) !== JSON.stringify(currentIngredients)) {
            setCurrentIngredients(res);
            setChangedIngredients(true);
        }
    });

    const onSwipeRight = (cardIndex: number) => {
        UpdateFavoriteRecepts(cardList[cardIndex]);
        setRemainingCards(remainingCards - 1);
    }

    const onSwipeLeft = (cardIndex: number) => {
        setRemainingCards(remainingCards - 1);
        SetCards(cardList.filter((_, index) => index !== cardIndex));
    }

    const ref = React.useRef<SwiperCardRefType>(null);
    const renderCard = useCallback((cardElement: card) => {
        return (
            <View style={[styles.renderCardContainer, {backgroundColor: '#d97706'}]}>
                <Image
                    source={{uri: cardElement.url_to_picture}}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
                <View>
                    <Text style={[styles.title, {color: "white"}]}>{cardElement.name}</Text>
                    <Text style={{color: "white", fontSize: 18}}>Cooking time: {cardElement.time_consumed}</Text>
                    <Text style={{color: "white", fontSize: 18}}>Score: {cardElement.energy_value_score} {cardElement.energy_value_score?.toString().includes("kcal")? "" : "kcal"}</Text>
                </View>
            </View>
        )
    }, []);
    const OverlayLabelRight = useCallback(() => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: 'green',
                    },
                ]}
            />
        );
    }, []);
    const OverlayLabelLeft = useCallback(() => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: 'red',
                    },
                ]}
            />
        );
    }, []);
    return (
        <GestureHandlerRootView style={styles.containerStyles}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Swiper
                    data={cardList}
                    key={cardList.map(card => card.name).join('-')}
                    ref={ref}
                    renderCard={renderCard}
                    OverlayLabelLeft={OverlayLabelLeft}
                    OverlayLabelRight={OverlayLabelRight}
                    cardStyle={styles.cardStyle}
                    overlayLabelContainerStyle={styles.overlayLabelContainer}
                    disableTopSwipe
                    prerenderItems={5}
                    disableBottomSwipe
                    onSwipeRight={async (card) => onSwipeRight(card)}
                    onSwipeLeft={async (card) => onSwipeLeft(card)}
                    onSwipedAll={() => {
                        setRemainingCards(-1);
                    }}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    containerStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    overlayLabelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        borderRadius: 15,
        height: '60%',
        marginHorizontal: 20,
        marginTop: "16.7%",
        width: '90%',
    },
    renderCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: '60%',
        width: '90%',
    },
    cardImage: {
        width: "90%",
        height: '70%',
        borderRadius: 10.83,
        marginBottom: 16,
    },
    cardStyle: {
        width: '90%',
        height: '90%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayLabelContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});