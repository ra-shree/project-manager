import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spacer,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Loading } from '@components/ui';
import ProjectsTable from './project/ProjectsTable';
import ProjectForm from './project/Create';
import { useFetchProjects } from '@hooks/users';
import { ProjectFormData } from '@interfaces/forms.interface';

export function ProjectsPage() {
  const [projectId, setProjectId] = useState<number | null>(null);
  const [updateProject, setUpdateProject] = useState<ProjectFormData>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: projects, isSuccess } = useFetchProjects();

  return (
    <>
      <Flex style={{ padding: '1em 0em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            Projects
          </Heading>
        </Box>
        <Spacer />
        <Box className="pr-4">
          <Button
            colorScheme="twitter"
            onClick={() => {
              setProjectId(null);
              setUpdateProject(undefined);
              onOpen();
            }}>
            Create New Project
          </Button>
        </Box>
      </Flex>
      {isSuccess ? (
        <ProjectsTable
          TableColumns={[
            'Project Name',
            'Project Manager',
            'Last Updated',
            'Status',
            'Actions',
          ]}
          TableData={projects}
          onOpen={onOpen}
          projectId={projectId}
          setProjectId={setProjectId}
          setUpdateProject={setUpdateProject}
        />
      ) : (
        <Loading />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!updateProject ? 'Create a Project' : 'Update Project'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProjectForm
              projectId={projectId}
              updateProject={updateProject}
              setUpdateProject={setUpdateProject}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      ;
    </>
  );
}
