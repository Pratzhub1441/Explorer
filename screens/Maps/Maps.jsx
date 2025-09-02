import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';

const chartGreen = '#30bf5d';
const chartGreenLight = '#e8f7e4';
const width = Dimensions.get('window').width - 40;

const lineData = [
  { value: 50, label: 'Jan' },
  { value: 60, label: 'Feb' },
  { value: 40, label: 'Mar' },
  { value: 75, label: 'Apr' },
  { value: 90, label: 'May' },
];

const barData = [
  { value: 20, label: 'Mon', frontColor: chartGreen },
  { value: 45, label: 'Tue', frontColor: chartGreen },
  { value: 28, label: 'Wed', frontColor: chartGreen },
  { value: 80, label: 'Thu', frontColor: chartGreen },
  { value: 50, label: 'Fri', frontColor: chartGreen },
];

const pieData = [
  { value: 45, color: chartGreen, text: '' },
  { value: 25, color: chartGreenLight, text: '' },
  { value: 30, color: '#a7e9a9', text: '' },
];

const Maps = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartHeader}>Monthly Energy Usage</Text>
        <LineChart
          data={lineData}
          width={width - 70}
          height={180}
          areaChart
          animateOnLoad
          color={chartGreen}
          curved
          yAxisColor="#e0f2e9"
          xAxisColor="#e0f2e9"
          showPointerStrip
          showPointerStripTooltip
          hideDataPoints={false}
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerColor: chartGreen,
          }}
          isAnimated
          backgroundColor={chartGreenLight}
          rulesColor="#e6f5ed"
          noOfSections={5}
          spacing={30}
          initialSpacing={28}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartHeader}>Weekly Charging Trends</Text>
        <BarChart
          data={barData}
          height={180}
          width={width - 75}
          barWidth={32}
          spacing={24}
          roundedTop
          showValuesAsTooltip
          noOfSections={5}
          yAxisThickness={0}
          backgroundColor={chartGreenLight}
          xAxisColor="#e0f2e9"
          rulesColor="#e6f5ed"
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartHeader}>Energy Source Distribution</Text>
        <PieChart
          data={pieData}
          donut
          radius={70}
          innerRadius={45}
          showText
          textColor={chartGreen}
          showValuesAsTooltip
          centerLabelComponent={() => (
            <Text
              style={{ color: chartGreen, fontWeight: 'bold', fontSize: 16 }}
            >
              Energy
            </Text>
          )}
          backgroundColor={chartGreenLight}
        />
      </View>
    </ScrollView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#f7faf7',
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 23,
    shadowColor: '#30bf5d',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 9,
    elevation: 2,
    alignItems: 'center',
    width: '100%',
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15943d',
    marginBottom: 12,
    alignSelf: 'flex-start',
    marginLeft: 3,
  },
});
