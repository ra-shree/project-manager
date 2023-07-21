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
import { Mutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../utils';

interface CreateProjectFormData {
  name: string;
  description: string | null;
  manager_id: number | null;
}

export default function CreateProject() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // const queryClient = useQueryClient();
  // queryClient();
  // async function onSubmit(values: CreateProjectFormData) {
  //   try {
  //     // await api.get('/sanctum/csrf-cookie');
  //     // await api.post('/admin/create/user', values);
  //     navigate('/admin/projects');
  //   } catch (err: any) {
  //     // setErrorMessage(err.response.data.message);
  //     // setError(true);
  //   }
  // }

  const schema: ZodType<CreateProjectFormData> = z.object({
    project_name: z.string().min(3).max(255),
    description: z.string().max(1000).nullable(),
    project_manager_id: z.number().nullable(),
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
          <form method="post">
            <Stack spacing={4}>
              <Box>
                <FormControl id="name" isInvalid={errors.name} isRequired>
                  <FormLabel>Project Name</FormLabel>
                  <Input type="text" {...register('name')} />
                  <FormErrorMessage>
                    {errors.name && errors.name?.message?.toString()}
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
              <FormControl id="role">
                <FormLabel>Select a Project Manager</FormLabel>
                <Select placeholder="Select option">
                  {/* Todo: Add options for all the available project managers */}
                  <option value="1">Manager A</option>
                  <option value="2">Manager B</option>
                  <option value="3">Manager C</option>
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
