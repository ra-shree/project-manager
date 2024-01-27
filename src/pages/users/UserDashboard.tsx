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
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useFetchProjectSummary,
  useFetchReport,
  useFetchTaskSummary,
} from '@hooks/dashboard';
import { Loading } from '@components/ui';

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

  if (userInfo.role === 'manager') {
    navigate('/manager/dashboard');
  }

  const { data: report, isSuccess: reportFetchSuccess } = useFetchReport();
  const { data: projectSummary, isSuccess: projectFetchSuccess } =
    useFetchProjectSummary();
  const { data: taskSummary, isSuccess: taskFetchSuccess } =
    useFetchTaskSummary();

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
            {reportFetchSuccess ? (
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="md">User</Heading>
                    <Text pt="2" fontSize="md">
                      Tasks:{' '}
                      {report?.completed_task_count +
                        report?.incomplete_task_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Completed: {report?.completed_task_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Remaining: {report?.incomplete_task_count}
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
                {projectFetchSuccess ? (
                  projectSummary?.projects?.map((project: any) => {
                    return (
                      <Box>
                        <Heading size="md">{project?.title}</Heading>
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
        {userInfo.role === 'developer' && (
          <GridItem w="100%" h="10">
            <Card style={{ maxHeight: '80vh' }}>
              <CardHeader>
                <Heading style={headingStyle}>Your Tasks</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  {taskFetchSuccess ? (
                    taskSummary?.tasks?.map((task: any) => {
                      return (
                        <Box>
                          <Heading size="md">{task?.title}</Heading>
                          <Text pt="2" fontSize="md">
                            Created:{' '}
                            {formatDistanceToNow(Date.parse(task?.created_at), {
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
        )}
      </Grid>
    </Box>
  );
}
