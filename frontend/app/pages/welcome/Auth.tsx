import {View, Text, TextInput, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import AuthService from "@/app/services/AuthService";
import {router} from "expo-router";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authService = new AuthService(email, password);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    useEffect(() => {
        if (emailErrorMessage !== "") {
            setEmail("");
        }
        if (passwordErrorMessage !== "") {
            setPassword("");
        }
    }, [emailErrorMessage, passwordErrorMessage]);
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
                    value={email}
                    textContentType={"emailAddress"}
                    placeholder={emailErrorMessage === "" ? "Enter your email" : emailErrorMessage}
                    style={[emailErrorMessage === "" ? {borderColor: "gray"} : {borderColor: "red"}, styles.input]}
                    placeholderTextColor={emailErrorMessage === "" ? "#868686" : "red"}
                />

                <TextInput
                    placeholder={passwordErrorMessage === "" ? "Enter your password" : passwordErrorMessage}
                    onChangeText={setPassword}
                    value={password}
                    textContentType={"password"}
                    secureTextEntry={true}
                    style={[passwordErrorMessage === "" ? {borderColor: "gray"} : {borderColor: "red"}, styles.input]}
                    placeholderTextColor={passwordErrorMessage === "" ? "#868686" : "red"}
                />
                <View
                    style={{width: "80%", flexDirection: "row", justifyContent: "space-between", alignSelf: "center"}}>
                    <Text style={styles.button} onPress={() => {
                        authService.SignIn().then(res => {
                            console.log(res);
                            if (res.success) {
                                router.replace("/pages/(tabs)/home");
                            }
                            setEmailErrorMessage(res.email);
                            setPasswordErrorMessage(res.password);
                        })
                    }}>
                        Sign In
                    </Text>
                    <Text style={styles.button} onPress={() => {
                        authService.SignUp().then(res => {
                            console.log(res);
                            if (res.success) {
                                router.replace("/pages/(tabs)/home");
                            }
                            setEmailErrorMessage(res.email);
                            setPasswordErrorMessage(res.password);
                        })
                    }}>
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
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 17,
    }
});