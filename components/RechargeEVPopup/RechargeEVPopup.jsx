import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../../shared/AppContext/AppContext';

const RechargeEVPopup = ({ visible, onClose, vehicles }) => {
  const { setEvTransactions, balance, setBalance }= useContext(AppContext);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedCharger, setSelectedCharger] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!selectedVehicle) newErrors.vehicle = 'Please select a vehicle';
    if (!selectedCharger) newErrors.charger = 'Please select charger type';
    if (!rechargeAmount || Number(rechargeAmount) <= 0)
      newErrors.amount = 'Enter a valid amount';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRecharge = () => {
    if (validate()) {
      setConfirmVisible(true);
    }
  };

  const handleConfirm = () => {
     const newTransaction = {
      vehicle: selectedVehicle,
      charger: selectedCharger,
      amount: Number(rechargeAmount),
      date: new Date().toLocaleString(),
      status: 'Success ✅',
    };

    setEvTransactions(prev => [...prev, newTransaction]);

     setBalance(prevBalance => prevBalance - Number(rechargeAmount));

    Alert.alert('Success', 'Recharge Successful ✅', [{ text: 'OK' }]);
    setConfirmVisible(false);

    setSelectedVehicle(null);
    setSelectedCharger('');
    setRechargeAmount('');

    onClose();
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  console.log(balance);

  return (
    <>
      <Modal transparent={true} visible={visible} animationType="slide">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                {balance>0 ? (
                <View>
                <Text style={styles.title}>Recharge EV</Text>

                <View style={styles.field}>
                  <Text style={styles.label}>Select Vehicle</Text>
                  <View style={styles.inputWrapper}>
                    <Picker
                      selectedValue={selectedVehicle}
                      onValueChange={itemValue => setSelectedVehicle(itemValue)}
                    >
                      <Picker.Item label="-- Select Vehicle --" value={null} />
                      {vehicles.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={`${item.name} (${item.numberPlate})`}
                          value={item.numberPlate}
                        />
                      ))}
                    </Picker>
                  </View>
                  {errors.vehicle && (
                    <Text style={styles.errorText}>{errors.vehicle}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Charger Type</Text>
                  <View style={styles.inputWrapper}>
                    <Picker
                      selectedValue={selectedCharger}
                      onValueChange={itemValue => setSelectedCharger(itemValue)}
                    >
                      <Picker.Item label="-- Select Charger --" value="" />
                      <Picker.Item label="Slow" value="slow" />
                      <Picker.Item label="Fast" value="fast" />
                      <Picker.Item label="DC Fast" value="dcfast" />
                    </Picker>
                  </View>
                  {errors.charger && (
                    <Text style={styles.errorText}>{errors.charger}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Recharge Amount (₹)</Text>
                  <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder="Enter amount"
                    value={rechargeAmount}
                    onChangeText={setRechargeAmount}
                  />
                  {errors.amount && (
                    <Text style={styles.errorText}>{errors.amount}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handleRecharge}
                >
                  <Text style={styles.confirmText}>Recharge Now</Text>
                </TouchableOpacity>
                </View>
                ) : (
                   <View>
                    <Text style={[styles.errorText, {
                      fontSize: 14,
                      fontWeight: 500,
                      margin: 10
                    }]}>
                      Your balance is low please add money to your wallet before
                      proceeding
                    </Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal transparent={true} visible={confirmVisible} animationType="fade">
        <TouchableWithoutFeedback onPress={handleCancel}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.confirmPopup}>
                <Text style={styles.title}>Confirm Recharge</Text>
                <Text style={styles.detailText}>Vehicle: {selectedVehicle}</Text>
                <Text style={styles.detailText}>Charger: {selectedCharger}</Text>
                <Text style={styles.detailText}>Amount: ₹{rechargeAmount}</Text>

                <View style={styles.btnRow}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={handleCancel}
                  >
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.okBtn}
                    onPress={handleConfirm}
                  >
                    <Text style={styles.okText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default RechargeEVPopup;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  confirmPopup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  confirmBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
  detailText: {
    fontSize: 15,
    marginBottom: 8,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  okBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '600',
  },
  okText: {
    color: '#fff',
    fontWeight: '600',
  },
});
