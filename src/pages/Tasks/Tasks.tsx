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
import { useDisclosure } from '@chakra-ui/react';
import { TasksTable } from '.';
import { CreateTaskForm } from '.';

export default function Tasks() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex style={{ padding: '1em 0em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            My Tasks
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Button colorScheme="whatsapp" onClick={onOpen}>
            Create New Task
          </Button>
        </Box>
      </Flex>
      <TasksTable />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateTaskForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
