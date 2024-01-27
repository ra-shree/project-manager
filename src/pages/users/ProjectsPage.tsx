import { Box, Heading, Flex, Spacer } from '@chakra-ui/react';
import { DataTable } from '.';
import { useFetchProjects } from '@hooks/users';
import { Loading } from '@components/ui';

export function ProjectsPage(): JSX.Element {
  const { data: projects, isSuccess } = useFetchProjects();

  return (
    <>
      <Flex style={{ padding: '1em 1em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            My Projects
          </Heading>
        </Box>
        <Spacer />
      </Flex>
      {isSuccess ? (
        <DataTable
          TableColumns={['Project Name', 'Created', 'Last Updated', 'Status']}
          TableData={projects}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
