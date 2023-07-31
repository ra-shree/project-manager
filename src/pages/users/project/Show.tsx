import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  Heading,
  Box,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../../utils';
import { useDisclosure } from '@chakra-ui/react';
import formatRelative from 'date-fns/formatRelative';
import UserTable from './UserTable';
import { AddUser } from '..';

export default function ProjectPage() {
  let { current_project_id } = useParams();
  if (current_project_id === undefined) {
    current_project_id = '0';
  }
  let projectId = parseInt(current_project_id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const projectQuery = useQuery({
    queryKey: [`project`],
    queryFn: async () => {
      const response = await authApi.get(
        `/api/user/projects/${current_project_id}`
      );
      return response.data;
    },
  });

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
                <Text>{projectQuery.data.status}</Text>
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
                <Button colorScheme="twitter" onClick={onOpen} padding="20px">
                  Add member
                </Button>
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
