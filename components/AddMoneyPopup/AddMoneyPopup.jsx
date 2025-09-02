import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Alert, 
  TouchableWithoutFeedback,
  Keyboard 
} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import banks from "../../assets/banks.json";
import cards from '../../assets/cards.json';

const AddMoneyPopup = ({ visible, balance, setBalance, transactions, setTransactions, onClose }) => {
  const [tempAddMoney, setTempAddMoney] = useState({
    bankName: "",
    cardType: "",
    amount: "",
    date: ""
  });
  const [isFocus, setIsFocus] = useState(false);

  const handleAddMoney = () => {
    if (!tempAddMoney.bankName || !tempAddMoney.cardType || !tempAddMoney.amount) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    const amountNum = Number(tempAddMoney.amount);
    setBalance(prev => prev + amountNum);

    setTransactions(prev => [
      ...prev,
      {
        id: Date.now(),
        type: "Credit",
        bankName: tempAddMoney.bankName,
        cardType: tempAddMoney.cardType,
        amount: amountNum,
        date: new Date().toLocaleString(),
      },
    ]);

    Alert.alert("Success", "Added Money Successfully ✅");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.popup}>
              <Text style={styles.modalTitle}>Add Money</Text>

              <View style={styles.inputWrapper}>
                <View>
                  <Text style={styles.label}>Select bank</Text>
                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    data={banks}
                    search
                    labelField="name"
                    valueField="name"
                    placeholder={!isFocus ? 'Select Bank' : '...'}
                    searchPlaceholder="Search..."
                    value={tempAddMoney.bankName}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setTempAddMoney(prev => ({ ...prev, bankName: item.name }));
                      setIsFocus(false);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Select the card</Text>
                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    data={cards}
                    search
                    labelField="name"
                    valueField="name"
                    placeholder={!isFocus ? 'Select Card' : '...'}
                    searchPlaceholder="Search..."
                    value={tempAddMoney.cardType}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setTempAddMoney(prev => ({ ...prev, cardType: item.name }));
                      setIsFocus(false);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Enter the amount</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={tempAddMoney.amount}
                    onChangeText={value => setTempAddMoney(prev => ({ ...prev, amount: value }))}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.btn} onPress={handleAddMoney}>
                <Text style={styles.btnText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.btn, { backgroundColor: "#E53935", marginTop: 10 }]} 
                onPress={onClose}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddMoneyPopup;

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
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  inputWrapper: {
    gap: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    borderColor: '#ccc',
    minHeight: 45,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    borderColor: '#ccc',
    minHeight: 45,
  },
  btn: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
