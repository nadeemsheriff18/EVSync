import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Audio } from "expo-av";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const lastPlayedSound = useRef<string | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSpeed((prevSpeed) => (prevSpeed < 100 ? prevSpeed + 10 : prevSpeed));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setSpeed(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const getSoundPath = (speed: number) => {
    if (speed < 10) return require("../assets/1to101.wav");
    if (speed < 20) return require("../assets/10to201.wav");
    if (speed < 30) return require("../assets/20to301.wav");
    if (speed < 40) return require("../assets/3oto401.wav");
    if (speed < 50) return require("../assets/40to501.wav");
    return require("../assets/50to111.wav");
  };

  useEffect(() => {
    const playSound = async () => {
      const soundPath = getSoundPath(speed);
      if (!soundPath) return;

      // Avoid replaying the same sound file if speed remains in the same range
      if (lastPlayedSound.current === soundPath.toString()) return;

      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(soundPath);
      soundRef.current = sound;

      // Apply smooth fade-in and playback settings
      await sound.setStatusAsync({
        shouldPlay: true,
        volume: 1, // Start at low volume
        rate: 1, // Slightly slowed down for a soft effect
        isLooping: false,
      });

      // Gradually increase volume for smooth transition
      setTimeout(async () => {
        await sound.setStatusAsync({ volume: 1.0 });
      }, 500); // 0.5s fade-in effect

      lastPlayedSound.current = soundPath.toString();
    };

    if (speed > 0) {
      playSound();
    } else if (soundRef.current) {
      soundRef.current.stopAsync();
      soundRef.current.unloadAsync();
      soundRef.current = null;
      lastPlayedSound.current = null;
    }
  }, [speed]);

  return (
    <View style={styles.container}>
      <Svg width="250" height="150" viewBox="0 0 250 150">
        <Path
          d="M 25 130 A 100 100 0 0 1 225 130"
          fill="none"
          stroke="#444"
          strokeWidth="15"
        />
        <Path
          d="M 25 130 A 100 100 0 0 1 225 130"
          fill="none"
          stroke="#00C2C2"
          strokeWidth="10"
          strokeDasharray="400"
          strokeDashoffset={350 - (speed / 100) * 390}
        />
      </Svg>
      <Text style={styles.speedText}>{speed} km/h</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={isRunning ? "Stop" : "Start"}
          onPress={() => setIsRunning(!isRunning)}
        />
      </View>
    </View>
  );
};

export default Speedometer;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  speedText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginVertical: 20,
  },

  buttonContainer: { flexDirection: "row", gap: 20 },
});
