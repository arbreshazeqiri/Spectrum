import React from 'react';
import { Flex } from '@chakra-ui/react';
import GaugeChart from './charts/GaugeChart';

interface TemperatureChartProps {
  temperature: number;
}

const Temperature: React.FC<TemperatureChartProps> = ({ temperature }) => (
  <Flex flexDir="column" width="35%">
    <Flex flexDir="column" height="560px">
      <Flex
        bg="#2B3034"
        justifyContent={'center'}
        alignItems='center'
        color="white"
        fontFamily={'Conthrax'}
        height="50px"
      >
        Temperature
      </Flex>
      <GaugeChart value={temperature} />
    </Flex>
  </Flex>
);

export default Temperature;
