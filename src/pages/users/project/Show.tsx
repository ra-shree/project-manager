import {
  Button,
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
import { SearchIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../../utils';
import { useDisclosure } from '@chakra-ui/react';
import formatRelative from 'date-fns/formatRelative';
import UserTable from './UserTable';

export default function ProjectPage() {
  let { project_id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isSuccess } = useQuery([`project.${project_id}`], async () => {
    const response = await authApi.get(`/api/user/projects/${project_id}`);
    console.log(response);
    return response.data;
  });

  // const { data, isSuccess } = useQuery(['users.developers'], async () => {
  //   const response = await authApi.get('/api/users/developers');
  return (
    <>
      <Box style={{ padding: '1em 1em 1em 2em' }}>
        {isSuccess ? (
          <>
            <Box paddingBottom={3}>
              <Heading size="lg" h={8}>
                {data.title}
              </Heading>
            </Box>
            <Spacer />
            <Flex paddingBottom={3}>
              <Box>
                <Text>{data.status}</Text>
              </Box>
              <Spacer />
              <Box>
                <Text>
                  {formatRelative(Date.parse(data.created_at), Date.now())}
                </Text>
              </Box>
            </Flex>

            <Box paddingBottom="4">
              <Text>{data.description}</Text>
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
                <Button colorScheme="twitter" onClick={onOpen}>
                  Add member
                </Button>
              </Flex>
            </Flex>
            <UserTable
              TableColumns={[
                'First Name',
                'Last Name',
                'Email Address',
                'Role',
              ]}
              TableData={data.project_members}
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
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red">Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
