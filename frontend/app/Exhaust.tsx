import React, { useState, useEffect } from "react";
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

// Define TypeScript interfaces
interface ExhaustSound {
  id: string;
  name: string;
  date: string;
  type: string;
  duration: string;
  description: string;
  popularity: number;
}

// Sample Data
const exhaustSounds: ExhaustSound[] = [
  {
    id: "1",
    name: "NeonScream",
    date: "June 09",
    type: "Use",
    duration: "Use",
    description: "A high-pitched aggressive exhaust note with crisp overtones",
    popularity: 95,
  },
  {
    id: "2",
    name: "TripleRoar",
    date: "June 09",
    type: "Duration",
    duration: "25 Mins",
    description: "Deep, throaty triple-pipe sound with distinctive backfire",
    popularity: 87,
  },
  {
    id: "3",
    name: "TwinBolt",
    date: "June 09",
    type: "Duration",
    duration: "25 Mins",
    description:
      "Dual-tone performance sound with electric crackle on downshift",
    popularity: 82,
  },
  {
    id: "4",
    name: "Inline 4 Akro",
    date: "June 09",
    type: "Duration",
    duration: "25 Mins",
    description: "Classic inline-four sound with Akrapovič-inspired resonance",
    popularity: 78,
  },
  {
    id: "5",
    name: "V8 Thunder",
    date: "June 10",
    type: "Duration",
    duration: "30 Mins",
    description: "Low-frequency rumble with powerful V8 characteristics",
    popularity: 92,
  },
  {
    id: "6",
    name: "RaceTech Pro",
    date: "June 11",
    type: "Duration",
    duration: "20 Mins",
    description: "Track-focused racing exhaust with high-rev scream",
    popularity: 75,
  },
];

