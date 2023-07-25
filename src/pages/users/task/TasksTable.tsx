import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import { taskData } from './data';
import { TaskCheckbox } from '..';

export default function TasksTable(): JSX.Element {
  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Assigned To</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {taskData.map((task) => (
            <Tr>
              <Th>{task.taskTitle}</Th>
              <Th>{task.description}</Th>
              <Th>{task.assignedTo}</Th>
              <Th>
                <TaskCheckbox task={task} />
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
