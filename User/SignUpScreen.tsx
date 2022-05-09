import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";

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
        care_index: 0,
    });
    const [cityLocations, setCityLocation] = React.useState([]);
    const [townLocations, setTownLocation] = React.useState([]);
    const [city, setCity] = React.useState();
    useEffect(() => {
        getCities();
    }, []);
    useEffect(() => {
        getTowns(city);
    }, [city]);
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
                    setDoc(doc(firestore, "users", userData.user.uid), {
                        city: userValue.address_city,
                        town: userValue.address_town,
                        careIndex: userValue.care_index,
                    });
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
        setCityLocation(json.regcodes);
    };

    const getTowns = async (city) => {
        let response;
        if (city === "1100000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=11*`
            );
        } else if (city === "2600000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=26*`
            );
        } else if (city === "2700000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=27*`
            );
        } else if (city === "2800000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=28*`
            );
        } else if (city === "2900000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=29*`
            );
        } else if (city === "3000000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=30*`
            );
        } else if (city === "3100000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=31*`
            );
        } else if (city === "4100000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=41*`
            );
        } else if (city === "4200000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=42*`
            );
        } else if (city === "4300000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=43*`
            );
        } else if (city === "4400000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=44*`
            );
        } else if (city === "4500000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=45*`
            );
        } else if (city === "4600000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=46*`
            );
        } else if (city === "4700000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=47*`
            );
        } else if (city === "4800000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=48*`
            );
        } else if (city === "5000000000") {
            response = await fetch(
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=50*`
            );
        }
        const json = await response.json();
        setTownLocation(json.regcodes);
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
                        }}
                    >
                        <Picker.Item label="시/도 선택" value="" />
                        {cityLocations.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.name}
                                    value={item.code}
                                    key={item.code}
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
                        {townLocations.map((item) => {
                            const str = item.name;
                            if (parseInt(item.code) <= 3100000000) {
                                return (
                                    <Picker.Item
                                        label={str.slice(6)}
                                        value={item.code}
                                    />
                                );
                            } else if (parseInt(item.code) <= 4200000000) {
                                return (
                                    <Picker.Item
                                        label={str.slice(4)}
                                        value={item.code}
                                        key={item.code}
                                    />
                                );
                            } else if (parseInt(item.code) <= 4800000000) {
                                return (
                                    <Picker.Item
                                        label={str.slice(5)}
                                        value={item.code}
                                    />
                                );
                            } else {
                                return (
                                    <Picker.Item
                                        label={str.slice(8)}
                                        value={item.code}
                                    />
                                );
                            }
                        })}
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
