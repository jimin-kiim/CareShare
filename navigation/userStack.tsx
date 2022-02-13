import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Home/Home";
import PostForm from "../Home/PostForm";
import PostDetail from "../Home/PostDetail";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="NewPost" component={PostForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
