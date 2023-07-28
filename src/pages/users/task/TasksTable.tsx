import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import { TaskCheckbox } from '..';
import { DeleteIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { authApi } from '../../../utils';
import { useQueryClient } from '@tanstack/react-query';

export default function TasksTable({
  tableColumns,
  tableData,
}: {
  tableColumns: string[];
  tableData: any[];
}): JSX.Element {
  const [taskId, setTaskId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  async function deleteTask() {
    try {
      if (taskId) {
        const response = await authApi.delete(
          `api/user/tasks/delete/${taskId}`
        );
        if (response.data == 'Task Deleted') {
          queryClient.invalidateQueries('tasks');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            {tableColumns.map((item) => (
              <Th>{item}</Th>
            ))}
          </Tr>
          {/* <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Assigned To</Th>
            <Th>Status</Th>
          </Tr> */}
        </Thead>
        <Tbody>
          {tableData.map((data) => {
            return (
              <Tr>
                <Th>{data.title}</Th>
                <Th>
                  {data.assigned.first_name + ' ' + data.assigned.last_name}
                </Th>
                <Th className="max-width-xs">{data.description}</Th>
                <Th>
                  <Flex className="ml-2">
                    <DeleteIcon
                      className="cursor-pointer"
                      focusable={true}
                      onClick={() => {
                        setTaskId(data.id);
                        deleteTask();
                      }}
                    />
                    <TaskCheckbox
                      key={data.id}
                      taskData={{ id: data.id, completed: data.completed }}
                    />
                  </Flex>
                </Th>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
