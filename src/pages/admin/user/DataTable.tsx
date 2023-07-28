import {
  Button,
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
import { DeleteIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { authApi } from '../../../utils';
import { useQueryClient } from '@tanstack/react-query';

export default function DataTable({
  TableColumns,
  TableData,
}: {
  TableColumns: string[];
  TableData: any[];
}): JSX.Element {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userId, setUserId] = useState<number | null>(null);

  async function deleteUser() {
    if (userId) {
      await authApi.delete(`api/admin/users/delete/${userId}`);
      queryClient.invalidateQueries('users');
    }
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              {TableColumns.map((item) => (
                <Th>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {TableData.map((data) => (
              <Tr>
                <Th>{data.first_name}</Th>
                <Th>{data.last_name}</Th>
                <Th>{data.email}</Th>
                <Th>{data.role}</Th>
                <Th>
                  <DeleteIcon
                    className="ml-6 cursor-pointer"
                    onClick={() => {
                      setUserId(data.id);
                      onOpen();
                    }}
                  />
                  <Modal isOpen={isOpen} onClose={onClose}>
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
                        <Button variant="ghost" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            deleteUser();
                            onClose();
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
    </>
  );
}

// function tableHeaderWrapper(item: string) {
//   return <Th>{item}</Th>;
// }
