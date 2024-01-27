import {
  Button,
  Link,
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
import { useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export default function UserTable({
  tableColumns,
  tableData,
  projectId,
}: {
  tableColumns: string[];
  tableData: any[];
  projectId: number;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userId, setUserId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  async function deleteUser() {
    try {
      if (userId) {
        const res = await authApi.delete(
          `api/user/members/${projectId}/remove/${userId}`
        );
        if (res.data == 'Member Removed') {
          queryClient.invalidateQueries(['project']);
          queryClient.invalidateQueries([
            'project.developers',
            projectId.toString(),
          ]);
        }
      }
    } catch (err) {
      console.log(projectId);
      console.log(userId);
      console.log(err);
    } finally {
      onClose();
    }
  }

  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            {tableColumns.map((item) => (
              <Th key={item}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((data) => (
            <Tr key={data.id}>
              <Th>{data.first_name}</Th>
              <Th>{data.last_name}</Th>
              <Th>
                <Link
                  as={RouterLink}
                  to={`/user/profile/${data.id}`}
                  style={{ textDecoration: 'none' }}>
                  {data.email}
                </Link>
              </Th>
              <Th>{data.role}</Th>
              <Th>
                <DeleteIcon
                  className="ml-6 cursor-pointer"
                  onClick={() => {
                    setUserId(data?.id);
                    onOpen();
                  }}
                />
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Remove this Developer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text mb="1rem">
                        Are you sure you want to remove this developer from the
                        project?
                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="ghost" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button colorScheme="red" onClick={deleteUser}>
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
