import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button } from '@chakra-ui/react';

const VideoConditions = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Video Upload Conditions</ModalHeader>
        <ModalBody>
        <ul>
            <li>No full nudity or explicit sexual content.</li>
            <li>No inappropriate or offensive language or gestures.</li>
            <li>Respect the community guidelines and other users.</li>
            <li>Do not upload videos containing violence, hate speech, or harm to others.</li>
        </ul>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VideoConditions;
