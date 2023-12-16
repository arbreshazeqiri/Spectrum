import SolidGauge from "./SolidGauge";
import { Flex, Text } from '@chakra-ui/react';

const GaugeChart = ({ value }: { value: number }) => {  
  return (
    <Flex flexDir="column" bg="#31363C" height="100%" justifyContent="center" alignItems="center">
      <SolidGauge
        value={value}
      />
      <Text color="white" fontFamily={'Conthrax'} fontSize={50}>{value.toFixed(2)}°C</Text>
    </Flex>
  );
};

export default GaugeChart;
