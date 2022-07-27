import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
} from "react-native";
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
    }, [user]);

    React.useEffect(() => {
        getAddress();
        console.log(user.photoURL);
    }, [userData]);

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
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>마이페이지</Text>
                        </View>
                        <View style={styles.profile}>
                            <View style={styles.profileImage}>
                                {user.photoURL !== "" ? (
                                    <Image
                                        source={require(`./components/default.png`)}
                                    />
                                ) : (
                                    <Image
                                        source={require("./components/default.png")}
                                    />
                                )}
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
                        <View style={styles.menu}>
                            <View style={styles.menuItem}>
                                <Image
                                    style={styles.menuImage}
                                    source={require("./components/money.png")}
                                />
                                <Text>거래 내역</Text>
                            </View>
                            <View style={styles.menuItem}>
                                <Image
                                    style={styles.menuImage}
                                    source={require("./components/borrow.png")}
                                />
                                <Text>빌린 내역</Text>
                            </View>
                            <View style={styles.menuItem}>
                                <Image
                                    style={styles.menuImage}
                                    source={require("./components/lent.png")}
                                />
                                <Text>빌려준 내역</Text>
                            </View>
                            <View style={styles.menuItem}>
                                <Image
                                    style={styles.menuImage}
                                    source={require("./components/heart.png")}
                                />
                                <Text>찜 목록</Text>
                            </View>
                        </View>
                        <View style={styles.serviceSetting}>
                            <Text style={{ paddingBottom: 20, color: "grey" }}>
                                서비스 설정
                            </Text>
                            <Text
                                style={{ paddingBottom: 15 }}
                                onPress={() =>
                                    navigation.navigate("ProfileSetting", {
                                        navigation,
                                    })
                                }
                            >
                                프로필 수정
                            </Text>
                            <Text style={{ paddingBottom: 15 }}>앱 설정</Text>
                        </View>
                        <View style={styles.helpCenter}>
                            <Text style={{ paddingBottom: 20, color: "grey" }}>
                                고객센터
                            </Text>
                            <Text style={{ paddingBottom: 15 }}>공지사항</Text>
                            <Text style={{ paddingBottom: 15 }}>
                                자주 묻는 질문
                            </Text>
                            <Text style={{ paddingBottom: 15 }}>
                                문의 및 건의 사항
                            </Text>
                        </View>
                    </ScrollView>
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
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "white",
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
    menuImage: {
        width: 35,
        height: 35,
    },
    menu: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 40,
        marginBottom: 20,
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    menuItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    serviceSetting: {
        paddingLeft: 20,
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    helpCenter: {
        paddingLeft: 20,
    },
});

export default MyPage;
