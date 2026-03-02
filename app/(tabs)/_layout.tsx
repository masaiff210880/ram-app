import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const TabBar = ({ state, navigation }: any) => {
  const open = useSharedValue(0);

  const toggleMenu = () => {
    open.value = open.value === 0 ? 1 : 0;
  };

  const isActive = (name: string) => state.routes[state.index].name === name;

  const handleNav = (name: string) => {
    open.value = 0;
    navigation.navigate(name);
  };

  /* FAB Animation */
  const fabStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(open.value, [0, 1], [0, 45])}deg` },
      { scale: withSpring(open.value ? 1.1 : 1) },
    ],
  }));

  /* Menu Animation */
  const menuStyle = useAnimatedStyle(() => ({
    opacity: withTiming(open.value, { duration: 200 }),
    transform: [
      { translateY: withSpring(open.value ? 0 : 30) },
      { scale: withSpring(open.value ? 1 : 0.85) },
    ],
  }));

  return (
    <>
      {/* Floating Menu */}
      <Animated.View
        style={menuStyle}
        className="absolute bottom-32 mb-6 self-center"
      >
        <TouchableOpacity
          onPress={() => handleNav("project")}
          className="flex-row items-center bg-indigo-500 px-5 py-3 rounded-full mb-3 shadow-lg"
        >
          <Ionicons name="briefcase" size={22} color="#fff" />
          <Text className="text-white ml-3 text-base font-semibold">
            Project
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNav("education")}
          className="flex-row items-center bg-indigo-500 px-5 py-3 rounded-full mb-3 shadow-lg"
        >
          <Ionicons name="school" size={22} color="#fff" />
          <Text className="text-white ml-3 text-base font-semibold">
            Education
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNav("contact")}
          className="flex-row items-center bg-indigo-500 px-5 py-3 rounded-full shadow-lg"
        >
          <Ionicons name="person" size={22} color="#fff" />
          <Text className="text-white ml-3 text-base font-semibold">
            Contact
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Bar */}
      <View className="absolute bottom-5 w-full items-center">
        <View className="flex-row bg-indigo-50 w-[92%] px-6 py-4 rounded-full justify-between items-center shadow-xl">
          {/* Home */}
          <TouchableOpacity
            onPress={() => handleNav("index")}
            className={`flex-row items-center px-4 py-2 rounded-full ${
              isActive("index") ? "bg-indigo-500" : ""
            }`}
          >
            <Ionicons
              name="home"
              size={26}
              color={isActive("index") ? "#fff" : "#6366f1"}
            />
            {isActive("index") && (
              <Text className="text-white ml-2 text-base font-semibold">
                Home
              </Text>
            )}
          </TouchableOpacity>

          {/* About */}
          <TouchableOpacity
            onPress={() => handleNav("about")}
            className={`flex-row items-center px-4 py-2 rounded-full ${
              isActive("about") ? "bg-indigo-500" : ""
            }`}
          >
            <Ionicons
              name="information-circle"
              size={26}
              color={isActive("about") ? "#fff" : "#6366f1"}
            />
            {isActive("about") && (
              <Text className="text-white ml-2 text-base font-semibold">
                About
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* 🔥 Fixed Center FAB */}
        <TouchableOpacity
          onPress={toggleMenu}
          activeOpacity={0.8}
          className="absolute bottom-10"
          style={{
            left: "50%",
            transform: [{ translateX: -34 }],
          }}
        >
          <Animated.View
            style={fabStyle}
            className="bg-indigo-500 p-5 rounded-full shadow-xl"
          >
            <Ionicons name="add" size={28} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="about" />
      <Tabs.Screen name="project" />
      <Tabs.Screen name="education" />
      <Tabs.Screen name="contact" />
    </Tabs>
  );
}
