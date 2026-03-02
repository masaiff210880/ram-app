import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  const IntroVideo = require("../assets/video/intro.mp4");

  // 🎬 Video Player
  const player = useVideoPlayer(IntroVideo, (player) => {
    player.loop = true;
    player.muted = false;
    player.play(); // ✅ initial play
  });

  // ✅ Play again when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      try {
        player.currentTime = 0; // ✅ reset video
        player.play(); // ✅ play again
      } catch (e) {
        console.log("Play error:", e);
      }

      return () => {
        try {
          player.pause(); // ✅ safe pause
        } catch (e) {
          console.log("Pause error:", e);
        }
      };
    }, [player]),
  );

  // 👉 Navigate
  const handlePress = () => {
    try {
      player.pause();
    } catch {}
    router.push("/(tabs)");
  };

  // 🔥 Animations
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.08, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    translateX.value = withRepeat(withTiming(6, { duration: 600 }), -1, true);
  }, []);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="flex-1 bg-black">
      <StatusBar hidden />

      {/* Loader */}
      {!isReady && (
        <View className="absolute w-full h-full justify-center items-center z-10">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* Video */}
      <VideoView
        player={player}
        contentFit="cover"
        nativeControls={false}
        onFirstFrameRender={() => setIsReady(true)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: isReady ? 1 : 0,
        }}
      />

      {/* Button */}
      <View className="flex-1 justify-end items-center pb-16">
        <AnimatedPressable onPress={handlePress} style={animatedButtonStyle}>
          <View className="flex-row items-center px-20 py-5 rounded-full bg-white shadow-lg">
            <Text className="text-black font-semibold mr-2 text-base">
              Know More
            </Text>

            <Animated.View style={arrowStyle}>
              <Ionicons name="arrow-forward" size={18} color="black" />
            </Animated.View>
          </View>
        </AnimatedPressable>
      </View>
    </View>
  );
}
