import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    DeviceEventEmitter,
    Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import NavigationBar from "../navigationBar";
import { theme } from "../colors";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import {
    getDocs,
    collection,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { Input } from "react-native-elements";

const ProfileSetting = ({ navigation }) => {
    const { user } = useAuthentication();
    const firestore = getFirestore();
    const [userData, setUserData] = React.useState([]);

    const [cityLocations, setCityLocation] = React.useState([]);
    const [townLocations, setTownLocation] = React.useState([]);

    const [userValue, setUserValue] = React.useState({
        id: "",
        address_city: undefined,
        address_town: undefined,
        image: "",
        error: "",
    });

    const [city, setCity] = React.useState();
    React.useEffect(() => {
        getCities();
    }, []);
    React.useEffect(() => {
        getTowns(city);
    }, [city]);

    React.useEffect(() => {
        loadUserData();
        setUserValue({
            id: user.displayName,
            address_city: userData[0].city,
            address_town: userData[0].town,
            image: userData[0].image,
            error: "",
        });
    }, [user]);

    const loadUserData = async () => {
        try {
            const userDoc = await getDocs(collection(firestore, "users"));
            const userDataFetched = [];
            userDoc.forEach((doc) => {
                const data = doc.data();
                if (doc.id == user.uid) {
                    userDataFetched.push({ ...data, key: doc.id });
                }
            });
            setUserData(userDataFetched);
            console.log(userData);
        } catch (error) {
            console.log(error.message);
        }
    };

    async function setProfile() {
        try {
            updateProfile(user, {
                displayName: userValue.id,
            });
            const id = user.uid;
            updateDoc(doc(firestore, "users", id), {
                city: userValue.address_city,
                town: userValue.address_town,
                image: userValue.image,
            }).then(() => {
                navigation.navigate("MyPage", { key: id });
            });
        } catch (error) {}
    }

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        const uploadUri =
            Platform.OS === "ios"
                ? "data:image/jpeg;base64," + result.base64
                : result.uri;
        setUserValue({
            ...userValue,
            image: uploadUri,
        });
    };

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
            {user ? (
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>프로필 수정</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.profileImage}>
                            {userData.map((item) => item.image) ? (
                                userData.map((item) => {
                                    <Image source={{ uri: item.image }} />;
                                })
                            ) : (
                                <Image
                                    source={require("./components/default.png")}
                                />
                            )}
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.heading}>아이디</Text>
                        <Input
                            placeholder={user.displayName}
                            containerStyle={styles.control}
                            value={userValue.id}
                            onChangeText={(text) =>
                                setUserValue({ ...userValue, id: text })
                            }
                            autoCompleteType={undefined}
                        />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.imageHeading}>프로필 사진</Text>
                        <TouchableOpacity onPress={selectImage}>
                            <Text style={styles.uploadImage}>
                                사진 업로드하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.addressHeading}>Address</Text>
                    <View style={styles.addressHeading}>
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
                        title="Update"
                        buttonStyle={styles.control}
                        onPress={setProfile}
                    />
                </View>
            ) : (
                <Text>user is undefined</Text>
            )}
            <NavigationBar
                home={false}
                info={false}
                shopping={false}
                chatting={false}
                myPage={true}
                navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 23,
        paddingVertical: 20,
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1,
        marginTop: 30,
    },
    headerText: {
        fontWeight: "700",
        fontSize: 18,
        paddingLeft: 10,
        color: theme.textDark,
    },
    profileImage: {
        backgroundColor: "#E8E8E8",
        borderRadius: 50,
        width: 200,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    control: {
        marginTop: 10,
        width: 300,
    },
    innerContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    heading: {
        fontSize: 15,
        fontWeight: "600",
        paddingRight: 10,
    },
    profileImage: {
        flexDirection: "row",
        alignItems: "center",
    },
    control: {
        marginTop: 10,
        width: 300,
    },
    imageHeading: {
        fontSize: 15,
        fontWeight: "600",
        paddingRight: 10,
        left: -75,
    },
    uploadImage: {
        fontWeight: "bold",
        fontSize: 15,
        paddingRight: 10,
    },
    addressHeading: {
        fontSize: 15,
        fontWeight: "600",
        left: -140,
        paddingTop: 20,
    },
});

export default ProfileSetting;
