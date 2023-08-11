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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskFormData } from './types.d';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';

export default function TaskForm({
  updateTask,
  setUpdateTask,
  onClose,
}: {
  updateTask?: TaskFormData;
  setUpdateTask: React.Dispatch<React.SetStateAction<TaskFormData | undefined>>;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const schema: ZodType<TaskFormData> = z.object({
    title: z.string().min(3).max(255),
    description: z.string().max(500).nullable(),
    project_id: z.number().int().positive(),
    user_id: z.number().int().positive(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(schema),
  });

  const developerQuery = useQuery(['project.developers'], async () => {
    const response = await authApi.get(
      `/api/user/projects/${updateTask?.project_id}/members`
    );
    return response.data;
  });

  // const [projectsQuery, developerQuery] = useQueries({
  //   queries: [
  //     {
  //       queryKey: [`projects`],
  //       queryFn: async () => {
  //         const response = await authApi.get(`/api/user/projects`);
  //         return response.data;
  //       },
  //     },

  //     {
  //       queryKey: [`project.developers`],
  //       queryFn: async () => {
  //         // const response = await authApi.get(`/api/user/users/developer`);
  //         const response = await authApi.get(
  //           `/api/user/projects/${updateTask?.project_id}/members`
  //         );
  //         return response.data;
  //       },
  //     },
  //   ],
  // });

  async function onSubmit(values: TaskFormData) {
    try {
      let res: AxiosResponse<any, any>;
      if (!updateTask) {
        res = await authApi.post(`/api/user/tasks`, values);
      } else {
        res = await authApi.put(`/api/user/tasks/${updateTask.id}`, values);
      }
      if (res.data == 'Task Created' || res.data == 'Task Updated') {
        queryClient.invalidateQueries(['tasks']);
        queryClient.invalidateQueries(['project']);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      onClose();
      setUpdateTask(undefined);
    }
  }

  useEffect(() => {
    if (updateTask) {
      setValue('title', updateTask.title);
      setValue('description', updateTask.description);
      setValue('project_id', updateTask.project_id);
      setValue('user_id', updateTask.user_id);
    }
  }, []);
  return (
    <form
      method="post"
      id="add_task"
      style={{ padding: '0em 1em 1em 1em' }}
      onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        id="title"
        paddingBottom={4}
        isInvalid={errors.title ? true : false}
        isRequired>
        <FormLabel>Choose a title</FormLabel>
        <Input type="text" {...register('title')} />
        <FormErrorMessage>
          {errors.title && errors.title?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        {/* <FormLabel>Choose a Project</FormLabel> */}
        <Input
          id="project_id"
          placeholder="Select a Project"
          {...register('project_id', { valueAsNumber: true })}
          isInvalid={errors.project_id ? true : false}
          defaultValue={updateTask?.project_id ? updateTask.project_id : ''}
          isRequired
          hidden
        />
        {/* <Select
          id="project_id"
          placeholder="Select a Project"
          {...register('project_id', { valueAsNumber: true })}
          isInvalid={errors.project_id ? true : false}
          isRequired>
          {projectsQuery.isSuccess ? (
            projectsQuery.data.map((data: any) => (
              <option key={data.id} value={data.id}>
                {data.title}
              </option>
            ))
          ) : (
            <Spinner size="xl" />
          )}
        </Select> */}
        <FormErrorMessage>
          {errors.project_id && errors.project_id?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl paddingBottom={4}>
        <FormLabel>Update the description</FormLabel>
        <Textarea
          id="description"
          placeholder="Add a description"
          style={{ height: '10em' }}
          isInvalid={errors.description ? true : false}
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
          isInvalid={errors.user_id ? true : false}>
          {developerQuery.isSuccess ? (
            developerQuery.data.map((data: any) => (
              <option key={data.id} value={data.id}>
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
        {updateTask ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
}
