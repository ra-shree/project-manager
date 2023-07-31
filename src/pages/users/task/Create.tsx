import z, { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Input,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { authApi } from '../../../utils';
import { useQueries, useQueryClient } from '@tanstack/react-query';

interface CreateTaskFormData {
  title: string;
  description: string | null;
  project_id: number;
  user_id: number;
}

export default function CreateTask({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const schema: ZodType<CreateTaskFormData> = z.object({
    title: z.string().min(3).max(255),
    description: z.string().max(500).nullable(),
    project_id: z.number().int().positive(),
    user_id: z.number().int().positive(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(schema),
  });

  const [projectsQuery, developerQuery] = useQueries({
    queries: [
      {
        queryKey: [`projects`],
        queryFn: async () => {
          const response = await authApi.get(`/api/user/projects`);
          return response.data;
        },
      },

      {
        queryKey: [`project.developers`],
        queryFn: async () => {
          const response = await authApi.get(`/api/user/users/developer`);
          return response.data;
        },
      },
    ],
  });

  //move the add task model to the parent component
  async function addTaskOnSubmit(values: CreateTaskFormData) {
    try {
      const res = await authApi.post(`/api/user/tasks`, values);
      if (res.data == 'Task Created') {
        queryClient.invalidateQueries('tasks');
        queryClient.invalidateQueries('project');
        onClose();
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <form
      method="post"
      id="add_task"
      style={{ padding: '0em 1em 1em 1em' }}
      onSubmit={handleSubmit(addTaskOnSubmit)}>
      <FormControl
        id="title"
        paddingBottom={4}
        isInvalid={errors.title}
        isRequired>
        <FormLabel>Choose a title</FormLabel>
        <Input type="text" {...register('title')} />
        <FormErrorMessage>
          {errors.title && errors.title?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl paddingBottom={6}>
        <FormLabel>Choose a Project</FormLabel>
        <Select
          id="project_id"
          placeholder="Select a Project"
          {...register('project_id', { valueAsNumber: true })}
          isInvalid={errors.project_id}
          isRequired>
          {projectsQuery.isSuccess ? (
            projectsQuery.data.map((data) => (
              <option value={data.id}>{data.title}</option>
            ))
          ) : (
            <Spinner size="xl" />
          )}
        </Select>
        <FormErrorMessage>
          {errors.project_id && errors.project_id?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl paddingBottom={4}>
        <Textarea
          id="description"
          placeholder="Add a description"
          style={{ height: '10em' }}
          isInvalid={errors.description}
          {...register('description')}
        />
        <FormErrorMessage>
          {errors.description && errors.description?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl paddingBottom={4}>
        <FormLabel>Assign a Developer</FormLabel>
        <Select
          id="user_id"
          placeholder="Select a Developer"
          {...register('user_id', { valueAsNumber: true })}
          isInvalid={errors.user_id}>
          {developerQuery.isSuccess ? (
            developerQuery.data.map((data) => (
              <option value={data.id}>
                {data.first_name + ' ' + data.last_name}
              </option>
            ))
          ) : (
            <Spinner size="xl" />
          )}
        </Select>
        <FormErrorMessage>
          {errors.user_id && errors.user_id?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Button loadingText="Creating" colorScheme="twitter" type="submit">
        Create Task
      </Button>
    </form>
  );
}
