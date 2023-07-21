import { Box, Button, Flex, Heading, Spacer, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DataTable from './DataTable';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../utils';

export default function Home() {
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery(['projects'], async () => {
    const response = await api.get('/api/admin/projects');
    return response.data;
  });
  return (
    <>
      <Flex style={{ padding: '1em 0em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            Projects
          </Heading>
        </Box>
        <Spacer />
        <Box className="pr-4">
          <Button
            colorScheme="twitter"
            onClick={() => navigate('/admin/projects/create')}>
            Create New Project
          </Button>
        </Box>
      </Flex>
      {isSuccess ? (
        <DataTable
          TableColumns={[
            'Project Name',
            'Project Manager',
            'Created At',
            'Status',
          ]}
          TableData={data}
        />
      ) : (
        <Spinner size="xl" />
      )}
    </>
  );
}
