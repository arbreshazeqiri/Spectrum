import React from 'react';
import { Modal, Button, Heading, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react';
import { actOnSpectrum } from '../api/sensors';

interface ActionRequiredModalProps {
  onAction: (value: boolean) => void;
}

const ActionRequiredModal: React.FC<ActionRequiredModalProps> = ({ onAction }) => {
  const handleAction = async () => {
    try {
      await actOnSpectrum();
      // Provide feedback to the user or update UI as needed
      onAction(false); // Close the modal
    } catch (error) {
      console.error('Error performing action:', error);
      // Handle error gracefully, maybe display a user-friendly error message
    }
  };

  return (
    <Modal isOpen={true} onClose={() => onAction(false)}>
      <ModalHeader>
        <Heading>Critical Status Change</Heading>
      </ModalHeader>
      <ModalBody>
        <p>Action is required! Please take necessary steps.</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={handleAction}>
          Take Action
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ActionRequiredModal;
