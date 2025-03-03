import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, Alert, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
  Keyboard,
} from "react-native";
// Define the navigation parameter types
type RootStackParamList = {
  Home: undefined;
  MyTrips: undefined;
  TripDetails: { tripId: number };
  Settings: undefined;
};

type MyTripsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MyTrips"
>;

// Define interface for the component props
interface MyTripsProps {
  navigation: MyTripsScreenNavigationProp;
}

// Define the trip interface
interface Trip {
  id: number;
  title: string;
  distance: string;
  time: string;
  charge: string;
  waitingTime: string;
  date: string;
  period: string;
}

const MyTrips: React.FC<MyTripsProps> = ({ navigation }) => {
  // State for the selected date and time period
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(1);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("All Media");
  const [activeTab, setActiveTab] = useState<"popular" | "browse">("popular");
  const [activeNav, setActiveNav] = useState<string>("Home");

  // Sample trip data
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 1,
      title: "Chennai-Pondi",
      distance: "56km",
      time: "45 Min",
      charge: "50",
      waitingTime: "21 Mins",
      date: "Tue 12",
      period: "Morning",
    },
    {
      id: 2,
      title: "Tambaram-Kilpauk",
      distance: "32km",
      time: "43 Min",
      charge: "98",
      waitingTime: "5 Mins",
      date: "Tue 12",
      period: "Morning",
    },
    {
      id: 3,
      title: "Anna Nagar-Adyar",
      distance: "28km",
      time: "38 Min",
      charge: "75",
      waitingTime: "12 Mins",
      date: "Tue 13",
      period: "Evening",
    },
    {
      id: 4,
      title: "T.Nagar-Velachery",
      distance: "18km",
      time: "25 Min",
      charge: "82",
      waitingTime: "8 Mins",
      date: "Tue 14",
      period: "Night",
    },
  ]);

  // Available dates and time periods
  const dates: string[] = ["Tue 11", "Tue 12", "Tue 13", "Tue 14", "Tue 15"];
  const timePeriods: string[] = ["Morning", "Evening", "Night"];
  const filterOptions: string[] = [
    "All Media",
    "Shortest",
    "Longest",
    "Most Recent",
  ];

  // Handle back button press
  const handleBack = (): void => {
    // In a real app, this would navigate back
    navigation.goBack();
  };

  // Handle settings button press
  const handleSettings = (): void => {
    navigation.navigate("Settings");
  };

  // Handle date selection
  const handleDateSelect = (index: number): void => {
    setSelectedDateIndex(index);
  };

  // Handle time period selection
  const handleTimeSelect = (index: number): void => {
    setSelectedTimeIndex(index);
  };

  // Handle filter press
  const handleFilterPress = (): void => {
    Alert.alert(
      "Filter Options",
      "Select filter option",
      filterOptions.map((option) => ({
        text: option,
        onPress: () => setSelectedFilter(option),
      }))
    );
  };

  // Handle trip option press
  const handleTripOptions = (tripId: number): void => {
    Alert.alert("Trip Options", "Select an option", [
      { text: "View Details", onPress: () => handleViewTripDetails(tripId) },
      { text: "Share Trip", onPress: () => handleShareTrip(tripId) },
      { text: "Delete Trip", onPress: () => handleDeleteTrip(tripId) },
    ]);
  };

  // Handle viewing trip details
  const handleViewTripDetails = (tripId: number): void => {
    navigation.navigate("TripDetails", { tripId });
  };

  // Handle sharing trip
  const handleShareTrip = (tripId: number): void => {
    Alert.alert("Share Trip", `Sharing trip ${tripId}`);
  };

  // Handle deleting trip
  const handleDeleteTrip = (tripId: number): void => {
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTrips(trips.filter((trip) => trip.id !== tripId));
          Alert.alert("Success", "Trip deleted successfully");
        },
      },
    ]);
  };

  // Filter trips based on selected date and time period
  const filteredTrips = trips.filter((trip) => {
    const dateMatch = trip.date === dates[selectedDateIndex];
    const timeMatch =
      selectedTimeIndex === 0 || trip.period === timePeriods[selectedTimeIndex];
    return dateMatch && timeMatch;
  });

  // Apply sorting based on selected filter
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (selectedFilter === "Shortest") {
      return parseInt(a.distance) - parseInt(b.distance);
    } else if (selectedFilter === "Longest") {
      return parseInt(b.distance) - parseInt(a.distance);
    } else if (selectedFilter === "Most Recent") {
      return b.id - a.id;
    }
    return 0;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#181818", padding: 20 }}>
      {/* Header */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 10,
            flex: 1,
          }}
        >
          My Trips
        </Text>
        <TouchableOpacity onPress={handleSettings}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Date Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDateSelect(index)}
            style={{
              backgroundColor:
                index === selectedDateIndex ? "#00A884" : "#2A2A2A",
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>{date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Time Selector */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        {timePeriods.map((time, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTimeSelect(index)}
            style={{
              backgroundColor:
                index === selectedTimeIndex ? "#D3D3D3" : "#2A2A2A",
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: index === selectedTimeIndex ? "black" : "white",
                fontSize: 14,
              }}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filter Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 14 }}>{selectedFilter}</Text>
        <TouchableOpacity onPress={handleFilterPress}>
          <MaterialIcons name="filter-list" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Trip Cards */}
      <ScrollView>
        {sortedTrips.length > 0 ? (
          sortedTrips.map((trip) => (
            <View
              key={trip.id}
              style={{
                backgroundColor: "#2A2A2A",
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  {trip.title}
                </Text>
                <TouchableOpacity onPress={() => handleTripOptions(trip.id)}>
                  <Ionicons name="ellipsis-vertical" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={{ color: "white", fontSize: 14 }}>
                {trip.distance} • {trip.time}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="battery-half" size={18} color="white" />
                  <Text style={{ color: "white", fontSize: 14, marginLeft: 5 }}>
                    {trip.charge}% Charge Left
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="time-outline" size={18} color="white" />
                  <Text style={{ color: "white", fontSize: 14, marginLeft: 5 }}>
                    {trip.waitingTime} Waiting Time
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Ionicons name="calendar-outline" size={50} color="#555" />
            <Text style={{ color: "#888", fontSize: 16, marginTop: 10 }}>
              No trips found for this date and time
            </Text>
          </View>
        )}
      </ScrollView>
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

export default MyTrips;
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
