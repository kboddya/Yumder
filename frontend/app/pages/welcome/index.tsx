import {View, Text, Button} from "react-native";
import {Link, router} from "expo-router";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{
                fontSize: 24,
                fontWeight: "bold",
            }}>Welcome to the Yumder!
            </Text>
            <Text style={{
                marginTop: 15,
                backgroundColor: '#4C4C4C',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                fontSize: 16,
                color: 'white',
            }}
                  onPress={() => router.push("/pages/welcome/Auth")}
            >
                Let's start
            </Text>
        </View>
    )
}