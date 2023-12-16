import React,{useState,useEffect,useCallback} from 'react';
import {useToast,Flex} from '@chakra-ui/react';
import LiveStatus from './LiveStatus';
import {fetchSpectrumStatus} from '../api/sensors';
import Info from './Info';
import Stats from './Stats';
import Temperature from './Temperature';

interface Data {
  value: number;
  timestamp: string;
}
interface SensorData {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
}

const initialSensorData: SensorData={
  velocity: 0,
  altitude: 0,
  temperature: 0,
  statusMessage: '',
  isAscending: false,
  isActionRequired: false,
};

const Dashboard: React.FC=() => {
  const toast=useToast();
  const [sensorData,setSensorData]=useState(initialSensorData);
  const [altitudeData,setAltitudeData]=useState<Data[]>([]);
  const [velocityData,setVelocityData]=useState<Data[]>([]);
  const [isLive,setIsLive]=useState(false);

  const fetchData=useCallback(async () => {
    try {
      const data=await fetchSpectrumStatus();
      setSensorData(data);
      setAltitudeData((prevData) => [
        ...prevData.slice(Math.max(prevData.length-19,0)),
        {value: data.altitude,timestamp: new Date().toLocaleTimeString()},
      ]);
      setVelocityData((prevData) => [
        ...prevData.slice(Math.max(prevData.length-19,0)),
        {value: data.velocity,timestamp: new Date().toLocaleTimeString()},
      ]);
    } catch(error) {
      toast({
        title: error+'',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  },[toast]);

  useEffect(() => {
    const fetchDataAndHandleErrors=async () => {
      try {
        await fetchData();
      } catch(error) {
        toast({
          title: error+'',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchDataAndHandleErrors();
  },[fetchData,toast]);

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" width="100%" height="100%">
      <LiveStatus isLive={isLive} />
      <Flex flexDir="row" justifyContent="space-between" width="100%" height="100%" padding={5} bg="#343B41" gap={4}>
        <Flex flexDir="column" width="35%" gap={4}>
          <Stats data={altitudeData} color="yellow" />
          <Stats data={velocityData} color="#E29BFF" />
        </Flex>
        <Temperature temperature={sensorData.temperature} />
        <Info isLive={isLive} setIsLive={() => setIsLive(!isLive)} status={sensorData.statusMessage} isAscending={sensorData.isAscending} fetchData={fetchData} />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
