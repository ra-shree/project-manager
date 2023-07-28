import { useState } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { authApi } from '../../../utils';

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

  async function onChecked() {
    try {
      const response = await authApi.patch(
        `api/user/tasks/status/${taskData.id}`,
        {
          body: JSON.stringify({ completed: !checked }),
        }
      );
      setChecked(response.data.completed);
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
      paddingLeft={5}
    />
  );
}