// Home Screen Component
const HomeScreen: React.FC = () => {
  const [currentExhaust, setCurrentExhaust] = useState<ExhaustSound>(
    exhaustSounds[0]
  );
  const [activeTab, setActiveTab] = useState<"popular" | "browse">("popular");
  const [activeNav, setActiveNav] = useState<string>("Home");
  const [displayedSounds, setDisplayedSounds] = useState<ExhaustSound[]>([
    ...exhaustSounds,
  ]);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [timeFilter, setTimeFilter] = useState<string>("All Time");
  const [profileModalVisible, setProfileModalVisible] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSearchHistory, setShowSearchHistory] = useState<boolean>(false);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  // Handle filter changes and search
  useEffect(() => {
    let filtered = [...exhaustSounds];

    // Apply search filter if search query exists
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((sound) => {
        const nameMatch = sound.name.toLowerCase().includes(query);
        const descriptionMatch = sound.description
          .toLowerCase()
          .includes(query);
        return nameMatch || descriptionMatch;
      });

      // Simulate search delay for better UX
      setIsSearchLoading(true);
      const timer = setTimeout(() => {
        setIsSearchLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      // Apply sorting based on active tab only if not searching
      if (activeTab === "popular") {
        filtered.sort((a, b) => b.popularity - a.popularity);
      }
      setIsSearchLoading(false);
    }

    setDisplayedSounds(filtered);
  }, [activeTab, timeFilter, searchQuery]);

  const handleUseExhaust = (exhaust: ExhaustSound): void => {
    setCurrentExhaust(exhaust);
    Alert.alert(
      "Exhaust Changed",
      `${exhaust.name} is now your active exhaust sound!`,
      [{ text: "OK" }]
    );
  };

  const handleSearch = (text: string): void => {
    setSearchQuery(text);
    setShowSearchHistory(text.length > 0);
  };

  const handleSearchSubmit = (): void => {
    if (searchQuery.trim()) {
      // Add to search history (avoiding duplicates)
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory([searchQuery, ...searchHistory.slice(0, 4)]);
      }

      setShowSearchHistory(false);
      Keyboard.dismiss();
    }
  };

  const applyHistorySearch = (item: string): void => {
    setSearchQuery(item);
    setShowSearchHistory(false);
    Keyboard.dismiss();
  };

  const clearSearch = (): void => {
    setSearchQuery("");
    setShowSearchHistory(false);
    Keyboard.dismiss();
  };

  // Toggle search functionality when switching to browse tab
  const handleTabChange = (tab: "popular" | "browse"): void => {
    setActiveTab(tab);
    if (tab === "browse") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
      setSearchQuery("");
      setShowSearchHistory(false);
    }
  };

  const FilterModal: React.FC = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Options</Text>

          <Text style={styles.modalSubtitle}>Time Period</Text>
          {["Today", "This Week", "This Month", "All Time"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.filterOption,
                timeFilter === option && styles.selectedFilter,
              ]}
              onPress={() => {
                setTimeFilter(option);
                setFilterModalVisible(false);
              }}
            >
              <Text
                style={
                  timeFilter === option
                    ? styles.selectedFilterText
                    : styles.filterOptionText
                }
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const ProfileModal: React.FC = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={profileModalVisible}
      onRequestClose={() => setProfileModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>My Profile</Text>

          <View style={styles.profileInfo}>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Exhausts Used</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Days Active</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setProfileModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Filter Modal */}
      <FilterModal />

      {/* Profile Modal */}
      <ProfileModal />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
          <Text style={styles.profileText}>My Profile</Text>
        </TouchableOpacity>

        {/* Search Button - Only show when not in browse tab */}
        {activeTab !== "browse" && (
          <TouchableOpacity
            onPress={() => {
              setIsSearching(!isSearching);
              if (isSearching) {
                setSearchQuery("");
                setShowSearchHistory(false);
              }
            }}
          >
            <Text style={styles.profileText}>
              {isSearching ? "Cancel" : "Search"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Title Section */}
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        <LinearGradient
          colors={["rgb(0, 60, 60)", "rgba(0, 194, 194, 0.9)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>Choose Your Exhaust</Text>
          <Image
            source={require("../assets/images/exhaust.png")}
            style={styles.image}
          />
        </LinearGradient>
      </View>

      {/* Current Exhaust Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>In Use</Text>
      </View>

      {/* Currently Selected Exhaust */}
      <View style={styles.currentCard}>
        <View style={styles.cardContent}>
          <Text style={styles.soundName}>{currentExhaust.name}</Text>
          <Text style={styles.soundDescription}>
            {currentExhaust.description}
          </Text>
        </View>
        <TouchableOpacity style={styles.durationButton}>
          <Text style={styles.durationText}>In Use</Text>
        </TouchableOpacity>
      </View>

      {/* Browse/Popular Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "popular" && styles.activeTab,
          ]}
          onPress={() => handleTabChange("popular")}
        >
          <Text
            style={
              activeTab === "popular" ? styles.tabText : styles.tabTextInactive
            }
          >
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "browse" && styles.activeTab]}
          onPress={() => handleTabChange("browse")}
        >
          <Text
            style={
              activeTab === "browse" ? styles.tabText : styles.tabTextInactive
            }
          >
            Browse
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar - Only show when in browse tab or when explicitly searching */}
      {(activeTab === "browse" || (isSearching && activeTab === "popular")) && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search exhausts..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSearch}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              autoFocus={activeTab === "browse"}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearSearch}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Search History Dropdown */}
      {(activeTab === "browse" || isSearching) &&
        showSearchHistory &&
        searchHistory.length > 0 && (
          <View style={styles.searchHistoryContainer}>
            <Text style={styles.searchHistoryTitle}>Recent Searches</Text>
            {searchHistory.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.searchHistoryItem}
                onPress={() => applyHistorySearch(item)}
              >
                <Text style={styles.searchHistoryText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.clearHistoryButton}
              onPress={() => setSearchHistory([])}
            >
              <Text style={styles.clearHistoryText}>Clear History</Text>
            </TouchableOpacity>
          </View>
        )}

      {/* Filter Section - Show only when on popular tab and not searching */}
      {activeTab === "popular" && !isSearching && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>{timeFilter}</Text>
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Text style={styles.filterText}>Filter ▼</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search Results Header - Only show when searching (without filter options) */}
      {searchQuery !== "" && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>
            {isSearchLoading
              ? "Searching..."
              : `Search Results: ${displayedSounds.length} ${
                  displayedSounds.length === 1 ? "item" : "items"
                }`}
          </Text>
        </View>
      )}

      {/* Exhaust List or Loading Indicator */}
      {isSearchLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00C2C2" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : displayedSounds.length > 0 ? (
        <FlatList
          data={displayedSounds.filter((item) => item.id !== currentExhaust.id)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} activeOpacity={0.7}>
              <View style={styles.cardContent}>
                <Text style={styles.soundName}>{item.name}</Text>
                <Text style={styles.soundDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.durationButton}
                onPress={() => handleUseExhaust(item)}
              >
                <Text style={styles.durationText}>Use</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No exhausts found</Text>
          <Text style={styles.noResultsSubText}>
            Try a different search term
          </Text>
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.searchSuggestionButton}
              onPress={() => clearSearch()}
            >
              <Text style={styles.searchSuggestionButtonText}>
                Clear Search
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Bottom Navigation */}
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
            {activeNav === item && <View style={styles.navIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Main App Component
const App: React.FC = () => {
  return <HomeScreen />;
};

export default App;

// Styles
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
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#222",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flex: 1,
  },
  navText: {
    color: "#bbb",
    fontSize: 14,
  },
  activeNavText: {
    color: "#00C2C2",
    fontWeight: "bold",
  },
  navIndicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "50%",
    backgroundColor: "#00C2C2",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
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
