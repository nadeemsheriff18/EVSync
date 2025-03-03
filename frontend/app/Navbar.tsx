import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

const Navbar = () => {
  const [activeNav, setActiveNav] = useState<string>("Home");

  return (
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
            style={[styles.navText, activeNav === item && styles.activeNavText]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#181818",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  navItem: {
    alignItems: "center",
    flex: 1, // Ensures equal spacing for each item
  },
  navText: {
    color: "#888",
    fontSize: 14,
  },
  activeNavText: {
    color: "#fff",
    fontWeight: "bold",
    borderBottomWidth: 3, // Underline for the active tab
    borderBottomColor: "#00A884",
    paddingBottom: 5,
  },
});
