import {Flex} from '@chakra-ui/react';
import React from 'react';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <Flex flex={1}>
      <video muted={true} autoPlay loop>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Flex>
  );
};

export default VideoPlayer;
