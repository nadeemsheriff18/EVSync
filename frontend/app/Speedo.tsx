import React, { useState, useEffect } from "react";
import Speed from "./Speed";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SosScreen = () => {
  const [countdown, setCountdown] = useState(1);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [mapOpacity, setMapOpacity] = useState(new Animated.Value(1));
  const [activeTab, setActiveTab] = useState<"popular" | "browse">("popular");
  const [activeNav, setActiveNav] = useState<string>("Home");

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
        <Text style={styles.sosText}>Your Roll !</Text>
        {/* <Text style={styles.timerText}>{countdown} Seconds</Text> */}
      </LinearGradient>

      {/* Other Elements */}
      <View style={styles.otherContainer}>
        {/* Cancel Button */}
        <Speed />

        {/* Blinking Map (opacity effect) */}

        {/* Info Card appears after 6 seconds */}

        {/* Footer Message */}
      </View>
      <View style={styles.bottomNav}>
        {["Home", "Favorites", "Map", "Settings"].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.navItem}
            onPress={() => {
              setActiveNav(item);
              if (item !== "Home") {
                Alert.alert(
                  `${item} Screen`,
                  `The ${item} screen would open here in the complete app.`,
                  [{ text: "OK" }]
                );
              }
            }}
          >
            <Text
              style={[
                styles.navText,
                activeNav === item && styles.activeNavText,
              ]}
            >
              {item}
            </Text>
            {/* {activeNav === item && <View style={styles.navIndicator} />} */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 20,
  },
  header: {
    width: "100%",
    paddingVertical: 10,
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
    marginTop: 10,
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    maxHeight: 80,
  },

  searchContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  clearButton: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  clearButtonText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchHistoryContainer: {
    backgroundColor: "#222",
    marginHorizontal: 20,
    marginTop: -5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    zIndex: 10,
  },
  searchHistoryTitle: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  searchHistoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  searchHistoryText: {
    color: "#fff",
    fontSize: 16,
  },
  clearHistoryButton: {
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 5,
  },
  clearHistoryText: {
    color: "#00C2C2",
    fontSize: 14,
  },
  titleContainer: {
    backgroundColor: "#00C2C2",
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 28,
    maxWidth: 250,
    paddingLeft: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 30,
  },
  filterText: {
    color: "#bbb",
  },
  filterButtonText: {
    color: "#00C2C2",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#222",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
  },
  currentCard: {
    flexDirection: "row",
    backgroundColor: "#222",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#00C2C2",
  },
  cardContent: {
    flex: 1,
  },
  soundName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  soundDescription: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
  },
  date: {
    color: "#bbb",
  },
  durationButton: {
    backgroundColor: "#00C2C2",
    padding: 8,
    borderRadius: 20,
    minWidth: 60,
    alignItems: "center",
  },
  durationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "#00C2C2",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tabTextInactive: {
    color: "#bbb",
  },
  list: {
    marginBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  noResultsText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  noResultsSubText: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 5,
  },
  searchSuggestionButton: {
    marginTop: 15,
    backgroundColor: "#00C2C2",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  searchSuggestionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#181818",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },

  navItem: {
    alignItems: "center",
    paddingVertical: 8,
    flex: 1, // Makes sure each item takes equal space
  },
  navText: {
    color: "#888",
    fontSize: 14,
  },
  activeNavText: {
    color: "#fff",
    fontWeight: "bold",
    borderBottomWidth: 3, // Full-width underline
    borderBottomColor: "#00A884",
    paddingBottom: 5, // Space for the underline
  },

  //   navIndicator: {
  //     width: 6,
  //     height: 6,
  //     borderRadius: 3,
  //     backgroundColor: "#00A884",
  //     marginTop: 4,
  //   },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#222",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalSubtitle: {
    color: "#bbb",
    fontSize: 16,
    marginBottom: 10,
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#333",
  },
  selectedFilter: {
    backgroundColor: "#00C2C2",
  },
  filterOptionText: {
    color: "#fff",
  },
  selectedFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#00C2C2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    color: "#bbb",
    fontSize: 14,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#00C2C2",
    fontSize: 22,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#bbb",
    fontSize: 12,
  },
});
