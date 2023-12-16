import SolidGauge from "./SolidGauge";
import { Box } from '@chakra-ui/react';

const GaugeChart = ({ value }: { value: number }) => {  
  return (
    <Box
      w={{ base: '90%', lg: '100%' }}
      ml={'30px'}
      alignSelf={'center'}
      mb={['110px', '100px', '90px', '120px', 20]}
    >
      <SolidGauge
        value={value}
      />
    </Box>
  );
};

export default GaugeChart;
