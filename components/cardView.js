/**
 * CardView component displays card with device information.
 *
 * @param {string} title - Title of the device.
 * @param {number} major - Major number of device.
 * @param {number} minor - Minor number of device.
 * @param {number} distance - Distance to device.
 * @param {number} rssi - Signal strength of device.
 * @param {function} pressHandler - Callback when card is pressed.
 *
 * @returns {React.ReactElement} TouchableOpacity with CardView contents.
 */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

function CardView({ title, major, minor, distance, rssi, pressHandler }) {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.cardInfo}>
          Major: {major} Minor: {minor}
        </Text>

        <Text style={styles.cardInfo}>
          Distance: {distance} RSSI: {rssi}
        </Text>
      </View>
    </TouchableOpacity>
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
