import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

const TermsAndConditions = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Terms and Conditions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Welcome to Passport2Love!</p>
          <p>
            Please read these Terms and Conditions carefully before using Passport2Love Dating App.
          </p>
          <p>
            Your access to and use of Passport2Love is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          <h2>Content</h2>
          <p>
            Passport2Love allows you to upload, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the content that you post on or through Passport2Love, including its legality, reliability, and appropriateness.
          </p>
          <h2>Prohibited Activities</h2>
          <p>
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul>
            <li>Using Passport2Love for any purpose that is illegal or prohibited by these Terms.</li>
            <li>Engaging in any form of harassment or abusive behavior towards other users.</li>
            <li>Posting explicit or inappropriate content, including nudity, sexual content, or offensive language.</li>
            <li>Impersonating another person or misrepresenting your identity.</li>
            <li>Engaging in any activity that violates the privacy or rights of others.</li>
            <li>Engaging in any activity that disrupts or interferes with the app or its functionality.</li>
            <li>Engaging in sex trafficking or any illegal activities related to human exploitation.</li>
            <li>Attacking or discriminating against others based on their background, ethnicity, country of origin, or any other protected characteristics.</li>
          </ul>
         
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TermsAndConditions;
