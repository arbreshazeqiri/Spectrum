import { WarningIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Flex } from '@chakra-ui/react';
import {useEffect} from 'react';

interface ActionRequiredModalProps {
  isOpen: boolean;
  onClose: () => void; // Add this prop
}

const ActionRequiredModal: React.FC<ActionRequiredModalProps> = ({ isOpen, onClose }) => {

const handleAction = async () => {
  try {
    await fetch('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'someAction'
      }),
    });

    onClose()
  } catch (error) {
    console.error('Error performing action:', error);
  }
};

useEffect(() => {
  const audio = new Audio('/critical-alert.mp3');

  audio.addEventListener('loadeddata', () => {
    if (isOpen) {
      audio.play();
    }
  });

  return () => {
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  };
}, [isOpen]);



  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
        <Flex gap={2}><WarningIcon w={8} h={8} color="red.500" /><Text fontSize="2xl">Critical Status Change</Text></Flex>
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
