import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Textarea,
  Button,
  Heading,
  Select,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authApi } from '../../../utils';
import { useQuery } from '@tanstack/react-query';

interface CreateProjectFormData {
  title: string;
  description: string | null;
  manager_id: string;
}

export default function CreateProject() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery(['managers'], async () => {
    const response = await authApi.get('/api/admin/users/manager');
    return response.data;
  });

  // const queryClient = useQueryClient();
  // queryClient();
  async function onSubmit(values: CreateProjectFormData) {
    try {
      // await api.get('/sanctum/csrf-cookie');
      const res = await authApi.post('/api/admin/projects/create', values);
      if (res.data == 'Project Created') {
        navigate('/admin/projects');
      }
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
      setError(true);
    }
  }

  const schema: ZodType<CreateProjectFormData> = z.object({
    title: z.string().min(3).max(255),
    description: z.string().max(1000).nullable(),
    manager_id: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <Flex
      minH={'87vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} w="25%" py={12} px={6} width="50%">
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Create New Project
          </Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w="100%">
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Box>
                <FormControl id="title" isInvalid={errors.title} isRequired>
                  <FormLabel>Project Name</FormLabel>
                  <Input type="text" {...register('title')} />
                  <FormErrorMessage>
                    {errors.title && errors.title?.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="description" isInvalid={errors.description}>
                  <FormLabel>Write a description</FormLabel>
                  <Textarea
                    placeholder="Enter a description for the project"
                    h={40}
                    {...register('description')}
                  />
                  <FormErrorMessage>
                    {errors.description &&
                      errors.description?.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <FormControl>
                <FormLabel>Select a Project Manager</FormLabel>
                <Select
                  id="manager_id"
                  placeholder="Select option"
                  isInvalid={errors.manager_id}
                  {...register('manager_id')}>
                  {isSuccess &&
                    data.map((manager: any) => (
                      <option
                        key={parseInt(manager.id)}
                        value={parseInt(manager.id)}>
                        {manager.first_name + ' ' + manager.last_name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit">
                  Create
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
