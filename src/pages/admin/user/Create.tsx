import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Select,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authApi } from '../../../utils';

interface CreateUserFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}

export default function CreateUser() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(values: CreateUserFormData) {
    try {
      const res = await authApi.post('api/admin/users/create', values);
      if (res.data == 'User Created') {
        navigate('/admin/users');
      }
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
      setError(true);
    }
  }

  const schema: ZodType<CreateUserFormData> = z
    .object({
      first_name: z.string().min(3).max(255),
      last_name: z.string().min(3).max(255),
      email: z.string().email(),
      password: z.string().min(8).max(255),
      password_confirmation: z.string().min(8).max(255),
      role: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      path: ['confirmPassword'],
      message: "Password don't match",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
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
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Create New User
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
          p={8}>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl
                    id="first_name"
                    isInvalid={errors.first_name ? true : false}
                    isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" {...register('first_name')} />
                    <FormErrorMessage>
                      {errors.first_name &&
                        errors.first_name?.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    id="last_name"
                    isInvalid={errors.last_name ? true : false}
                    isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" {...register('last_name')} />
                    <FormErrorMessage>
                      {errors.last_name &&
                        errors.last_name?.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl
                id="email"
                isInvalid={errors.email ? true : false}
                isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register('email')} />
                <FormErrorMessage>
                  {errors.email && errors.email?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={errors.password ? true : false}
                isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl
                id="password_confirmation"
                isInvalid={errors.password_confirmation ? true : false}
                isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password_confirmation')}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Select a Role</FormLabel>
                <Select
                  id="role"
                  placeholder="Select option"
                  {...register('role')}>
                  <option value="developer">Developer</option>
                  <option value="manager">Manager</option>
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
