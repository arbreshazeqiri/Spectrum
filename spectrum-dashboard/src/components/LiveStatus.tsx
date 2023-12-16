import { Flex, Box, Text} from "@chakra-ui/react"
import {useEffect, useState} from "react";

const LiveStatus = () => {
    const [isDotVisible, setIsDotVisible] = useState(true);
    useEffect(() => {
        const intervalId = setInterval(() => {
          setIsDotVisible((prevIsDotVisible) => !prevIsDotVisible);
        }, 500);
    
        return () => clearInterval(intervalId);
      }, []);

    return (
    <Flex gap={1} alignItems={'center'} justifyContent={'center'} alignSelf="end" paddingX={5} paddingY={1}>
    <Box
      bg="green"
      h="8px"
      w="8px"
      borderRadius="50%"
      animation={`${isDotVisible ? 'blink' : 'none'} 0.5s linear infinite`}
    />
    <Text fontFamily='Conthrax' color="black">Live</Text>
  </Flex>)
}

export default LiveStatus;