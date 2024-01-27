import { Box, Heading, Flex, Spacer } from '@chakra-ui/react';
import { DataTable } from '..';
import { Loading } from '../../../components';
import { useFetchProjects } from '../../../hooks/users/useFetchProjects';

export default function Home(): JSX.Element {
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
