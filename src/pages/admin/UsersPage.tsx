import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spacer,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { UserFormData } from './user/types';
import { useFetchUsers } from '@hooks/admin';
import { Loading } from '@components/ui';
import UsersTable from './user/UsersTable';
import UserForm from './user/Create';

export function UsersPage() {
  const [userId, setUserId] = useState<number | null>(null);
  const [updateUser, setUpdateUser] = useState<UserFormData>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: users, isSuccess } = useFetchUsers();

  return (
    <>
      <Flex style={{ padding: '1em 0em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            Users
          </Heading>
        </Box>
        <Spacer />
        <Box className="pr-4">
          <Button
            colorScheme="twitter"
            onClick={() => {
              setUserId(null);
              setUpdateUser(undefined);
              onOpen();
            }}>
            Create New User
          </Button>
        </Box>
      </Flex>
      {isSuccess ? (
        <UsersTable
          TableColumns={['First Name', 'Last Name', 'Email', 'Role', 'Actions']}
          TableData={users}
          onOpen={onOpen}
          userId={userId}
          setUserId={setUserId}
          setUpdateUser={setUpdateUser}
        />
      ) : (
        <Loading />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!updateUser ? 'Create a User' : 'Update User Information'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm
              userId={userId}
              updateUser={updateUser}
              setUpdateUser={setUpdateUser}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
