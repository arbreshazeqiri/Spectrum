import React, { useState, useEffect, useCallback } from 'react';
import { fetchSpectrumStatus } from '../api/sensors';
import { Flex, IconButton, useToast } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import LiveStatus from './LiveStatus';
import GaugeChart from './charts/GaugeChart';
import VideoPlayer from './VideoPlayer';

interface SensorData {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
}

const initialSensorData: SensorData = {
  velocity: 0,
  altitude: 0,
  temperature: 0,
  statusMessage: '',
  isAscending: false,
  isActionRequired: false,
};

const Dashboard: React.FC = () => {
  const toast = useToast();
  const [sensorData, setSensorData] = useState<SensorData>(initialSensorData);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchSpectrumStatus();
      setSensorData(data);
    } catch (error) {
      toast({
        title: error + '',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    const fetchDataAndHandleErrors = async () => {
      try {
        await fetchData();
      } catch (error) {
        toast({
          title: error + '',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchDataAndHandleErrors();
  }, [fetchData, toast]);

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" width="100%" height="100%">
      <LiveStatus />
      <Flex flexDir="row" justifyContent="space-between" width="100%" height="100%" padding={5} bg="#343B41" gap={4}>
      <Flex flexDir="column" width="35%">
      <Flex flexDir="column" height="300px">
          <Flex bg="#2B3034" justifyContent={'center'} alignItems='center' color="white" fontFamily={'Conthrax'} height="50px">Altitude</Flex>
        <Flex color="white" bg="#31363C" height="70%" padding={5}>{sensorData.altitude}</Flex>
        </Flex>
        <Flex flexDir="column" height="300px">
          <Flex bg="#2B3034" justifyContent={'center'} alignItems='center' color="white" fontFamily={'Conthrax'} height="50px">Velocity</Flex>
        <Flex color="white" bg="#31363C" height="70%" padding={5}>{sensorData.velocity}</Flex>
        </Flex>
        </Flex>
        <Flex flexDir="column" width="35%">
        <Flex flexDir="column" height="560px">
          <Flex bg="#2B3034" justifyContent={'center'} alignItems='center' color="white" fontFamily={'Conthrax'} height="50px">Temperature</Flex>
          <GaugeChart value={sensorData.temperature}/>
        </Flex>
        </Flex>
      <Flex flexDir="column" width="30%" gap={4}>
      <IconButton bg="#095EDD" color="white" aria-label='Refresh' icon={<RepeatIcon />} alignSelf="end" onClick={fetchData}/>
        <Flex flexDir="column" minHeight="193px">
          <Flex bg="#2B3034" justifyContent={'center'} alignItems='center' color="white" fontFamily={'Conthrax'} height="50px">Status</Flex>
        <Flex color="white" bg="#31363C" height="70%" padding={5} textAlign={'center'}>{sensorData.statusMessage}</Flex>
        </Flex>
        <Flex flexDir="column" minHeight="200px">
          <Flex bg="#2B3034" justifyContent={'center'} alignItems='center' color="white" fontFamily={'Conthrax'} height="50px">{sensorData.isAscending ? 'Ascending' : 'Propellant loading'}</Flex>
        <Flex color="white" bg="#31363C">
        <VideoPlayer key={sensorData.isAscending ? 'ascending' : 'notAscending'} src={sensorData.isAscending === true ? '/ascending.mp4': '/notAscending.mp4'}/>
        </Flex>
        </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;