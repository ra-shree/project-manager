import {
  Box,
  Button,
  Heading,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { ProjectsTable, CreateProjectForm } from '.';

export default function Projects(): JSX.Element {
  // this is used to check if the create project modal is visible
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex style={{ padding: '1em 0em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            My Projects
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Button colorScheme="twitter" onClick={onOpen}>
            Create Project
          </Button>
        </Box>
      </Flex>
      <ProjectsTable />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateProjectForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
