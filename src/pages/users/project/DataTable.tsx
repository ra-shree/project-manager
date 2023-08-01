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
import { formatDistance, formatRelative, subDays } from 'date-fns';

export default function DataTable({
  TableColumns,
  TableData,
}: {
  TableColumns: string[];
  TableData: any[];
}): JSX.Element {
  return (
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
                  to={`/user/projects/${data.id}`}
                  style={{ textDecoration: 'none' }}>
                  {data.title}
                </Link>
              </Th>
              {/* <Th>{data.}</Th> */}
              <Th hidden>{data.description}</Th>
              <Th>
                {formatDistance(
                  subDays(Date.parse(data.created_at), 3),
                  Date.now(),
                  {
                    addSuffix: true,
                  }
                )}
              </Th>
              <Th>{formatRelative(Date.parse(data.updated_at), Date.now())}</Th>
              <Th>{data.status}</Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
