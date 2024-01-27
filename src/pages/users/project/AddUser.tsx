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
import { useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../../utils';
import { AddMemberFormData } from './types';
import { useFetchDeveloper } from '../../../hooks/users/useFetchDeveloper';

export default function AddUser({
  isOpen,
  onClose,
  currentProjectId,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentProjectId?: string;
}) {
  const queryClient = useQueryClient();
  const schema: ZodType<AddMemberFormData> = z.object({
    user_id: z.number(),
    project_id: z.number(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddMemberFormData>({
    resolver: zodResolver(schema),
  });

  const { data: developer, isSuccess: developerFetchSuccess } =
    useFetchDeveloper({ projectId: currentProjectId });

  async function addMemberOnSubmit(values: AddMemberFormData) {
    try {
      const res = await authApi.post(`/api/user/members`, values);
      if (res.data == 'Developer Added To Project') {
        queryClient.invalidateQueries(['project']);
        queryClient.invalidateQueries(['project.developers', currentProjectId]);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setValue('user_id', undefined);
      onClose();
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
                isInvalid={errors.user_id ? true : false}>
                {developerFetchSuccess ? (
                  developer?.map((data: any) => (
                    <option key={data.id} value={data.id}>
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
                value={parseInt(currentProjectId ? currentProjectId : '0')}
                {...register('project_id', { valueAsNumber: true })}
                isInvalid={errors.project_id ? true : false}
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
