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
import { formatDistanceToNow } from 'date-fns';
import { useFetchReport } from '../../hooks/admin/useFetchReport';
import { useFetchProjectSummary } from '../../hooks/admin/useFetchProjectSummary';
import { useFetchTaskSummary } from '../../hooks/admin/useFetchTaskSymmary';
import { useFetchUpdatedProjectSummary } from '../../hooks/admin/useFetchUpdatedProjectSummary';

const headingStyle = {
  fontWeight: 'bolder',
  fontSize: '1.8rem',
};

export default function AdminDashboard() {
  const { data: report, isSuccess: reportFetchSuccess } = useFetchReport();
  const { data: newProject, isSuccess: newProjectFetchSuccess } =
    useFetchProjectSummary();

  const { data: newTask, isSuccess: newTaskFetchSuccess } =
    useFetchTaskSummary();

  const { data: updatedProject, isSuccess: updatedProjectFetchSuccess } =
    useFetchUpdatedProjectSummary();

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
                    <Heading size="md">Users</Heading>
                    <Text pt="2" fontSize="md">
                      Developers: {report?.developers}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Managers: {report?.managers}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="md">Projects</Heading>
                    <Text pt="2" fontSize="md">
                      Completed: {report?.completed_project_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Ongoing: {report?.ongoing_project_count}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="md">Tasks</Heading>
                    <Text pt="2" fontSize="md">
                      Completed: {report?.completed_task_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Incomplete: {report?.incomplete_task_count}
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
                {newProjectFetchSuccess ? (
                  newProject?.data?.map((project: any) => {
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
                {updatedProjectFetchSuccess ? (
                  updatedProject?.map((project: any) => {
                    return (
                      <Box>
                        <Heading size="md">{project?.title}</Heading>
                        <Text pt="2" fontSize="md">
                          Manager: {project?.manager?.first_name}{' '}
                          {project?.manager?.last_name}
                        </Text>
                        <Text pt="2" fontSize="md">
                          Last updated:{' '}
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
                {newTaskFetchSuccess ? (
                  newTask?.map((task: any) => {
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
