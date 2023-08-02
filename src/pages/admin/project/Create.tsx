import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Textarea,
  Button,
  Select,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authApi } from '../../../utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ProjectFormData } from './types';
import { AxiosResponse } from 'axios';

export default function ProjectForm({
  updateProject,
  setUpdateProject,
  onClose,
  projectId,
}: {
  updateProject?: ProjectFormData;
  setUpdateProject: React.Dispatch<
    React.SetStateAction<ProjectFormData | undefined>
  >;
  projectId: number | null;
  onClose: () => void;
}) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const queryClient = useQueryClient();
  const schema: ZodType<ProjectFormData> = z.object({
    title: z.string().min(3).max(255),
    description: z.string().max(1000).nullable(),
    manager_id: z.number().int().positive(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(schema),
  });

  const { data, isSuccess } = useQuery(['managers'], async () => {
    const response = await authApi.get('/api/admin/users/manager');
    return response.data;
  });

  async function onSubmit(values: ProjectFormData) {
    try {
      let res: AxiosResponse<any, any>;
      if (!updateProject) {
        res = await authApi.post('/api/admin/projects/create', values);
      } else {
        res = await authApi.put(
          `/api/admin/projects/update/${projectId}`,
          values
        );
      }

      if (res.data == 'Project Created' || res.data == 'Project Updated') {
        queryClient.invalidateQueries(['projects']);
      }
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
      setError(true);
    } finally {
      onClose();
      setUpdateProject(undefined);
    }
  }

  useEffect(() => {
    if (updateProject) {
      setValue('title', updateProject.title);
      setValue('description', updateProject.description);
      setValue('manager_id', updateProject.manager_id);
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
      <FormControl
        id="title"
        paddingBottom={4}
        isInvalid={errors.title ? true : false}
        isRequired>
        <FormLabel>Project Name</FormLabel>
        <Input type="text" {...register('title')} />
        <FormErrorMessage>
          {errors.title && errors.title?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl paddingBottom={4}>
        <FormLabel>Write a description</FormLabel>
        <Textarea
          id="description"
          style={{ height: '10em' }}
          placeholder="Enter a description for the project"
          isInvalid={errors.description ? true : false}
          {...register('description')}
        />
        <FormErrorMessage>
          {errors.description && errors.description?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl paddingBottom={4}>
        <FormLabel>Select a Project Manager</FormLabel>
        <Select
          id="manager_id"
          placeholder="Select a Manager"
          {...register('manager_id', { valueAsNumber: true })}
          isInvalid={errors.manager_id ? true : false}>
          {isSuccess &&
            data.map((manager: any) => (
              <option key={manager.id} value={manager.id}>
                {manager.first_name + ' ' + manager.last_name}
              </option>
            ))}
        </Select>
      </FormControl>
      <Button loadingText="Submitting" colorScheme="twitter" type="submit">
        {updateProject ? 'Update Project' : 'Create Project'}
      </Button>
    </form>
  );
}
