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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { authApi } from '../../../utils';
import { useQueryClient } from '@tanstack/react-query';
import { TaskFormData } from './types.d';

export default function TasksTable({
  tableColumns,
  tableData,
  onOpen,
  setUpdateTask,
}: {
  tableColumns: string[];
  tableData: any[];
  onOpen: () => void;
  setUpdateTask: React.Dispatch<React.SetStateAction<TaskFormData | undefined>>;
}): JSX.Element {
  const [taskId, setTaskId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  async function deleteTask() {
    try {
      if (taskId) {
        const response = await authApi.delete(`api/user/tasks/${taskId}`);
        if (response.data == 'Task Deleted') {
          queryClient.invalidateQueries(['tasks']);
          queryClient.invalidateQueries(['report']);
          queryClient.invalidateQueries(['task.new']);
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
              <Th key={item}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((data) => {
            return (
              <Tr key={data.id}>
                <Th>{data.title}</Th>
                <Th>
                  {data.assigned.first_name + ' ' + data.assigned.last_name}
                </Th>
                <Th className="max-width-xs">{data.description}</Th>
                <Th>
                  <Flex className="ml-1 gap-2">
                    <TaskCheckbox
                      key={data.id}
                      taskData={{ id: data.id, completed: data.completed }}
                    />
                    <EditIcon
                      className="cursor-pointer"
                      focusable={true}
                      onClick={() => {
                        setUpdateTask({
                          id: data.id,
                          title: data.title,
                          description: data.description,
                          user_id: data.user_id,
                          project_id: data.project_id,
                        });
                        onOpen();
                      }}
                    />
                    <DeleteIcon
                      className="cursor-pointer"
                      focusable={true}
                      onClick={() => {
                        setTaskId(data.id);
                        deleteTask();
                      }}
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
