import {
  Button,
  FormControl,
  Select,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from '@chakra-ui/react';
import z, { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../../utils';

interface AddMemberFormData {
  user_id: number;
  project_id: number;
}

export default function AddUser({
  isOpen,
  onClose,
  currentProjectId,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentProjectId: number;
}) {
  let projectId = currentProjectId;
  const queryClient = useQueryClient();
  const schema: ZodType<AddMemberFormData> = z.object({
    user_id: z.number(),
    project_id: z.number(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMemberFormData>({
    resolver: zodResolver(schema),
  });

  const developerQuery = useQuery({
    queryKey: [`project.developers`],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/projects/${projectId}/add`);
      return response.data;
    },
  });

  async function addMemberOnSubmit(values: AddMemberFormData) {
    try {
      const res = await authApi.post(
        `/api/user/projects/${projectId}/add`,
        values
      );
      if (res.data == 'Developer added to Project') {
        queryClient.invalidateQueries('project.developers');
        queryClient.invalidateQueries('project');
        onClose();
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add members</ModalHeader>
        <ModalCloseButton />
        <form
          id="add_developer"
          method="post"
          onSubmit={handleSubmit(addMemberOnSubmit)}>
          <ModalBody>
            <FormControl>
              <Select
                id="user_id"
                placeholder="Select a Developer"
                {...register('user_id', { valueAsNumber: true })}
                isInvalid={errors.user_id}>
                {developerQuery.isSuccess ? (
                  developerQuery.data.map((data) => (
                    <option value={data.id}>
                      {data.email} ({data.first_name + ' ' + data.last_name})
                    </option>
                  ))
                ) : (
                  <Spinner size="xl" />
                )}
              </Select>
              <Input
                id="project_id"
                type="number"
                value={projectId}
                {...register('project_id', { valueAsNumber: true })}
                isInvalid={errors.project_id}
                hidden
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="twitter" type="submit">
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
