import {
  Card,
  CardHeader,
  CardBody,
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { Loading } from '../../components';
import { useQueries } from '@tanstack/react-query';
import { authApi } from '../../utils';
import { formatDistanceToNow } from 'date-fns';

const headingStyle = {
  fontWeight: 'bolder',
  fontSize: '1.8rem',
};

export default function AdminDashboard() {
  const [reportQuery, newProjectQuery, updatedProjectQuery, newTaskQuery] =
    useQueries({
      queries: [
        {
          queryKey: [`report`],
          queryFn: async () => {
            const response = await authApi.get(`/api/admin/summary/count`);
            return response.data;
          },
        },

        {
          queryKey: [`project.new`],
          queryFn: async () => {
            const response = await authApi.get(
              `/api/admin/summary/project/new`
            );
            return response.data;
          },
        },
        {
          queryKey: [`project.updated`],
          queryFn: async () => {
            const response = await authApi.get(
              `/api/admin/summary/project/updated`
            );
            return response.data;
          },
        },
        {
          queryKey: [`task.new`],
          queryFn: async () => {
            const response = await authApi.get(`/api/admin/summary/task/new`);
            return response.data;
          },
        },
      ],
    });

  return (
    <Box style={{ padding: '1em 1em 1em 2em' }}>
      <Heading size="lg" h={8}>
        Dashboard
      </Heading>
      <Grid
        templateColumns="repeat(4, 3fr)"
        gap="4"
        style={{ padding: '1em 0' }}>
        <GridItem w="100%" h="10">
          <Card style={{ maxHeight: '80vh' }}>
            <CardHeader>
              <Heading style={headingStyle}>Summary Report</Heading>
            </CardHeader>
            {reportQuery.isSuccess ? (
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="md">Users</Heading>
                    <Text pt="2" fontSize="md">
                      Developer Count: {reportQuery?.data?.developer_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Manager Count: {reportQuery?.data?.manager_count}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="md">Projects</Heading>
                    <Text pt="2" fontSize="md">
                      Completed: {reportQuery?.data?.completed_project_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Ongoing: {reportQuery?.data?.ongoing_project_count}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="md">Tasks</Heading>
                    <Text pt="2" fontSize="md">
                      Completed: {reportQuery?.data?.completed_task_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Incomplete: {reportQuery?.data?.incomplete_task_count}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            ) : (
              <Loading />
            )}
          </Card>
        </GridItem>
        <GridItem w="100%" h="10">
          <Card style={{ maxHeight: '80vh' }}>
            <CardHeader>
              <Heading style={headingStyle}>New Projects</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {newProjectQuery.isSuccess ? (
                  newProjectQuery.data?.map((project: any) => {
                    return (
                      <Box>
                        <Heading size="md">{project?.title}</Heading>
                        <Text pt="2" fontSize="md">
                          Manager: {project?.manager?.first_name}{' '}
                          {project?.manager?.last_name}
                        </Text>
                        <Text pt="2" fontSize="md">
                          Created:{' '}
                          {formatDistanceToNow(
                            Date.parse(project?.created_at),
                            {
                              addSuffix: true,
                            }
                          )}
                        </Text>
                      </Box>
                    );
                  })
                ) : (
                  <Loading />
                )}
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem w="100%" h="10">
          <Card style={{ maxHeight: '80vh' }}>
            <CardHeader>
              <Heading style={headingStyle}>Updated Projects</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {updatedProjectQuery.isSuccess ? (
                  updatedProjectQuery.data.map((project: any) => {
                    return (
                      <Box>
                        <Heading size="md">{project?.title}</Heading>
                        <Text pt="2" fontSize="md">
                          Manager: {project?.manager?.first_name}{' '}
                          {project?.manager?.last_name}
                        </Text>
                        <Text pt="2" fontSize="md">
                          Created:{' '}
                          {formatDistanceToNow(
                            Date.parse(project?.updated_at),
                            {
                              addSuffix: true,
                            }
                          )}
                        </Text>
                      </Box>
                    );
                  })
                ) : (
                  <Loading />
                )}
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem w="100%" h="10">
          <Card style={{ maxHeight: '80vh' }}>
            <CardHeader>
              <Heading style={headingStyle}>Newly Created Tasks</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {newTaskQuery.isSuccess ? (
                  newTaskQuery.data.map((task: any) => {
                    return (
                      <Box>
                        <Heading size="md">{task?.title}</Heading>
                        <Text pt="2" fontSize="md">
                          Assigned to: {task?.assigned?.first_name}{' '}
                          {task?.assigned?.last_name}
                        </Text>
                        <Text pt="2" fontSize="md">
                          Created:{' '}
                          {formatDistanceToNow(Date.parse(task?.created_at), {
                            addSuffix: true,
                          })}
                        </Text>
                      </Box>
                    );
                  })
                ) : (
                  <Loading />
                )}
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
}
