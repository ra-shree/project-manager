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
  Spinner,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { TasksTable, CreateTask } from '..';
import { authApi } from '../../../utils';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isSuccess } = useQuery({
    queryKey: [`tasks`],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/tasks`);
      return response.data;
    },
  });

  return (
    <>
      <Flex style={{ padding: '1em 1em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            Tasks
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Button colorScheme="whatsapp" onClick={onOpen}>
            Create New Task
          </Button>
        </Box>
      </Flex>
      {isSuccess ? (
        <TasksTable
          tableColumns={['Title', 'Assigned To', 'Description', 'Actions']}
          tableData={data}
        />
      ) : (
        <Spinner size="xl" />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateTask onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
