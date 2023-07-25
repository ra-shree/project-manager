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

export default function UserTable({
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
              <Th>{data.first_name}</Th>
              <Th>{data.last_name}</Th>
              <Th>
                <Link
                  as={RouterLink}
                  to={`/user/profile/${data.id}`}
                  style={{ textDecoration: 'none' }}>
                  {data.email}
                </Link>
              </Th>
              {/* <Th>{data.}</Th> */}
              <Th>{data.role}</Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
