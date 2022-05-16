import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import NavigationBar from "../navigationBar";
import { theme } from "../colors";
import { getAuth } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import * as Progress from "react-native-progress";

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
                        <Text>
                            {userData.map((item) => {
                                if (item.careIndex < 100) {
                                    return (
                                        <View
                                            style={[
                                                styles.circle,
                                                styles.careGrade0,
                                            ]}
                                        >
                                            <Text>0</Text>
                                        </View>
                                    );
                                } else if (item.careIndex < 200) {
                                    return (
                                        <View
                                            style={[
                                                styles.circle,
                                                styles.careGrade1,
                                            ]}
                                        >
                                            <Text>1</Text>
                                        </View>
                                    );
                                } else if (item.careIndex < 300) {
                                    return (
                                        <View
                                            style={[
                                                styles.circle,
                                                styles.careGrade2,
                                            ]}
                                        >
                                            <Text>2</Text>
                                        </View>
                                    );
                                } else if (item.careIndex < 400) {
                                    return (
                                        <View
                                            style={[
                                                styles.circle,
                                                styles.careGrade3,
                                            ]}
                                        >
                                            <Text>3</Text>
                                        </View>
                                    );
                                } else if (item.careIndex < 500) {
                                    return (
                                        <View
                                            style={[
                                                styles.circle,
                                                styles.careGrade4,
                                            ]}
                                        >
                                            <Text>4</Text>
                                        </View>
                                    );
                                } else if (item.careIndex < 600) {
                                    return (
                                        <View
                                            style={[
                                                styles.circle,
                                                styles.careGrade5,
                                            ]}
                                        >
                                            <Text>5</Text>
                                        </View>
                                    );
                                } else if (item.careIndex < 700) {
                                    return (
                                        <View
                                            style={[
                                                styles.circle,
                                                styles.careGrade6,
                                            ]}
                                        >
                                            <Text>6</Text>
                                        </View>
                                    );
                                } else if (700 <= item.careIndex) {
                                    return (
                                        <View
                                            style={[
                                                styles.circle,
                                                styles.careGrade7,
                                            ]}
                                        >
                                            <Text>7</Text>
                                        </View>
                                    );
                                }
                            })}
                        </Text>
                        <Text>
                            {userData.map((item) => {
                                return (
                                    <View style={{ flexDirection: "row" }}>
                                        <Text>{item.careIndex} % </Text>
                                        <Progress.Bar
                                            progress={item.careIndex / 100}
                                            width={200}
                                        />
                                    </View>
                                );
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
        shadowColor: "#E8E8E8",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection: "row",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        borderRadius: 50,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        margin: 10,
    },
    careGrade0: {
        backgroundColor: "#D5C8DB",
    },
    careGrade1: {
        backgroundColor: "#7E51FF",
    },
    careGrade2: {
        backgroundColor: "#5182FF",
    },
    careGrade3: {
        backgroundColor: "#75F3A7",
    },
    careGrade4: {
        backgroundColor: "#E4F963",
    },
    careGrade5: {
        backgroundColor: "#FFD951",
    },
    careGrade6: {
        backgroundColor: "#FFA451",
    },
    careGrade7: {
        backgroundColor: "#FF7051",
    },
});

export default MyPage;
