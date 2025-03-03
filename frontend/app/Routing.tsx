import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { StackNavigationProp } from "@react-navigation/stack";
import { Alert, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
  Keyboard,
} from "react-native";

const RoutingSummary = () => {
  const [activeTab, setActiveTab] = useState<"popular" | "browse">("popular");
  const [activeNav, setActiveNav] = useState<string>("Home");
  return (
    <View style={{ flex: 1, backgroundColor: "#181818", padding: 20 }}>
      {/* Header */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Routing Summary
        </Text>
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Location Info */}
      <Text
        style={{
          color: "white",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        VIT CHENNAI - RAPTEE .HV HQ
      </Text>

      {/* Map Placeholder */}
      <View
        style={{
          backgroundColor: "#2A2A2A",
          height: 350,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../assets/images/Map3.png")} // Replace with actual map image
          style={{
            minHeight: 200,
            resizeMode: "cover",
            paddingVertical: 20,
            marginVertical: 20,
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
        />
      </View>

      {/* Route Analysis */}
      <Text
        style={{
          color: "white",
          fontSize: 14,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        As By The Pattern Analyzed Of your Driving you Maintain A 80km/H Speed
        Range. The Battery Charge Is Currently 50% Now Maintain A Pace Of 40km/H
        To Finish The Trip Without Charging In Mid Trip
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#00A884",
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Understood ✔
        </Text>
      </TouchableOpacity>
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

export default RoutingSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 40, // Keeps safe area spacing at the top
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    maxHeight: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  profileText: {
    fontSize: 18,
    color: "#00C2C2",
    fontWeight: "bold",
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
