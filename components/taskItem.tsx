import type { NextPage } from "next";

interface Props {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  onCompleteTask: (id: number, status: boolean) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
}

const TaskItem: NextPage<Props> = ({
  id,
  title,
  description,
  completed,
  onCompleteTask,
  onDeleteTask,
}) => {
  return (
    <div className="stats bg-primary text-primary-content mb-5 w-full">
      <div className="stat flex items-center">
        <div className="flex-1 w-10">
          <div
            className={`stat-value text-ellipsis overflow-hidden ${
              completed && "line-through"
            }`}
          >
            {title}
          </div>
          <div
            className={`stat-title text-ellipsis overflow-hidden ${
              completed && "line-through"
            }`}
          >
            {description}
          </div>
        </div>
        <div className="stat-actions mt-0">
          <button
            onClick={() => onCompleteTask(id, completed ? false : true)}
            className={`btn ${completed ? "btn-success" : "btn-outline"}`}
          >
            &#10003;
          </button>
          <button
            onClick={() => onDeleteTask(id)}
            className="btn btn-outline ml-3"
          >
            &#10006;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
