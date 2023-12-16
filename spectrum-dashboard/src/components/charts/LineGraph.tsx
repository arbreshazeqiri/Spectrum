import React from 'react';
import { Flex } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface Data {
  value: number;
  timestamp: string;
}

interface LineGraphProps {
  data: Data[];
  color: string;
}

const LineGraph: React.FC<LineGraphProps> = ({ data, color }) => {
  return (
    <Flex
      width="100%"
      height="100%"
      bg="#31363C"
      justifyContent={'center'}
      alignItems="center"
    >
      <LineChart width={500} height={210} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tick={{ fill: 'white' }} />
        <YAxis tick={{ fill: 'white' }} />
        <Tooltip
          contentStyle={{
            background: 'gray',
            color: 'white',
          }}
        />
        <Line
          type="linear"
          dataKey="value"
          stroke={color}
          isAnimationActive={false}
        />
      </LineChart>
    </Flex>
  );
};

export default LineGraph;
