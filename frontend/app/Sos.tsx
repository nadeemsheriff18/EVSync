import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SosScreen = () => {
  const [countdown, setCountdown] = useState(1);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [mapOpacity, setMapOpacity] = useState(new Animated.Value(1));

  // Countdown Timer
  useEffect(() => {
    if (countdown < 6) {
      const timer = setTimeout(() => setCountdown(countdown + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowInfoCard(true); // Show info card after 6 sec
    }
  }, [countdown]);

  // Blinking Map Effect (opacity change)
  useEffect(() => {
    if (!showInfoCard) {
      const blinkAnimation = setInterval(() => {
        Animated.timing(mapOpacity, {
          toValue: mapOpacity._value === 1 ? 0.2 : 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 500);
      return () => clearInterval(blinkAnimation);
    } else {
      // Ensure final opacity is 1
      Animated.timing(mapOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showInfoCard]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.profileText}>My Profile</Text>
        </TouchableOpacity>
      </View>

      {/* SOS Timer with Gradient */}
      <LinearGradient
        colors={["#003C3C", "#00C2C2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.sosContainer}
      >
        <Text style={styles.sosText}>SOS</Text>
        <Text style={styles.timerText}>{countdown} Seconds</Text>
      </LinearGradient>

      {/* Other Elements */}
      <View style={styles.otherContainer}>
        {/* Cancel Button */}
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        {/* Blinking Map (opacity effect) */}
        <Animated.View style={[styles.mapContainer, { opacity: mapOpacity }]}>
          <Image
            source={require("../assets/images/Map1.png")} // Replace with actual map image
            style={styles.mapImage}
          />
        </Animated.View>

        {/* Info Card appears after 6 seconds */}
        {showInfoCard && (
          <View style={styles.infoCard}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.userName}>Ashwath Ratan</Text>
              <Text style={styles.arrivalText}>Arrival 10 Mins</Text>
            </View>
            <Text style={styles.distanceText}>3 Km Away</Text>
          </View>
        )}

        {/* Footer Message */}
        <Text style={styles.footerText}>Ambulance Is On The Way</Text>
        <Text style={styles.footerText}>Hang Tight !!</Text>
      </View>
    </View>
  );
};

export default SosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 40,
  },
  header: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  profileText: {
    color: "#00C2C2",
    fontSize: 18,
    fontWeight: "bold",
  },
  sosContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 1,
    marginTop: 20,
  },
  sosText: {
    fontSize: 44,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  timerText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  otherContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 30,
  },
  cancelButton: {
    backgroundColor: "#E57373",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  cancelText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  mapContainer: {
    width: 280,
    height: 280,
    backgroundColor: "#222",
    borderRadius: 140,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 140,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  infoTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  arrivalText: {
    fontSize: 14,
    color: "#00C2C2",
  },
  distanceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00C2C2",
  },
  footerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00C2C2",
    marginTop: 20,
  },
});
