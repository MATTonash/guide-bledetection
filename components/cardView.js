import { StyleSheet, Text, View, FlatList } from "react-native";

function CardView({ title, major, minor, distance, rssi }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.cardInfo}>
        Major: {major} Minor: {minor}
      </Text>

      <Text style={styles.cardInfo}>
        Distance: {distance} RSSI: {rssi}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E5E5EA",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    height: 110,
  },

  title: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: "bold",
  },
  cardInfo: {
    fontWeight: "bold",
  },
});

export default CardView;
