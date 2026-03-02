import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= TYPEWRITER HOOK ================= */
const useTypewriter = (words: string[], speed = 80, delay = 1500) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const updated = currentWord.substring(0, text.length + 1);
          setText(updated);

          if (updated === currentWord) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          const updated = currentWord.substring(0, text.length - 1);
          setText(updated);

          if (updated === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return text;
};

/* ================= CURSOR ================= */
const Cursor = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.Text style={style} className="text-orange-500">
      |
    </Animated.Text>
  );
};

/* ================= HOME ================= */
const Home = () => {
  const nameText = useTypewriter(["Hi, I'm Ram Surat"]);

  const roleText = useTypewriter([
    "Full Stack Developer",
    "MERN Stack Developer",
    "Frontend Developer",
    "Mobile App Developer",
    "Desktop App Developer",
  ]);

  return (
    <LinearGradient
      colors={["#E6CFC3", "#F4E3D9"]}
      className="flex-1 items-center justify-center"
    >
      <SafeAreaView>
        <View className="rounded-3xl overflow-hidden bg-[#F8F8F8]">
          {/* ================= TOP 50% ================= */}
          <View className="h-1/2 bg-[#E6CFC3] px-5 pt-5">
            {/* Header */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <View className="bg-orange-500 w-10 h-10 rounded-xl items-center justify-center">
                  <Text className="text-white font-bold">R</Text>
                </View>
                <Text className="text-lg font-semibold">Surat</Text>
              </View>

              <View className="w-10 h-10 rounded-xl border border-white/40 items-center justify-center">
                <Text>☰</Text>
              </View>
            </View>

            {/* Image Section */}
            <View className="flex-1 items-center justify-center">
              {/* Orange Background Shape */}
              <View className="absolute w-[85%] h-40 bg-orange-400 rounded-full" />

              {/* Profile Image */}
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                className="w-36 h-36 rounded-full"
              />

              {/* Email */}
              <View className="absolute left-2 bottom-6 flex-row items-center gap-1">
                <Text className="text-red-500">📩</Text>
                <Text className="text-xs text-orange-600">
                  ram.surat.web@gmail.com
                </Text>
              </View>

              {/* Glass Card */}
              <View className="absolute right-2 bottom-4 rounded-2xl p-3 bg-white/20 border border-white/30 shadow-lg">
                <Text className="text-xs font-semibold text-gray-800">
                  12+ Experience ⭐
                </Text>
                <Text className="text-xs text-gray-700">132+ Clients 😍</Text>
                <Text className="text-xs text-gray-700">255+ Projects 😊</Text>
              </View>
            </View>
          </View>

          {/* ================= BOTTOM 50% ================= */}
          <View className="h-1/2 bg-[#F8F8F8] px-6 pt-6 rounded-t-3xl">
            {/* 🔥 Name Typewriter */}
            <View className="flex-row items-center">
              <Text className="text-orange-500 font-semibold text-base">
                {nameText}
              </Text>
              <Cursor />
            </View>

            {/* 🔥 Role Typewriter */}
            <View className="flex-row items-center mt-1">
              <Text className="text-2xl font-bold">{roleText}</Text>
              <Cursor />
            </View>

            {/* Description */}
            <Text className="text-gray-500 mt-3 leading-5">
              Frontend-focused Full Stack Developer with 3 years of experience
              building scalable web and mobile applications using React,
              Next.js, React Native, and Node.js. Skilled in API integration,
              performance optimization and delivering production-ready user
              centric solutions.
            </Text>

            {/* Buttons */}
            <View className="flex-row items-center gap-4 mt-6">
              <TouchableOpacity className="flex-row items-center bg-orange-500 px-5 py-3 rounded-full">
                <Text className="text-white font-semibold">Resume</Text>
                <Text className="text-white ml-2">→</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-orange-500 w-12 h-12 rounded-full items-center justify-center">
                <Text className="text-white">📞</Text>
              </TouchableOpacity>

              <Text className="text-orange-500 font-medium">Call Me Now</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
