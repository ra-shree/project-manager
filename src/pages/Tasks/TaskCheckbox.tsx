import { useState } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { TaskData } from './data';
import { api } from '../../utils';

export default function TaskCheckbox({
  task,
}: {
  task: TaskData;
}): JSX.Element {
  const [checked, setChecked] = useState(task.completed);

  async function onChecked() {
    const response = await api.patch(`http://localhost:3000/tasks/${task.id}`, {
      body: JSON.stringify({ completed: !checked }),
    });
    const completed = await response.data.completed;
    setChecked(completed);
    // console.log(completed);
  }

  return <Checkbox isChecked={checked} onChange={onChecked} paddingLeft={5} />;
}
