import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { City, Town } from "./address";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

const auth = getAuth();
const firestore = getFirestore();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [userValue, setUserValue] = React.useState({
        email: "",
        password: "",
        id: "",
        address_city: undefined,
        address_town: undefined,
        error: "",
    });

    const [city, setCity] = React.useState();

    async function signUp() {
        if (userValue.email === "" || userValue.password === "") {
            setUserValue({
                ...userValue,
                error: "Email and password are mandatory.",
            });
            return;
        }

        try {
            await createUserWithEmailAndPassword(
                auth,
                userValue.email,
                userValue.password
            )
                .then((userData) => {
                    updateProfile(userData.user, {
                        displayName: userValue.id,
                        photoURL: "./components/default.png",
                    });
                    setDoc(
                        doc(firestore, "users", userData.user.uid, "address"),
                        {
                            city: userValue.address_city,
                            town: userValue.address_town,
                        }
                    );
                })
                .then(() => {
                    sendEmailVerification(auth.currentUser);
                });
        } catch (error) {
            setUserValue({
                ...userValue,
                error: error.message,
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text>Signup screen!</Text>

            {!!userValue.error && (
                <View style={styles.error}>
                    <Text>{userValue.error}</Text>
                </View>
            )}

            <View style={styles.controls}>
                <Input
                    placeholder="Email"
                    containerStyle={styles.control}
                    value={userValue.email}
                    onChangeText={(text) =>
                        setUserValue({ ...userValue, email: text })
                    }
                    // leftIcon={<Icon
                    //   name='envelope'
                    //   size={16} />}
                    autoCompleteType={undefined}
                />

                <Input
                    placeholder="ID"
                    containerStyle={styles.control}
                    value={userValue.id}
                    onChangeText={(text) =>
                        setUserValue({ ...userValue, id: text })
                    }
                    autoCompleteType={undefined}
                />

                <Input
                    placeholder="Password"
                    containerStyle={styles.control}
                    value={userValue.password}
                    onChangeText={(text) =>
                        setUserValue({ ...userValue, password: text })
                    }
                    secureTextEntry={true}
                    // leftIcon={<Icon
                    //   name='key'
                    //   size={16} />}
                    autoCompleteType={undefined}
                />

                <Text>Address</Text>
                <View>
                    <Picker
                        selectedValue={userValue.address_city}
                        onValueChange={(itemValue, itemIndex) =>
                            setUserValue({
                                ...userValue,
                                address_city: itemValue,
                            })
                        }
                    >
                        <Picker.Item label="시/도 선택" value="" />
                        <Picker.Item label="서울특별시" value="Seoul" />
                        <Picker.Item label="인천광역시" value="Incheon" />
                        <Picker.Item label="대전광역시" value="Daejeon" />
                        <Picker.Item label="광주광역시" value="Gwangju" />
                        <Picker.Item label="대구광역시" value="Daegu" />
                        <Picker.Item label="울산광역시" value="Ulsan" />
                        <Picker.Item label="부산광역시" value="Busan" />
                        <Picker.Item label="경기도" value="Gyeonggi" />
                        <Picker.Item label="강원도" value="Gangwon" />
                        <Picker.Item label="충청북도" value="Chungbuk" />
                        <Picker.Item label="충청남도" value="Chungnam" />
                        <Picker.Item label="전라북도" value="Jeonbuk" />
                        <Picker.Item label="전라남도" value="Jeonnam" />
                        <Picker.Item label="경상북도" value="Gyeongbuk" />
                        <Picker.Item label="경상남도" value="Gyeongnam" />
                        <Picker.Item label="제주도" value="Jeju" />
                    </Picker>
                    <Picker
                        selectedValue={userValue.address_town}
                        onValueChange={(itemValue, itemIndex) => {
                            setUserValue({
                                ...userValue,
                                address_town: itemValue,
                            });
                            setCity(itemValue);
                            console.log(city);
                        }}
                    >
                        <Picker.Item label="군/구 선택" value="" />
                        <Town city={city} />
                    </Picker>
                </View>

                <Button
                    title="Sign up"
                    buttonStyle={styles.control}
                    onPress={signUp}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    controls: {
        flex: 1,
    },

    control: {
        marginTop: 10,
        width: 300,
    },

    error: {
        marginTop: 10,
        padding: 10,
        color: "#fff",
        backgroundColor: "#D54826FF",
    },
});

export default SignUpScreen;
