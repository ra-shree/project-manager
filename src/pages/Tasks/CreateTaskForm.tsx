import z, { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { api } from '../../utils';
interface CreateTaskFormData {
  task_title: string;
  project_name: string;
  description: string | null;
}

export default function CreateTaskForm() {
  async function onSubmit(values: CreateTaskFormData) {
    await api.post('/task/create', values);
    window.location.href = '/tasks';
  }

  const schema: ZodType<CreateTaskFormData> = z.object({
    task_title: z.string().min(3).max(255),
    project_name: z.string(),
    description: z.string().max(500).nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      method="post"
      style={{ padding: '0em 1em 1em 1em' }}
      onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        id="task_title"
        paddingBottom={4}
        isInvalid={errors.task_title}
        isRequired>
        <FormLabel>Choose a title</FormLabel>
        <Input type="text" {...register('task_title')} />
        <FormErrorMessage>
          {errors.task_title && errors.task_title?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        id="project_name"
        paddingBottom={6}
        isInvalid={errors.project_name}
        isRequired>
        <FormLabel>Choose the Project</FormLabel>
        <Select placeholder="Select option" {...register('project_name')}>
          <option value="Project A">Project A</option>
          <option value="Project B">Project B</option>
          <option value="Project C">Project C</option>
        </Select>
        <FormErrorMessage>
          {errors.project_name && errors.project_name?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl id="description" paddingBottom={4}>
        <Textarea
          placeholder="Add a description"
          style={{ height: '10em' }}
          isInvalid={errors.description}
          {...register('description')}
        />
        <FormErrorMessage>
          {errors.description && errors.description?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Button loadingText="Creating" colorScheme="twitter" type="submit">
        Create Task
      </Button>
    </form>
  );
}
