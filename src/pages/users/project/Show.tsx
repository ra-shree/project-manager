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
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../../utils';
import { useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import formatRelative from 'date-fns/formatRelative';
import UserTable from './UserTable';

interface AddMemberFormData {
  user_id: number;
  project_id: number;
}

export default function ProjectPage() {
  let { current_project_id } = useParams();
  // const [selection, setSelection] = useState(false);
  let projectId = parseInt(current_project_id);
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const schema: ZodType<AddMemberFormData> = z.object({
    user_id: z.number(),
    project_id: z.number(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMemberFormData>({
    resolver: zodResolver(schema),
  });

  const [projectQuery, developerQuery] = useQueries({
    queries: [
      {
        queryKey: [`project`],
        queryFn: async () => {
          const response = await authApi.get(
            `/api/user/projects/${current_project_id}`
          );
          return response.data;
        },
      },

      {
        queryKey: [`project.developers`],
        queryFn: async () => {
          const response = await authApi.get(
            `/api/user/projects/${current_project_id}/add`
          );
          return response.data;
        },
      },
    ],
  });

  async function addMemberOnSubmit(values: AddMemberFormData) {
    try {
      const res = await authApi.post(
        `/api/user/projects/${current_project_id}/add`,
        values
      );
      if (res.data == 'Developer added to Project') {
        // setSelection(true);
        queryClient.invalidateQueries('project.developers');
        queryClient.invalidateQueries('project');
        onClose();
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   setSelection(false);
  // }, []);
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
              projectId={current_project_id}
            />
          </>
        ) : (
          <Spinner size="xl" />
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add members</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="add_developer" method="post">
              <FormControl>
                <Select
                  id="user_id"
                  placeholder="Select a Developer"
                  {...register('user_id', { valueAsNumber: true })}
                  isInvalid={errors.user_id}>
                  {developerQuery.isSuccess ? (
                    developerQuery.data.map((data) => (
                      <option value={data.id}>
                        {data.email} ({data.first_name + ' ' + data.last_name})
                      </option>
                    ))
                  ) : (
                    <Spinner size="xl" />
                  )}
                </Select>
                <Input
                  id="project_id"
                  type="number"
                  value={projectId}
                  {...register('project_id', { valueAsNumber: true })}
                  isInvalid={errors.project_id}
                  hidden
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="twitter"
              onClick={handleSubmit(addMemberOnSubmit)}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
