import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Heading,
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Spacer,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, useAppSelector } from '../../../utils';
import { useDisclosure } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { UserTable, AddUser, TaskForm } from '..';
import z, { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserState } from '../../../features';
import { UpdateStatusFormData } from './types';
import { useForm } from 'react-hook-form';
import { Loading } from '../../../components';
import TaskTable from './TaskTable';
import { TaskFormData } from '../task/types';

export default function ProjectPage() {
  let queryClient = useQueryClient();
  let { current_project_id: projectId } = useParams();
  const memberSelectModal = useDisclosure();
  const statusChangeModal = useDisclosure();
  const taskFormModal = useDisclosure();

  const { register, handleSubmit } = useForm<UpdateStatusFormData>();

  // const addTask = useForm<TaskFormData>();
  const schema: ZodType<TaskFormData> = z.object({
    title: z.string().min(3).max(255),
    description: z.string().max(500).nullable(),
    project_id: z.number().int().positive(),
    user_id: z.number().int().positive(),
  });

  const addTask = useForm<TaskFormData>({
    resolver: zodResolver(schema),
  });

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

  async function onSubmitCreateTask(values: TaskFormData) {
    try {
      // addTask.setValue('project_id', parseInt(projectId ? projectId : ''));
      const res = await authApi.post(`/api/user/tasks`, values);
      if (res.data == 'Task Created') {
        queryClient.invalidateQueries(['project']);
        queryClient.invalidateQueries(['report']);
        queryClient.invalidateQueries(['task.new']);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      taskFormModal.onClose();
      addTask.reset();
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
            <Flex paddingBottom={3} gap={2}>
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
              <Box>
                <Button
                  colorScheme="green"
                  padding="20px"
                  onClick={taskFormModal.onOpen}>
                  Add Task
                </Button>
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
            <Tabs>
              <TabList>
                <Tab>Users</Tab>
                <Tab>Tasks</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
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
                </TabPanel>
                <TabPanel>
                  <TaskTable
                    tableColumns={['Title', 'Assigned To', 'Description']}
                    tableData={projectQuery?.data?.tasks}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
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
      <Modal isOpen={taskFormModal.isOpen} onClose={taskFormModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              method="post"
              id="add_task"
              style={{ padding: '0em 1em 1em 1em' }}
              onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                id="title"
                paddingBottom={4}
                isInvalid={addTask.formState.errors.title ? true : false}
                isRequired>
                <FormLabel>Choose a title</FormLabel>
                <Input type="text" {...addTask.register('title')} />
                <FormErrorMessage>
                  {addTask.formState.errors.title &&
                    addTask.formState.errors.title?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl paddingBottom={6}>
                <FormLabel>Choose a Project</FormLabel>
                <Input
                  id="project_id"
                  placeholder="Select a Project"
                  {...addTask.register('project_id', { valueAsNumber: true })}
                  isInvalid={addTask.formState.errors.project_id ? true : false}
                  defaultValue={projectId ? projectId : ''}
                  isRequired
                  hidden
                />
                <FormErrorMessage>
                  {addTask.formState.errors.project_id &&
                    addTask.formState.errors.project_id?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl paddingBottom={4}>
                <Textarea
                  id="description"
                  placeholder="Add a description"
                  style={{ height: '10em' }}
                  isInvalid={
                    addTask.formState.errors.description ? true : false
                  }
                  {...addTask.register('description')}
                />
                <FormErrorMessage>
                  {addTask.formState.errors.description &&
                    addTask.formState.errors.description?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl paddingBottom={4}>
                <FormLabel>Assign a Developer</FormLabel>
                <Select
                  id="user_id"
                  placeholder="Select a Developer"
                  {...addTask.register('user_id', {
                    valueAsNumber: true,
                  })}
                  isInvalid={addTask.formState.errors.user_id ? true : false}>
                  {projectQuery.isSuccess ? (
                    projectQuery?.data?.members?.map((data: any) => (
                      <option key={data.id} value={data.id}>
                        {data.first_name + ' ' + data.last_name}
                      </option>
                    ))
                  ) : (
                    <Spinner size="xl" />
                  )}
                </Select>
                <FormErrorMessage>
                  {addTask.formState.errors.user_id &&
                    addTask.formState.errors.user_id?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={taskFormModal.onClose}>
              Close
            </Button>
            <Button
              form="add_task"
              loadingText="Creating"
              colorScheme="twitter"
              onClick={addTask.handleSubmit(onSubmitCreateTask)}>
              Create Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
