import { useState } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

interface TaskCheckboxProps {
  id: number;
  completed: boolean;
}

export default function TaskCheckbox({
  taskData,
}: {
  taskData: TaskCheckboxProps;
}): JSX.Element {
  const [checked, setChecked] = useState<boolean>(taskData.completed);
  const queryClient = useQueryClient();

  async function onChecked() {
    try {
      const response = await authApi.patch(`api/user/tasks/${taskData.id}`, {
        completed: !checked,
      });
      setChecked(response.data.completed);
      queryClient.invalidateQueries(['tasks']);
      queryClient.invalidateQueries(['report']);
      queryClient.invalidateQueries(['task.new']);
    } catch (err) {
      console.log(err);
    }
    // console.log(completed);
  }

  return (
    <Checkbox
      className="border-1 border-blue-300"
      isChecked={checked}
      onChange={onChecked}
    />
  );
}
