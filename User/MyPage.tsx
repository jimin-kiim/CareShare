import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import NavigationBar from "../navigationBar";
import { theme } from "../colors";
import { getAuth } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getDocs, collection, getFirestore } from "firebase/firestore";

const auth = getAuth();

const MyPage = ({ navigation }) => {
    const { user } = useAuthentication();
    const firestore = getFirestore();
    const [userData, setUserData] = React.useState([]);
    const [userLocation, setUserLocation] = React.useState();

    React.useEffect(() => {
        loadUserData();
        getAddress();
    }, []);

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
        } catch (error) {
            console.log(error.message);
        }
    };

    const getAddress = async () => {
        let response;
        response = await fetch(
            `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${userData[0].town}`
        );
        const json = await response.json();
        setUserLocation(json.regcodes[0].name);
    };

    return (
        <View style={styles.container}>
            {user ? (
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>마이페이지</Text>
                    </View>
                    <View style={styles.profile}>
                        <View style={styles.profileImage}>
                            <Image
                                source={require("../assets/defaultProfile.png")}
                            />
                        </View>
                        <Text
                            style={{
                                paddingLeft: 20,
                                paddingTop: 12,
                                fontSize: 25,
                            }}
                        >
                            {user.displayName}
                        </Text>
                        <Text
                            style={{
                                paddingLeft: 10,
                                paddingTop: 20,
                                color: "grey",
                            }}
                        >
                            {userLocation}
                        </Text>
                    </View>
                    <View style={styles.shadowBox}>
                        <Text>케어지수</Text>
                        <Text style={{ paddingLeft: 10, paddingTop: 12 }}>
                            {userData.map((item) => {
                                return <Text>{item.careIndex}</Text>;
                            })}
                        </Text>
                    </View>
                    <NavigationBar
                        home={false}
                        info={false}
                        shopping={false}
                        chatting={false}
                        myPage={true}
                        navigation={navigation}
                    />
                </View>
            ) : (
                <Text>user is undefined</Text>
            )}
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
    profile: {
        flexDirection: "row",
        paddingLeft: 20,
        marginTop: 10,
    },
    profileImage: {
        backgroundColor: "#E8E8E8",
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    shadowBox: {
        marginHorizontal: 30,
        marginVertical: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

export default MyPage;
