import { WarningIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface ActionRequiredModalProps {
  firstLoad: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const ActionRequiredModal: React.FC<ActionRequiredModalProps> = ({ firstLoad, isOpen, onClose }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (firstLoad || !isOpen) {
      return;
    }

    const audioElement = new Audio('/critical-alert.mp3');
    setAudio(audioElement);

    audioElement.play();
  }, [isOpen, firstLoad]);

  const handleAction = async () => {
    try {
      await fetch('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'someAction',
        }),
      });

      onClose();
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };

  const playSound = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false} size="md">
      <ModalOverlay onClick={playSound} />
      <ModalContent>
        <ModalHeader>
          <Flex gap={2}>
            <WarningIcon w={8} h={8} color="red.500" />
            <Text fontSize="2xl">Critical Status Change</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <p>Action is required! Please take necessary steps.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" bg="red.500" color="white" onClick={handleAction}>
            Take Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActionRequiredModal;
