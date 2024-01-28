import {
  Button,
  Flex,
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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { authApi } from '@utils/axios';
import { ProjectFormData } from '@interfaces/forms.interface';

export default function ProjectsTable({
  TableColumns,
  TableData,
  onOpen,
  projectId,
  setProjectId,
  setUpdateProject,
}: {
  TableColumns: string[];
  TableData: any[];
  onOpen: () => void;
  projectId: number | null;
  setProjectId: React.Dispatch<React.SetStateAction<number | null>>;
  setUpdateProject: React.Dispatch<
    React.SetStateAction<ProjectFormData | undefined>
  >;
}): JSX.Element {
  // const [projectId, setProjectId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const deleteModal = useDisclosure();

  async function deleteProject() {
    if (projectId) {
      await authApi.delete(`/api/admin/projects/${projectId}`);
      queryClient.invalidateQueries(['projects']);
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
              <Th>
                <Link
                  as={RouterLink}
                  to={`/user/projects/${data.id}`}
                  style={{ textDecoration: 'none' }}>
                  {data.title}
                </Link>
              </Th>
              <Th>
                {data?.manager?.first_name + ' ' + data?.manager?.last_name}
              </Th>
              <Th hidden>{data.description}</Th>
              <Th>
                {formatDistanceToNow(Date.parse(data.updated_at), {
                  addSuffix: true,
                })}
              </Th>
              <Th>{data.status}</Th>
              <Th>
                <Flex className="ml-1 gap-1">
                  <EditIcon
                    className="cursor-pointer"
                    focusable={true}
                    onClick={() => {
                      setProjectId(data.id);
                      setUpdateProject({
                        title: data.title,
                        description: data.description,
                        manager_id: data.manager.id,
                        status: data.status,
                      });
                      onOpen();
                    }}
                  />
                  <DeleteIcon
                    className="ml-6 cursor-pointer"
                    focusable={true}
                    onClick={() => {
                      setProjectId(data.id);
                      deleteModal.onOpen();
                    }}
                  />
                </Flex>
                <Modal
                  isOpen={deleteModal.isOpen}
                  onClose={() => deleteModal.onClose()}>
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
                      <Button
                        variant="ghost"
                        mr={3}
                        onClick={() => deleteModal.onClose()}>
                        Close
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          deleteProject();
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
