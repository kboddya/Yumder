import {View, Text, TextInput, StyleSheet} from "react-native";
import {useState} from "react";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: "bold",
                paddingHorizontal: "17%",
                textAlign: "center",
                marginBottom: 15,
            }}>
                Login to your account
            </Text>
            <View style={{width: "70%"}}>
                <TextInput
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    textContentType={"emailAddress"}
                    placeholder="Enter your email"
                    style={{
                        height: 50,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginBottom: 15,
                        fontSize: 17,
                    }}
                    placeholderTextColor={"#868686"}
                />

                <TextInput
                    placeholder="Enter your password"
                    onChangeText={setPassword}
                    textContentType={"password"}
                    secureTextEntry={true}
                    style={{
                        height: 50,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginBottom: 15,
                        fontSize: 17,
                    }}
                    placeholderTextColor={"#868686"}
                />
                <View style={{width: "80%", flexDirection: "row", justifyContent: "space-between", alignSelf: "center"}}>
                    <Text style={styles.button}>
                        Sign In
                    </Text>
                    <Text style={styles.button}>
                        Sign Up
                    </Text>
                </View>

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        backgroundColor: '#4C4C4C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        fontSize: 18,
        color: 'white',
        textAlign: "center",
    }
});