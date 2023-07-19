import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Flex style={{ padding: '1em 0em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            Users
          </Heading>
        </Box>
        <Spacer />
        <Box className="pr-4">
          <Button
            colorScheme="twitter"
            onClick={() => navigate('/admin/users/create')}>
            Create New User
          </Button>
        </Box>
      </Flex>
    </>
  );
}
