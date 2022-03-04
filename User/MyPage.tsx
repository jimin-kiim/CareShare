import { View, StyleSheet, Text } from "react-native";
import NavigationBar from "../navigationBar";
import { theme } from "../colors";

const MyPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>마이페이지</Text>
            </View>
            <View style={styles.profile}></View>
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
    profile: {
        flexDirection: "row",
    },
});

export default MyPage;
