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
} from "react-native";
import NavigationBar from "../navigationBar";
import { theme } from "../colors";
import { getAuth } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { Input } from "react-native-elements";

const ProfileSetting = ({ navigation }) => {
    const { user } = useAuthentication();
    const firestore = getFirestore();
    const [userData, setUserData] = React.useState([]);

    const [userValue, setUserValue] = React.useState({
        id: "",
        address_city: undefined,
        address_town: undefined,
        photo: "",
        error: "",
    });

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
            photo: uploadUri,
        });
    };

    return (
        <View style={styles.container}>
            {user ? (
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>프로필 수정</Text>
                    </View>
                    <View style={styles.profileImage}>
                        {user.photoURL ? (
                            <Image source={require("./components/heart.png")} />
                        ) : (
                            <Image
                                source={require("./components/default.png")}
                            />
                        )}
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
                        <Text style={styles.heading}>프로필 사진</Text>
                        <TouchableOpacity onPress={selectImage}>
                            <Text>사진 업로드하기</Text>
                        </TouchableOpacity>
                    </View>
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
        width: 100,
        height: 100,
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
});

export default ProfileSetting;
