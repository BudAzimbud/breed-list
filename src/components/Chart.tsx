import {LineChart} from 'react-native-wagmi-charts';
import React from 'react';
const data = [
  {
    timestamp: 1625945400000,
    value: 33575.25,
  },
  {
    timestamp: 1625946300000,
    value: 33545.25,
  },
  {
    timestamp: 1625947200000,
    value: 33510.25,
  },
  {
    timestamp: 1625948100000,
    value: 33215.25,
  },
];
export default function Chart() {
  return (
    <LineChart.Provider data={data}>
      <LineChart>
        <LineChart.Path>
          <LineChart.HorizontalLine at={{index: 0}} />
          <LineChart.Tooltip
            textStyle={{
              backgroundColor: 'black',
              borderRadius: 4,
              color: 'white',
              fontSize: 18,
              padding: 4,
            }}
          />
        </LineChart.Path>
        <LineChart.CursorCrosshair />
        <LineChart.CursorLine />
      </LineChart>
    </LineChart.Provider>
  );
}
