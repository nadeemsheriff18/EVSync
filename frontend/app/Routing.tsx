import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RoutingSummary = () => {
  const [battery, setBattery] = useState(50);
  const [distance, setDistance] = useState(30);
  const [predictedSpeed, setPredictedSpeed] = useState(null);

  const handleSubmit = async () => {
    if (battery <= 0 || battery > 100 || distance <= 0) {
      Alert.alert(
        "Invalid Input",
        "Please enter valid values for battery and distance."
      );
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          battery_percentage: battery,
          distance_km: distance,
        }),
      });

      const data = await res.json();
      console.log("Response Data:", data); // Debugging

      if (data.predicted_speed_kmph !== undefined) {
        setPredictedSpeed(data.predicted_speed_kmph);
      } else {
        Alert.alert("Error", "Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch data from server");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Routing Summary</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Location Info */}
      <Text style={styles.locationText}>VIT CHENNAI - RAPTEE .HV HQ</Text>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <Image
          source={require("../assets/images/Map3.png")}
          style={styles.mapImage}
        />
      </View>

      {/* Form Inputs */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Battery Percentage:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={battery.toString()}
          onChangeText={(text) => setBattery(Number(text))}
          placeholder="Enter battery %"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Distance (km):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={distance.toString()}
          onChangeText={(text) => setDistance(Number(text))}
          placeholder="Enter distance in km"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Analyze Route</Text>
        </TouchableOpacity>
      </View>

      {/* Display Response */}
      {predictedSpeed !== null && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>
            Suggested Speed to reach destination without the need of charging :{" "}
            {predictedSpeed} km/h
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  locationText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  mapContainer: {
    backgroundColor: "#2A2A2A",
    height: 250,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#333",
    color: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#00A884",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#222",
    borderRadius: 10,
  },
  responseText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default RoutingSummary;
