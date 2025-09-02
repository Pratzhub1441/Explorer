import { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppContext } from "../../shared/AppContext/AppContext";
import colors from "../../assets/colors/colors";

const Transfer = () => {
  const [isDescending, setIsDescending] = useState(true);
  const { transactions, evTransactions, seeAll, setSeeAll, seeEVAll, setSeeEVAll } =
    useContext(AppContext);

  const sortedMoneyTransactions = useMemo(() => {
    return [...transactions].sort((a, b) =>
      isDescending ? b.amount - a.amount : a.amount - b.amount
    );
  }, [transactions, isDescending]);

  const sortedRechargeTransactions = useMemo(() => {
    return [...evTransactions].sort((a, b) =>
      isDescending
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
  }, [evTransactions, isDescending]);

  const renderHeader = (title, toggleSort, toggleSeeAll, seeAllState, icon) => (
    <View style={styles.transactionHeader}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
        {icon}
        <Text style={styles.thHeaderLeft}>{title}</Text>
        <TouchableOpacity onPress={toggleSort}>
          <Ionicons
            name={isDescending ? "swap-vertical" : "swap-vertical-outline"}
            size={20}
            color={colors.themeColor}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleSeeAll}>
        <Text style={styles.seeAllText}>{seeAllState ? "See Less" : "See All"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: "#f6f8fa" }}>
      <View style={styles.Container}>
        <View style={styles.transactionsSection}>
          {renderHeader(
            "Money Transactions",
            () => setIsDescending((prev) => !prev),
            () => setSeeAll((prev) => !prev),
            seeAll,
            <Ionicons name="wallet" size={20} color={colors.themeColor} />
          )}
          <FlatList
            data={sortedMoneyTransactions}
            keyExtractor={(item, index) => index.toString()}
            style={[
              styles.transactionsBody,
              {
                maxHeight: seeAll
                  ? undefined
                  : Dimensions.get("window").height * 0.3,
                paddingTop: 10,
              },
            ]}
            renderItem={({ item }) => (
              <View style={styles.tnsCard}>
                <View style={[styles.tnsCardLeft, { backgroundColor: "#e6f5ed" }]}>
                  <Text style={styles.iconText}>₹</Text>
                </View>
                <View style={styles.tnsCardRight}>
                  <View>
                    <Text style={styles.cardTitle}>{item.bankName}</Text>
                    <Text style={{ color: "#8898af" }}>{item.cardType}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.amountText}>{`₹${item.amount}`}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyCard}>
                <Text style={{ color: "#bdc3c7" }}>No money transactions yet</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.transactionsSection}>
          {renderHeader(
            "Recharge Transactions",
            () => setIsDescending((prev) => !prev),
            () => setSeeEVAll((prev) => !prev),
            seeEVAll,
            <Ionicons name="battery-charging" size={20} color={colors.themeColor} />
          )}
          <FlatList
            data={sortedRechargeTransactions}
            keyExtractor={(item, index) => index.toString()}
            style={[
              styles.transactionsBody,
              {
                maxHeight: seeEVAll
                  ? undefined
                  : Dimensions.get("window").height * 0.3,
                paddingTop: 10,
              },
            ]}
            renderItem={({ item }) => (
              <View style={styles.tnsCard}>
                <View style={[styles.tnsCardLeft, { backgroundColor: "#e6f2fb" }]}>
                  <Ionicons name="car-sport" size={20} color={colors.themeColor} />
                </View>
                <View style={styles.tnsCardRight}>
                  <View>
                    <Text style={styles.cardTitle}>{item.vehicle}</Text>
                    <Text style={{ color: "#8898af" }}>{item.charger}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.amountText}>{`₹${item.amount}`}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyCard}>
                <Text style={{ color: "#bdc3c7" }}>No recharge transactions yet</Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Transfer;

const styles = {
  Container: {
    flex: 1,
    padding: 16,
  },
  transactionsSection: {
    backgroundColor: "#ffffff",
    marginVertical: 12,
    padding: 17,
    borderRadius: 16,
    elevation: 6,
    shadowColor: "#3bb7d6",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 14,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    paddingBottom: 5,
  },
  thHeaderLeft: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#232946",
    letterSpacing: 1,
  },
  seeAllText: {
    color: colors.themeColor,
    textDecorationLine: "underline",
    fontSize: 14,
    fontWeight: "600",
  },
  transactionsBody: {},
  tnsCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 9,
    borderColor: "#e9e9ef",
    borderWidth: 1,
    borderRadius: 13,
    marginBottom: 10,
    backgroundColor: "#f7fafd",
    elevation: 3,
    shadowColor: "#dedede",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 11,
  },
  tnsCardLeft: {
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    minWidth: 35,
    minHeight: 35,
  },
  tnsCardRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  iconText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.themeColor,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#232946",
  },
  amountText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#22223b",
  },
  dateText: {
    fontSize: 12,
    color: "#7A869A",
    marginTop: 2,
  },
  emptyCard: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    padding: 24,
    marginTop: 9,
    backgroundColor: "#f8fafc",
  },
};
