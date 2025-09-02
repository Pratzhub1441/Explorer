import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Image,
  Linking,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { useContext, useState } from 'react';
import AddMoneyPopup from '../../components/AddMoneyPopup/AddMoneyPopup';
import AddVehiclePopup from '../../components/AddVehiclePopup/AddVehiclePopup';
import RechargeEVPopup from '../../components/RechargeEVPopup/RechargeEVPopup';
import { AppContext } from '../../shared/AppContext/AppContext';
import colors from '../../assets/colors/colors';

const Home = () => {
  const {
    balance,
    setBalance,
    transactions,
    setTransactions,
    seeAll,
    setSeeAll,
  } = useContext(AppContext);
  const [vehicles, setVehicles] = useState([
    {
      name: 'Ather',
      numberPlate: 'KA01MH1234',
      battery: '50',
    },
  ]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupState, setPopupState] = useState(false);
  const [rechargeEV, setRechargeEV] = useState(false);

  const evArticles = [
    {
      title: 'India to Add 10,000 Smart EV Charging Stations by 2026',
      url: 'https://energy.economictimes.indiatimes.com/news/power/india-to-add-10000-smart-ev-charging-stations-by-2026/123456',
      urlToImage: require('../../assets/images/rd1.png'),
    },
    {
      title: 'Adani Power receives LoA for 2400 MW greenfield thermal power plant',
      url: 'https://energy.economictimes.indiatimes.com/news/power/adani-power-receives-loa-for-2400-mw-greenfield-thermal-power-plant/123579711?utm_source=top_news&utm_medium=tagListing',
      urlToImage: require('../../assets/images/rd2.png'),
    },
    {
      title: 'how electricity consumers in india can save up to Rs.60000 crore annually',
      url: 'https://energy.economictimes.indiatimes.com/news/power/explained-how-electricity-consumers-in-india-can-save-up-to-60000-crore-annually/123521447?utm_source=most_read&utm_medium=newsDetail',
      urlToImage: require('../../assets/images/rd3.png'),
    },
    {
      title: 'Hindustan zinc to double production capacity under 2 0 vision',
      url: 'https://energy.economictimes.indiatimes.com/news/power/hindustan-zinc-to-double-production-capacity-under-2-0-vision/123504849',
      urlToImage: require('../../assets/images/rd4.png'),
    },
    {
      title: 'Governing the energy transition: Regulation, risk, and geopolitics in a low-carb',
      url: 'https://energy.economictimes.indiatimes.com/news/power/governing-the-energy-transition-regulation-risk-and-geopolitics-in-a-low-carbon-future/123502675',
      urlToImage: require('../../assets/images/rd5.png'),
    },
  ];

  const handleAddVehicle = vehicle => {
    setVehicles(prev => [...prev, vehicle]);
  };

  const handleAddVehiclePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <ScrollView horizontal={false} style={styles.Container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerBold}>
              Good Morning, Pratz<Text style={{ fontSize: 16 }}>👋</Text>
            </Text>
            <Text style={styles.headerSub}>Welcome to explorer</Text>
          </View>
          <View style={styles.headerright}></View>
        </View>

        <View style={styles.cardVehicles}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
            <Text style={styles.sectionTitle}>Your Vehicles</Text>
            <TouchableOpacity onPress={() => setPopupVisible(true)}>
              <Text style={styles.addBtn}>+</Text>
            </TouchableOpacity>
          </View>
          {vehicles.length > 0 ? (
            <FlatList
              data={vehicles}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.vehicleCard}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.vehicleName}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="battery-charging" size={18} color={colors.themeColor} />
                      <Text style={styles.vehicleBattery}> {item.battery}%</Text>
                    </View>
                  </View>
                  <Text style={styles.vehicleNumber}>{item.numberPlate}</Text>
                </View>
              )}
            />
          ) : (
            <Text>No vehicles added yet</Text>
          )}
        </View>

        <View style={styles.cardBalance}>
          <Text style={styles.cardText}>Your Balance</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.cardContainerText}>${balance}</Text>
            <Ionicons style={styles.cardContainerIcon} name="cash" size={34} color={colors.themeColor} />
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={styles.CardTextLink}
              onPress={() => {
                setPopupState(true);
              }}
            >
              Add Money
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <View style={[styles.card1, { flex: 0.5 }]}>
            <Text style={styles.cardText}>Energy saved this month</Text>
            <View style={styles.cardContainer}>
              <Text style={{ color: '#2A2C2E', fontSize: 20, fontWeight: 500 }}>
                25Kwh
              </Text>
            </View>
          </View>
          <View style={[styles.card1, { flex: 0.5 }]}>
            <Text style={styles.cardText}>Money Saved</Text>
            <View style={styles.cardContainer}>
              <Text style={{ color: '#2A2C2E', fontSize: 20, fontWeight: 500 }}>
                $25
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.rechargeEVBtn}
            onPress={() => setRechargeEV(true)}
          >
            <Text style={styles.rechargeEVText}>
              <Icon name="chevrons-up" size={20} color="#fff" /> Recharge EV
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.payBillBtn}>
            <Icon name="chevrons-up" size={20} color={colors.themeColor} />{' '}
            <Text
              style={styles.payBillText}
              onPress={() => {
                Alert.alert('Error', '⚠️ Operation is under Progress');
              }}
            >
              Pay Electricity Bill
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardTransactions}>
          <View style={styles.transactionHeader}>
            <Text style={styles.thHeaderLeft}>
              Smart EV Charging Recommendations
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={true}
            data={evArticles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.newsCard}
                onPress={() => Linking.openURL(item.url)}
              >
                <Image source={item.urlToImage} style={styles.newsImage} />
                <Text style={styles.newsTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <AddVehiclePopup
          visible={popupVisible}
          onClose={handleAddVehiclePopupClose}
          onAddVehicle={handleAddVehicle}
        />
        <RechargeEVPopup
          visible={rechargeEV}
          onClose={() => setRechargeEV(false)}
          vehicles={vehicles}
        />
        {popupState && (
          <AddMoneyPopup
            visible={popupState}
            balance={balance}
            setBalance={setBalance}
            transactions={transactions}
            setTransactions={setTransactions}
            onClose={() => setPopupState(false)}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: '#eaeefc',
  },
  wrapper: {
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#232946',
    marginVertical: 15,
    borderRadius: 12,
    padding: 22,
    elevation: 5,
    shadowColor: '#232946',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 9,
  },
  headerLeft: {},
  headerright: {
    padding: 10,
    borderColor: '#cac7c7ff',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  headerBold: {
    color: '#fffffe',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 20,
  },
  headerSub: {
    color: '#eebbc3',
    fontSize: 14,
    marginTop: 4,
  },
  cardVehicles: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#adb5bd',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
  },
  vehicleCard: {
    padding: 13,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
    flexDirection: 'column',
     elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  vehicleBattery: {
    fontSize: 14,
    color: colors.themeColor,
    fontWeight: 'bold',
  },
  vehicleNumber: {
    fontSize: 13,
    color: '#495057',
  },
  addBtn: {
    fontSize: 18,
    borderRadius: 9,
    backgroundColor: colors.themeColor,
    color: '#fff',
    paddingHorizontal: 9,
    paddingVertical: 1,
    textAlign: 'center',
    width: 28,
  },
  cardBalance: {
    backgroundColor: '#ffffffff',
    borderRadius: 13,
    padding: 21,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#fcb900',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  cardText: {},
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainerText: {
    color: '#2A2C2E',
    fontSize: 40,
    fontWeight: 'bold',
  },
  cardContainerIcon: {},
  btn: {
    backgroundColor: colors.themeColor,
    padding: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 9,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  CardTextLink: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardWrapper: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
  },
  card1: {
    backgroundColor: '#e8f7e4',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    gap: 2,
    elevation: 3,
    shadowColor: '#61e786',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    flex: 1,
  },
  btnWrapper: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  rechargeEVBtn: {
    flexDirection: 'row',
    backgroundColor: colors.themeColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    flex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
  },
  rechargeEVText: {
    color: 'white',
    fontWeight: 'bold',
  },
  payBillBtn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    flex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
  },
  payBillText: {
    color: colors.themeColor,
    fontWeight: 'bold',
  },
  cardTransactions: {
    backgroundColor: '#cbe3ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#4f8dd8',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  thHeaderLeft: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232946',
  },
  newsCard: {
    width: 220,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
    padding: 8,
  },
  newsImage: { width: '100%', height: 120, borderRadius: 10, marginBottom: 6 },
  newsTitle: { fontSize: 14, fontWeight: 'bold', color: '#232946' },
});
