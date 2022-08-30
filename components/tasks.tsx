import type { NextPage } from "next";
import { Task } from "./../types/Task";
import TaskItem from "./taskItem";

interface Props {
  data: Task[];
  onCompleteTask: (id: number, status: boolean) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
}

const Tasks: NextPage<Props> = ({ data, onCompleteTask, onDeleteTask }) => {
  return (
    <div className="overflow-auto mt-5 max-h-96 scrollbar scrollbar-thumb-transparent scrollbar-track-transparent">
      {data.length > 0 ? (
        data.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            onCompleteTask={onCompleteTask}
            onDeleteTask={onDeleteTask}
          />
        ))
      ) : (
        <div className="p-10 stat-value text-ellipsis overflow-hidden text-center">
          No Task !
        </div>
      )}
    </div>
  );
};

export default Tasks;
