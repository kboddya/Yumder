// app/(tabs)/home.tsx

import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Swiper, type SwiperCardRefType} from 'rn-swiper-list';
import {card} from '@/app/entitis/card';


const cardList: card[] = [
    {
        name: 'Spaghetti Carbonara',
        image: 'https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg',
        cookingTime: '20 mins'
    },
    {
        name: 'Chicken Alfredo',
        image: 'https://midwestfoodieblog.com/wp-content/uploads/2023/07/chicken-alfredo-1-2.jpg',
        cookingTime: '30 mins'
    },
    {
        name: 'Beef Stroganoff',
        image: 'https://www.allrecipes.com/thmb/mSWde3PHTu-fDkbvWBw0D1JlS8U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25202beef-stroganoff-iii-ddmfs-3x4-233-0f26fa477e9c446b970a32502468efc6.jpg',
        cookingTime: '40 mins'
    },
]

export default function HomeScreen() {
    const ref = React.useRef<SwiperCardRefType>(null);
    const renderCard = useCallback((cardElement: card) => {
        console.log(cardElement);
        return (
            <View style={[styles.renderCardContainer, {backgroundColor: 'lightgray'}]}>
                <Image
                    source={{uri: cardElement.image}}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
                <View>
                    <Text style={styles.title}>{cardElement.name}</Text>
                    <Text>Cooking time: {cardElement.cookingTime}</Text>
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
                    ref={ref}
                    renderCard={renderCard}
                    OverlayLabelLeft={OverlayLabelLeft}
                    OverlayLabelRight={OverlayLabelRight}
                    cardStyle={styles.cardStyle}
                    overlayLabelContainerStyle={styles.overlayLabelContainer}
                    disableTopSwipe
                    disableBottomSwipe
                    onSwipeRight={(card) => console.log('Swiped Right:', cardList[card].name)}
                    onSwipeLeft={(card) => console.log('Swiped Left:', cardList[card].name)}

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
        height: '61%',
        marginHorizontal: 20,
        marginTop: "16%",
        width: '90%',
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 2},
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
        // elevation: 5,
    },
    renderCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: '60%',
        width: '90%',
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 2},
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
        // elevation: 5,
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