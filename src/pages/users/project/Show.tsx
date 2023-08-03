import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  Heading,
  Box,
  Flex,
  Spacer,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../../utils';
import { useDisclosure } from '@chakra-ui/react';
import formatRelative from 'date-fns/formatRelative';
import UserTable from './UserTable';
import { AddUser } from '..';
import { UserState } from '../../../features';
import { UpdateStatusFormData } from './types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function ProjectPage({ userInfo }: { userInfo: UserState }) {
  let queryClient = useQueryClient();
  let { current_project_id } = useParams();
  current_project_id = current_project_id?.toString();

  let projectId = parseInt(current_project_id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, getValues, setValue } =
    useForm<UpdateStatusFormData>();

  const projectQuery = useQuery({
    queryKey: [`project`],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/projects/${projectId}`);
      return response.data;
    },
  });

  async function onSubmit(values: UpdateStatusFormData) {
    console.log(getValues('status'));
    try {
      const res = await authApi.patch(
        `/api/user/projects/status/${projectId}`,
        values
      );
      // console.log(res);
      if (res.status === 200) {
        queryClient.invalidateQueries(['project']);
      }
    } catch (error) {
      console.log(error);
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
                  isDisabled={userInfo.role === 'developer' ? true : false}
                  {...register('status')}
                  onChange={handleSubmit(onSubmit)}>
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
                  {formatRelative(
                    Date.parse(projectQuery.data.created_at),
                    Date.now()
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

                {userInfo.role === 'manager' && (
                  <Button colorScheme="twitter" onClick={onOpen} padding="20px">
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
              projectId={projectId}
            />
          </>
        ) : (
          <Spinner size="xl" />
        )}
      </Box>
      <AddUser isOpen={isOpen} onClose={onClose} currentProjectId={projectId} />
    </>
  );
}
