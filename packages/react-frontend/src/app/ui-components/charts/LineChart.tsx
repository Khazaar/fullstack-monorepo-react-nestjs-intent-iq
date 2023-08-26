import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box } from '@mui/material';
import { colorStyles } from 'packages/react-frontend/src/assets/styles/theme';

export interface ILineChartData {
  entity: string;
  value: number;
}

type LineChartProps = {
  data: ILineChartData[];
  backgroundColor: string;
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  backgroundColor,
}) => {
  const chartData = [
    {
      id: 'Campaigns',
      data: data.map((entry) => ({
        x: entry.entity,
        y: entry.value,
      })),
    },
  ];
  // Determine the maximum value from your data
  const maxValue = Math.max(...data.map((item) => item.value));

  // Calculate the intermediate grid lines
  const numberOfLines = 5; // Adjust to your preference
  const step = maxValue / (numberOfLines - 1);
  const gridValues = Array.from(
    { length: numberOfLines },
    (_, index) => index * step
  );

  return (
    <Box
      style={{
        height: '150px',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: backgroundColor,
        padding: 5,
      }}
    >
      <ResponsiveLine
        data={chartData}
        margin={{ top: 10, right: 10, bottom: 23, left: 28 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        gridYValues={gridValues}
        curve="linear"
        enableGridX={true} // Enable horizontal grid lines
        enableGridY={true} // Enable vertical grid lines
        axisBottom={{
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          legendOffset: -40,
          legendPosition: 'middle',
          tickValues: 5,
        }}
        enablePoints={true}
        pointSize={5}
        pointColor={colorStyles.greyLight}
        colors={colorStyles.greyLight}
        lineWidth={3}
        enableArea={true}
        areaBaselineValue={0}
        areaOpacity={0.2}
        defs={[
          {
            id: 'gradient',
            type: 'linearGradient',
            colors: [
              { offset: 0, color: 'inherit', opacity: 0.5 },
              { offset: 100, color: 'inherit', opacity: 0 },
            ],
          },
        ]}
        fill={[
          {
            match: '*',
            id: 'gradient',
          },
        ]}
        theme={{
          axis: {
            ticks: {
              line: {
                strokeWidth: 0, // hide tick lines
              },
              text: {
                fontSize: '0.75rem',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                color: 'white',
                fillOpacity: 0.5,
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default LineChart;
