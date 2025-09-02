import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

const AddVehiclePopup = ({ visible, onClose, onAddVehicle }) => {
  const [name, setName] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [battery, setBattery] = useState("");

  const handleAdd = () => {
    if (!name || !numberPlate || !battery) {
      alert("Please fill all fields");
      return;
    }

    const newVehicle = {
      name,
      numberPlate,
      battery: parseInt(battery),
    };

    onAddVehicle(newVehicle);
    onClose();
    setName("");
    setNumberPlate("");
    setBattery("");
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.popup}>
          <Text style={styles.title}>Add Vehicle</Text>

          <TextInput
            placeholder="Vehicle Name (e.g. Tesla Model 3)"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Number Plate"
            style={styles.input}
            value={numberPlate}
            onChangeText={setNumberPlate}
          />

          <TextInput
            placeholder="Battery %"
            style={styles.input}
            keyboardType="numeric"
            value={battery}
            onChangeText={setBattery}
          />

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddVehiclePopup;

const styles = StyleSheet.create({
     modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  popup: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancelBtn: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#ddd",
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
  addBtn: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    flex: 1,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
  },
});
