import { View, StyleSheet, Text, Image } from "react-native";
import NavigationBar from "../navigationBar";
import { theme } from "../colors";
import { getAuth } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";

const auth = getAuth();

const MyPage = ({ navigation }) => {
    const { user } = useAuthentication();
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
                        <Text>{user.displayName}</Text>
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
    },
    profileImage: {
        backgroundColor: "#E8E8E8",
        borderRadius: 20,
        width: 100,
        height: 100,
    },
});

export default MyPage;
