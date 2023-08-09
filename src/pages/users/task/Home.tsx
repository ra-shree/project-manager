import {
  Box,
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
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { TasksTable, TaskForm } from '..';
import { authApi } from '../../../utils';
import { TaskFormData } from './types.d';
import { Loading } from '../../../components';

export default function Home() {
  const [updateTask, setUpdateTask] = useState<TaskFormData>();
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
        {/* <Box>
          <Button
            colorScheme="whatsapp"
            onClick={() => {
              setUpdateTask(undefined);
              onOpen();
            }}>
            Create New Task
          </Button>
        </Box> */}
      </Flex>
      {isSuccess ? (
        <TasksTable
          tableColumns={['Title', 'Assigned To', 'Description', 'Actions']}
          tableData={data}
          onOpen={onOpen}
          setUpdateTask={setUpdateTask}
        />
      ) : (
        <Loading />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!updateTask ? 'Create a Task' : 'Update Task'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm
              updateTask={updateTask}
              setUpdateTask={setUpdateTask}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
