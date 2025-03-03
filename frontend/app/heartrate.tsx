import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function HeartRateScreen() {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Heart Rate</Text>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Heart Rate Display */}
      <View style={styles.heartRateContainer}>
        <FontAwesome5 name="heart" size={20} color="red" />
        <Text style={styles.heartRateText}>112</Text>
        <Text style={styles.bpmText}>Bpm</Text>
      </View>
      <Text style={styles.statusText}>Heart Rate Is High</Text>

      {/* Precautions Section */}
      <Text style={styles.precautionsTitle}>Precautions Taken:</Text>
      <Text style={styles.precautionsText}>Ambient Light ON</Text>
      <Text style={styles.precautionsText}>Soothing Sound ON</Text>
      <Text style={styles.precautionsText}>Seat Massage ON</Text>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={28} color="black" />
      </TouchableOpacity>

      {/* Bottom Cards */}
      <View style={styles.bottomContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>pressure</Text>
          <Ionicons name="pulse" size={18} color="orange" />
          <Text style={styles.cardValue}>112 mmhg</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>oxygen</Text>
          <Ionicons name="water-outline" size={18} color="cyan" />
          <Text style={styles.cardValue}>95 SpO2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ffcc',
  },
  heartRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heartRateText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 5,
  },
  bpmText: {
    fontSize: 20,
    color: 'white',
  },
  statusText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  precautionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  precautionsText: {
    fontSize: 14,
    color: 'lightgray',
  },
  addButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 15,
    width: '45%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 12,
    color: 'lightgray',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
});

