import React from 'react';
import { Flex, Spacer, Heading, Image } from '@chakra-ui/react';
import '../fonts/Conthrax/Conthrax.otf'

const Navbar: React.FC = () => {
  return (
    <Flex bg="black" py={4} px={6} alignItems="center" width="100%">
      <Heading fontFamily="Conthrax" color="white">SPECTRUM</Heading>
      <Spacer />
      <Flex>
        <Image src="/logo.svg" width="90%" />
      </Flex>
    </Flex>
  );
};

export default Navbar;
