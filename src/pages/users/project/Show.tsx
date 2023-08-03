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

const projectStatusItems = ['Draft', 'On Hold', 'Completed', 'In Progress'];

export default function ProjectPage({ userInfo }: { userInfo: UserState }) {
  let queryClient = useQueryClient();

  let { current_project_id } = useParams();
  current_project_id = current_project_id ? current_project_id : '0';

  let projectId = parseInt(current_project_id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, setValue } = useForm<UpdateStatusFormData>();

  const projectQuery = useQuery({
    queryKey: [`project`],
    queryFn: async () => {
      const response = await authApi.get(
        `/api/user/projects/${current_project_id}`
      );
      return response.data;
    },
  });

  async function onSubmit(values: UpdateStatusFormData) {
    try {
      const res = await authApi.patch(
        `/api/user/projects/status/${current_project_id}`,
        values
      );
      if (res.data?.status) {
        setValue('status', res.data?.status);
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
                  onChange={handleSubmit(onSubmit)}
                  defaultValue={projectQuery.data.status}>
                  {projectStatusItems.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
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
