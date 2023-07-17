import {
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { formatRelative } from 'date-fns';
import { projectData } from './data';

export default function ProjectsTable(): JSX.Element {
  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th>Project Name</Th>
            <Th>Project Manager</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projectData.map((project) => (
            <Tr>
              <Link
                as={RouterLink}
                to="/home"
                style={{ textDecoration: 'none' }}>
                <Th>{project.projectName}</Th>
              </Link>
              <Th>{project.projectManager}</Th>
              <Th>
                {formatRelative(Date.parse(project.createdAt), Date.now())}
              </Th>
              <Th>
                {formatRelative(Date.parse(project.lastUpdated), Date.now())}
              </Th>
              <Th>{project.status}</Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
