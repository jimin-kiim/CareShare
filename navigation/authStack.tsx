import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../Home/Welcome";
import SignInScreen from "../User/SignInScreen";
import SignOutScreen from "../User/SignUpScreen";
import MyPage from "../User/MyPage";
import Home from "../Home/Home";

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Sign In" component={SignInScreen} />
                <Stack.Screen name="Sign Up" component={SignOutScreen} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
