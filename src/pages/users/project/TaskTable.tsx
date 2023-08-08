import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';

export default function TasksTable({
  tableColumns,
  tableData,
}: {
  tableColumns: string[];
  tableData: any[];
}): JSX.Element {
  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            {tableColumns.map((item) => (
              <Th key={item}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((data) => {
            return (
              <Tr key={data?.id}>
                <Th>{data?.title}</Th>
                <Th>
                  {data?.assigned?.first_name + ' ' + data?.assigned?.last_name}
                </Th>
                <Th className="max-width-xs">{data?.description}</Th>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
