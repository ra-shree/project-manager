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
import { TasksTable, TaskForm } from '.';
import { TaskFormData } from './task/types';
import { useFetchTasks } from '@hooks/users';
import { Loading } from '@components/ui';

export function UserTasksPage() {
  const [updateTask, setUpdateTask] = useState<TaskFormData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: tasks, isSuccess } = useFetchTasks();

  return (
    <>
      <Flex style={{ padding: '1em 1em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            Tasks
          </Heading>
        </Box>
        <Spacer />
      </Flex>
      {isSuccess ? (
        <TasksTable
          tableColumns={['Title', 'Assigned To', 'Description', 'Actions']}
          tableData={tasks}
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
