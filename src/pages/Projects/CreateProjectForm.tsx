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

interface CreateProjectFormData {
  project_name: string;
  project_manager: string;
  description: string | null;
}

export default function CreateProjectForm() {
  async function onSubmit(values: CreateProjectFormData) {
    await api.post('/project/create', values);
    window.location.href = '/projects';
  }

  const schema: ZodType<CreateProjectFormData> = z.object({
    project_name: z.string().min(3).max(255),
    project_manager: z.string(),
    description: z.string().max(500).nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      method="post"
      style={{ padding: '0em 1em 1em 1em' }}
      onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        id="project_name"
        paddingBottom={4}
        isInvalid={errors.project_name}
        isRequired>
        <FormLabel>Choose a name</FormLabel>
        <Input type="text" {...register('project_name')} />
        <FormErrorMessage>
          {errors.project_name && errors.project_name?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        id="project_manager"
        paddingBottom={6}
        isInvalid={errors.project_manager}
        isRequired>
        <FormLabel>Choose a Project Manager</FormLabel>
        <Select placeholder="Select option" {...register('project_manager')}>
          <option value="Manager A">Manager A</option>
          <option value="Manager B">Manager B</option>
          <option value="Manager C">Manager C</option>
        </Select>
        <FormErrorMessage>
          {errors.project_manager &&
            errors.project_manager?.message?.toString()}
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
        Create Project
      </Button>
    </form>
  );
}
