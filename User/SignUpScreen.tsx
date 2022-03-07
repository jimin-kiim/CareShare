import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { Town } from "./address";
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
import { useEffect } from "react";

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
    const [locations, setLocation] = React.useState([]);
    const [city, setCity] = React.useState();
    useEffect(() => {
        getCities();
    }, []);
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
    const getCities = async () => {
        const response = await fetch(
            `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000`
        );
        const json = await response.json();
        setLocation(json.regcodes);
        console.log("json.regcodes", json.regcodes);
    };

    const renderCity = async () => {
        console.log(locations);
        // locations.map((item) => {
        //     console.log(item.name);
        // });
        locations.map((item) => {
            return <Picker.Item label={item.name} value={item.code} />;
        });
    };

    const renderTown = (city) => {
        if (city === undefined) {
            return Town[0].map((item) => {
                return <Picker.Item label={item[0]} value={item[1]} />;
            });
        } else if (city === "Incheon") {
            return Town[1].map((item) => {
                return <Picker.Item label={item[0]} value={item[1]} />;
            });
        }
    };

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
                        onValueChange={(itemValue, itemIndex) => {
                            setUserValue({
                                ...userValue,
                                address_city: itemValue,
                            });
                            setCity(itemValue);
                            console.log(city);
                        }}
                    >
                        <Picker.Item label="시/도 선택" value="" />
                        {locations.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.name}
                                    value={item.code}
                                />
                            );
                        })}
                    </Picker>
                    <Picker
                        selectedValue={userValue.address_town}
                        onValueChange={(itemValue, itemIndex) => {
                            setUserValue({
                                ...userValue,
                                address_town: itemValue,
                            });
                        }}
                    >
                        <Picker.Item label="군/구 선택" value="" />
                        {renderTown(city)}
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
