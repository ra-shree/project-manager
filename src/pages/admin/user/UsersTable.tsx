import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { authApi } from '../../../utils';
import { useQueryClient } from '@tanstack/react-query';
import { UserFormData } from './types';

export default function UsersTable({
  TableColumns,
  TableData,
  onOpen,
  userId,
  setUserId,
  setUpdateUser,
}: {
  TableColumns: string[];
  TableData: any[];
  onOpen: () => void;
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  setUpdateUser: React.Dispatch<React.SetStateAction<UserFormData | undefined>>;
}): JSX.Element {
  const queryClient = useQueryClient();
  const deleteModal = useDisclosure();

  async function deleteUser() {
    if (userId) {
      await authApi.delete(`api/admin/users/delete/${userId}`);
      queryClient.invalidateQueries(['users']);
    }
  }

  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            {TableColumns.map((item) => (
              <Th key={item}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {TableData.map((data) => (
            <Tr key={data.id}>
              <Th>{data.first_name}</Th>
              <Th>{data.last_name}</Th>
              <Th>{data.email}</Th>
              <Th>{data.role}</Th>
              <Th>
                <Flex className="ml-1 gap-1">
                  <EditIcon
                    className="cursor-pointer"
                    focusable={true}
                    onClick={() => {
                      setUserId(data.id);
                      setUpdateUser({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        role: data.role,
                      });
                      onOpen();
                    }}
                  />
                  <DeleteIcon
                    className="ml-6 cursor-pointer"
                    focusable={true}
                    onClick={() => {
                      setUserId(data.id);
                      deleteModal.onOpen();
                    }}
                  />
                </Flex>
                <Modal
                  isOpen={deleteModal.isOpen}
                  onClose={deleteModal.onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Delete User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text mb="1rem">
                        Are you sure you want to delete this user?
                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        variant="ghost"
                        mr={3}
                        onClick={deleteModal.onClose}>
                        Close
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          deleteUser();
                          deleteModal.onClose();
                        }}>
                        Yes
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
