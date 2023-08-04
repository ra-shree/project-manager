import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Select,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authApi } from '../../../utils';
import { UserFormData } from './types.d';
import { AxiosResponse } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export default function UserForm({
  updateUser,
  setUpdateUser,
  onClose,
  userId,
}: {
  updateUser?: UserFormData;
  setUpdateUser: React.Dispatch<React.SetStateAction<UserFormData | undefined>>;
  userId: number | null;
  onClose: () => void;
}) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  let schema: ZodType<UserFormData>;
  if (updateUser) {
    schema = z
      .object({
        first_name: z.string().min(3).max(255),
        last_name: z.string().min(3).max(255),
        email: z.string().email(),
        password: z.optional(z.string().min(8).max(255)),
        password_confirmation: z.optional(z.string().min(8).max(255)),
        role: z.string(),
      })
      .refine((data) => data.password === data.password_confirmation, {
        path: ['confirmPassword'],
        message: "Password don't match",
      });
  } else {
    schema = z
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
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: UserFormData) {
    let res: AxiosResponse<any, any>;
    try {
      if (!updateUser) {
        res = await authApi.post('api/admin/users/create', values);
      } else {
        res = await authApi.put(`api/admin/users/update/${userId}`, values);
      }
      if (res.data == 'User Created' || res.data == 'User Updated') {
        queryClient.invalidateQueries(['users']);
      }
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
      setError(true);
    } finally {
      onClose();
      setUpdateUser(undefined);
    }
  }

  useEffect(() => {
    if (updateUser) {
      setValue('first_name', updateUser.first_name);
      setValue('last_name', updateUser.last_name);
      setValue('email', updateUser.email);
      setValue('role', updateUser.role);
      setValue('password', 'password');
      setValue('password_confirmation', 'password');
    }

    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <form
      method="post"
      style={{ padding: '0em 1em 1em 1em' }}
      onSubmit={handleSubmit(onSubmit)}>
      <Stack align={'center'}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </Stack>
      <Stack spacing={4}>
        <FormControl
          id="first_name"
          paddingBottom={4}
          isInvalid={errors.first_name ? true : false}
          isRequired>
          <FormLabel>First Name</FormLabel>
          <Input variant="flushed" type="text" {...register('first_name')} />
          <FormErrorMessage>
            {errors.first_name && errors.first_name?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="last_name"
          paddingBottom={4}
          isInvalid={errors.last_name ? true : false}
          isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input variant="flushed" type="text" {...register('last_name')} />
          <FormErrorMessage>
            {errors.last_name && errors.last_name?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="email"
          paddingBottom={4}
          isInvalid={errors.email ? true : false}
          isRequired>
          <FormLabel>Email address</FormLabel>
          <Input variant="flushed" type="email" {...register('email')} />
          <FormErrorMessage>
            {errors.email && errors.email?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          paddingBottom={4}
          isInvalid={errors.password ? true : false}
          isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup paddingBottom={4}>
            <Input
              type={showPassword ? 'text' : 'password'}
              variant="flushed"
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
          <FormErrorMessage>
            {errors.password && errors.password?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="password_confirmation"
          paddingBottom={4}
          isInvalid={errors.password_confirmation ? true : false}
          isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              variant="flushed"
              {...register('password_confirmation')}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.password_confirmation &&
              errors.password_confirmation?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl paddingBottom={4} isRequired>
          <FormLabel>Select a Role</FormLabel>
          <Select id="role" placeholder="Select option" {...register('role')}>
            <option value="developer">Developer</option>
            <option value="manager">Manager</option>
          </Select>
        </FormControl>
        <Button
          loadingText="Submitting"
          colorScheme="twitter"
          _hover={{
            bg: 'blue.500',
          }}
          type="submit">
          {updateUser ? 'Update User' : 'Create User'}
        </Button>
      </Stack>
    </form>
  );
}
