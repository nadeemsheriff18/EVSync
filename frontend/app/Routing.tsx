import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RoutingSummary = () => {
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
    </View>
  );
};

export default RoutingSummary;
