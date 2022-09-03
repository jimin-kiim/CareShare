import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Home/Home";
import PostForm from "../Home/PostForm";
import PostDetail from "../Home/PostDetail";
import MyPage from "../User/MyPage";
import ProfileSetting from "../User/ProfileSetting";
import Shopping from "../Shopping/shoppingMain";
import Info from "../Info/InfoMain";

const Stack = createStackNavigator();

export default function UserStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "#ffffff" },
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="PostDetail" component={PostDetail} />
                <Stack.Screen name="PostForm" component={PostForm} />
                <Stack.Screen name="MyPage" component={MyPage} />
                <Stack.Screen name="Shopping" component={Shopping} />
                <Stack.Screen
                    name="ProfileSetting"
                    component={ProfileSetting}
                />
                <Stack.Screen name="Info" component={Info} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
