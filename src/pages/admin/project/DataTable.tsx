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
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { formatRelative } from 'date-fns';
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
  const [projectId, setProjectId] = useState<number | null>(null);

  async function deleteProject() {
    if (projectId) {
      await authApi.delete(`api/admin/projects/delete/${projectId}`);
      queryClient.invalidateQueries('projects');
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
                <Th>
                  <Link
                    as={RouterLink}
                    to={`/admin/projects/${data.id}`}
                    style={{ textDecoration: 'none' }}>
                    {data.title}
                  </Link>
                </Th>
                <Th>{data.user.first_name + ' ' + data.user.last_name}</Th>
                <Th hidden>{data.description}</Th>
                <Th>
                  {formatRelative(Date.parse(data.created_at), Date.now())}
                </Th>
                <Th>{data.status}</Th>
                <Th>
                  <DeleteIcon
                    className="ml-6"
                    onClick={() => {
                      setProjectId(data.id);
                      onOpen();
                    }}
                  />
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Delete Project</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text mb="1rem">
                          Are you sure you want to delete this project?
                        </Text>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            deleteProject();
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
