import React from 'react';
import { Flex, Text, IconButton } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import VideoPlayer from './VideoPlayer';

interface InfoProps {
  isLive: boolean;
  status: string;
  isAscending: boolean;
  setIsLive: () => void;
  fetchData: () => void;
}

const Info: React.FC<InfoProps> = ({ isLive, status, isAscending, setIsLive, fetchData }) => (
  <Flex flexDir="column" width="30%" gap={4}>
    <Flex flexDir="row" justifyContent={'space-between'} alignItems="center">
      <Text color={isLive ? 'red' : 'green'} cursor="pointer" fontWeight={600} fontSize="md" onClick={setIsLive}>
        {isLive ? 'Stop' : 'Start Live Sync'}
      </Text>
      <IconButton bg="#095EDD" color="white" aria-label="Refresh" icon={<RepeatIcon />} alignSelf="end" onClick={fetchData} />
    </Flex>
    <Flex flexDir="column" minHeight="193px">
      <Flex bg="#2B3034" justifyContent={'center'} alignItems='center' color="white" fontFamily={'Conthrax'} height="50px">
        Status
      </Flex>
      <Flex color="white" bg="#31363C" height="70%" padding={5} textAlign={'center'}>
        {status}
      </Flex>
    </Flex>
    <Flex flexDir="column" minHeight="200px">
      <Flex
        bg="#2B3034"
        justifyContent={'center'}
        alignItems='center'
        color="white"
        fontFamily={'Conthrax'}
        height="50px"
      >
        {isAscending ? 'Ascending' : 'Descending'}
      </Flex>
      <Flex color="white" bg="#31363C">
        <VideoPlayer key={isAscending ? 'ascending' : 'notAscending'} src={isAscending === true ? '/ascending.mp4' : '/notAscending.mp4'} />
      </Flex>
    </Flex>
  </Flex>
);

export default Info;
