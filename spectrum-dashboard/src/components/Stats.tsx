import React from 'react';
import { Flex } from '@chakra-ui/react';
import LineGraph from './charts/LineGraph';

interface Data {
    value: number;
    timestamp: string;
  }  

interface StatsProps {
  data: Data[];
  title: string;
  color: string;
}

const Stats: React.FC<StatsProps> = ({ data, title, color }) => (
    <Flex flexDir="column" height="271px">
      <Flex
        bg="#2B3034"
        justifyContent={'center'}
        alignItems='center'
        color="white"
        fontFamily={'Conthrax'}
        height="50px"
      >
        {title}
      </Flex>
      <LineGraph data={data} color={color} />
    </Flex>
);

export default Stats;
