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
// import { projectData } from './data';

export default function DataTable({
  TableColumns,
  TableData,
}: {
  TableColumns: string[];
  TableData: any[];
}): JSX.Element {
  return (
    <>
      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              {TableColumns.map((item) => (
                <Th>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {TableData.map((data) => (
              <Tr>
                <Th>
                  <Link
                    as={RouterLink}
                    to={`/admin/projects/${data.id}`}
                    style={{ textDecoration: 'none' }}>
                    {data.project_name}
                  </Link>
                </Th>
                <Th>{data.user.first_name + ' ' + data.user.last_name}</Th>
                <Th hidden>{data.description}</Th>
                <Th>
                  {formatRelative(Date.parse(data.created_at), Date.now())}
                </Th>
                <Th>{data.status}</Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
