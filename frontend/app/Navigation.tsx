import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";
import Navbar from "./Navbar";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const RouteScreen = () => {
  const [from, setFrom] = useState("VIT CHENNAI");
  const [to, setTo] = useState("Raptee.Hv HQ");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Map Image */}
      <Image
        source={require("../assets/images/Map5.png")} // Replace with actual map image
        style={styles.mapImage}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Route</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Route Details */}
      <View style={styles.routeInfo}>
        <Text style={styles.routeText}>Finish Line</Text>
        <Text style={styles.subText}>221b Elementary Avy</Text>
      </View>

      {/* Edit Route Section */}
      <View style={styles.editRoute}>
        <Text style={styles.sectionTitle}>Edit Route</Text>

        <Text style={styles.label}>From</Text>
        <Picker
          selectedValue={from}
          onValueChange={(itemValue) => setFrom(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="VIT CHENNAI" value="VIT CHENNAI" />
          <Picker.Item label="Other Location" value="other" />
        </Picker>

        <Text style={styles.label}>To</Text>
        <Picker
          selectedValue={to}
          onValueChange={(itemValue) => setTo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Raptee.Hv HQ" value="Raptee.Hv HQ" />
          <Picker.Item label="Other Destination" value="other" />
        </Picker>
      </View>

      {/* Start Trip Button */}
      <TouchableOpacity style={styles.startTrip}>
        <Text style={styles.startTripText}>Start Trip</Text>
        <Ionicons name="walk" size={20} color="white" />
      </TouchableOpacity>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  mapImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "white" },
  routeInfo: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  routeText: { fontSize: 16, color: "white", fontWeight: "bold" },
  subText: { fontSize: 14, color: "#aaa" },
  editRoute: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: { color: "#bbb", fontSize: 14, marginBottom: 5 },
  picker: { backgroundColor: "#333", color: "white", marginBottom: 10 },
  startTrip: {
    backgroundColor: "#00BFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  startTripText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    marginRight: 8,
  },
});

export default RouteScreen;
