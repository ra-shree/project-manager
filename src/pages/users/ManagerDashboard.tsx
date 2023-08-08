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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const headingStyle = {
  fontWeight: 'bolder',
  fontSize: '1.8rem',
};

export default function UserDashboard() {
  const userInfo = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  if (userInfo.role === 'admin') {
    navigate('/admin/dashboard');
  }

  if (userInfo.role === 'developer') {
    navigate('/dashboard');
  }

  const [reportQuery, newProjectQuery, newTaskQuery] = useQueries({
    queries: [
      {
        queryKey: [`report`],
        queryFn: async () => {
          const response = await authApi.get(`/api/user/summary/count`);
          return response.data;
        },
      },
      {
        queryKey: [`project.new`],
        queryFn: async () => {
          const response = await authApi.get(`/api/user/summary/projects`);
          return response.data;
        },
      },

      {
        queryKey: [`task.new`],
        queryFn: async () => {
          const response = await authApi.get(`/api/user/summary/tasks`);
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
                    <Heading size="md">User</Heading>
                    <Text pt="2" fontSize="md">
                      Involved Projects: {reportQuery?.data?.project_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Tasks Completed Today:{' '}
                      {reportQuery?.data?.completed_task_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Developers: {reportQuery?.data?.developer_count}
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
              <Heading style={headingStyle}>Your Projects</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {newProjectQuery.isSuccess ? (
                  newProjectQuery.data?.map((project: any) => {
                    return (
                      <Box>
                        <Heading size="md">{project?.title}</Heading>
                        <Text pt="2" fontSize="md">
                          Last Updated:{' '}
                          {formatDistanceToNow(
                            Date.parse(project?.updated_at),
                            {
                              addSuffix: true,
                            }
                          )}
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
              <Heading style={headingStyle}>Tasks</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {newTaskQuery.isSuccess ? (
                  newTaskQuery.data?.map((task: any) => {
                    return (
                      <Box>
                        <Heading size="md">{task?.title}</Heading>
                        <Text pt="2" fontSize="md">
                          Last Updated:{' '}
                          {formatDistanceToNow(Date.parse(task?.updated_at), {
                            addSuffix: true,
                          })}
                        </Text>
                        <Text pt="2" fontSize="md">
                          Completed: {task?.completed ? 'Yes' : 'No'}
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
