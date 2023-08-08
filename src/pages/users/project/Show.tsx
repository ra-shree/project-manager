import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Heading,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Spacer,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, useAppSelector } from '../../../utils';
import { useDisclosure } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { UserTable, AddUser } from '..';
import { UserState } from '../../../features';
import { UpdateStatusFormData } from './types';
import { useForm } from 'react-hook-form';
import { Loading } from '../../../components';

export default function ProjectPage() {
  let queryClient = useQueryClient();
  let { current_project_id: projectId } = useParams();
  const memberSelectModal = useDisclosure();
  const statusChangeModal = useDisclosure();

  const { register, handleSubmit } = useForm<UpdateStatusFormData>();

  const userInfo = useAppSelector<UserState>((state: any) => {
    return state.user;
  });

  const projectQuery = useQuery({
    queryKey: [`project`],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/projects/${projectId}`);
      return response.data;
    },
  });

  async function onSubmit(values: UpdateStatusFormData) {
    try {
      const res = await authApi.patch(
        `/api/user/projects/status/${projectId}`,
        values
      );
      if (res.status === 200) {
        queryClient.invalidateQueries(['project']);
      }
    } catch (error) {
      console.log(error);
    } finally {
      statusChangeModal.onClose();
    }
  }

  return (
    <>
      <Box style={{ padding: '1em 1em 1em 2em' }}>
        {projectQuery.isSuccess ? (
          <>
            <Box paddingBottom={3}>
              <Heading size="lg" h={8}>
                {projectQuery.data.title}
              </Heading>
            </Box>
            <Spacer />
            <Flex paddingBottom={3}>
              <Box>
                <Select
                  isDisabled={userInfo?.role === 'developer' ? true : false}
                  {...register('status')}
                  onChange={() => {
                    statusChangeModal.onOpen();
                  }}>
                  <option
                    key="Draft"
                    value="Draft"
                    selected={
                      projectQuery.data.status === 'Draft' ? true : false
                    }>
                    Draft
                  </option>
                  <option
                    key="On Hold"
                    value="On Hold"
                    selected={
                      projectQuery.data.status === 'On Hold' ? true : false
                    }>
                    On Hold
                  </option>
                  <option
                    key="Completed"
                    value="Completed"
                    selected={
                      projectQuery.data.status === 'Completed' ? true : false
                    }>
                    Completed
                  </option>
                  <option
                    key="In Progress"
                    value="In Progress"
                    selected={
                      projectQuery.data.status === 'In Progress' ? true : false
                    }>
                    In Progress
                  </option>
                </Select>
              </Box>
              <Spacer />
              <Box>
                <Text>
                  {formatDistanceToNow(
                    Date.parse(projectQuery?.data?.updated_at),
                    {
                      addSuffix: true,
                    }
                  )}
                </Text>
              </Box>
            </Flex>

            <Box paddingBottom="4">
              <Text>{projectQuery.data.description}</Text>
            </Box>
            <Flex className="flex" paddingBottom={2}>
              <Box flex="1"></Box>
              <Flex className="gap-2">
                <InputGroup>
                  <Input placeholder="Search for member" />
                  <InputRightElement pointerEvents="none">
                    <SearchIcon />
                  </InputRightElement>
                </InputGroup>

                {userInfo?.role !== 'developer' && (
                  <Button
                    colorScheme="twitter"
                    onClick={memberSelectModal.onOpen}
                    padding="20px">
                    Add member
                  </Button>
                )}
              </Flex>
            </Flex>
            <UserTable
              tableColumns={[
                'First Name',
                'Last Name',
                'Email Address',
                'Role',
                'Actions',
              ]}
              tableData={projectQuery.data.members}
              projectId={parseInt(projectId ? projectId : '')}
            />
          </>
        ) : (
          <Loading />
        )}
      </Box>
      <AddUser
        isOpen={memberSelectModal.isOpen}
        onClose={memberSelectModal.onClose}
        currentProjectId={parseInt(projectId ? projectId : '')}
      />
      <Modal
        isOpen={statusChangeModal.isOpen}
        onClose={statusChangeModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Project Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">
              Are you sure you want update status of the project?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={statusChangeModal.onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
