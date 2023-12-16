import { FC, useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

interface LiveStatusProps {
  isLive: boolean;
}

const LiveStatus: FC<LiveStatusProps> = ({ isLive }) => {
  const [isDotVisible, setIsDotVisible] = useState(true);

  useEffect(() => {
    if (isLive) {
      const intervalId = setInterval(() => {
        setIsDotVisible((prevIsDotVisible) => !prevIsDotVisible);
      }, 500);

      return () => clearInterval(intervalId);
    } else {
      // If not live, clear the interval immediately
      setIsDotVisible(false);
    }
  }, [isLive]);

  return (
    <Flex gap={1} alignItems={"center"} justifyContent={"center"} alignSelf="end" paddingX={5} paddingY={1}>
      <Box
        bg={isLive ? "green" : "red"}
        h="8px"
        w="8px"
        borderRadius="50%"
        animation={`${isLive && isDotVisible ? "blink" : "none"} 0.5s linear infinite`}
      />
      <Text fontFamily="Conthrax" color="black">
        Live
      </Text>
    </Flex>
  );
};

export default LiveStatus;
