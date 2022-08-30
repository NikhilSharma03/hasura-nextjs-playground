import type { NextPage } from "next";
import Head from "next/head";
import styles from "./../styles/home.module.css";
import Container from "../components/container";
import InputField from "../components/textInput";
import { useEffect, useState } from "react";
import Tasks from "../components/tasks";
import apolloClient from "./../lib/apollo-client";
import { Task } from "./../types/Task";
import { gql, useMutation } from "@apollo/client";
import Loading from "../components/loading";

const INSERT_TASK = gql`
  mutation InsertTaskOne($title: String!, $description: String!) {
    insert_Nichijou_Task_one(
      object: { title: $title, description: $description }
    ) {
      id
      title
      description
      completed
    }
  }
`;

const COMPLETE_TASK = gql`
  mutation UpdateTaskByPK($id: Int!, $status: Boolean!) {
    update_Nichijou_Task_by_pk(
      pk_columns: { id: $id }
      _set: { completed: $status }
    ) {
      id
      title
      description
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTaskByPK($id: Int!) {
    delete_Nichijou_Task_by_pk(id: $id) {
      id
    }
  }
`;

const Home: NextPage = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState<string>("");
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [insertTask, { loading: insertLoading }] = useMutation(INSERT_TASK, {
    variables: { title: task, description: description },
  });
  const [completeTask, { loading }] = useMutation(COMPLETE_TASK);
  const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK);

  useEffect(() => {
    setLoadingData(true);
    apolloClient
      .query({
        query: gql`
          query fetchTasks {
            Nichijou_Task {
              id
              title
              description
              completed
            }
          }
        `,
      })
      .then((data) => {
        setTasks(data.data.Nichijou_Task);
        setLoadingData(false);
      });
  }, []);

  const onCreateTask = () => {
    if (task.trim().length > 0 && description.trim().length > 0) {
      insertTask().then((data) => {
        const newTask = data.data.insert_Nichijou_Task_one;
        setTasks((prev) => [...prev, newTask]);
        setTask("");
        setDescription("");
      });
    } else {
      alert("Invalid input!");
    }
  };

  const onCompleteTask = async (id: number, status: boolean) => {
    const { data } = await completeTask({ variables: { id, status } });
    const updatedTask = data.update_Nichijou_Task_by_pk;
    const updatedTasks = [...tasks];
    const updateIndex = updatedTasks.findIndex(
      (task) => task.id === updatedTask.id
    );
    updatedTasks[updateIndex] = updatedTask;
    setTasks(updatedTasks);
  };

  const onDeleteTask = async (id: number) => {
    const { data } = await deleteTask({ variables: { id } });
    const deletedTask = data.delete_Nichijou_Task_by_pk;
    const updatedTasks = [...tasks];
    const deleteIndex = updatedTasks.findIndex(
      (task) => task.id === deletedTask.id
    );
    updatedTasks.splice(deleteIndex, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Head>
        <title>Nichijou</title>
        <meta name="description" content="Todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {loading && <Loading />}
        {loadingData && <Loading />}
        {deleteLoading && <Loading />}
        {insertLoading && <Loading />}
        <div className="p-10 stat-value text-ellipsis overflow-hidden text-center tracking-widest">
          &#128211; NICHIJOU
        </div>
        <Container>
          <InputField
            placeholder="Task"
            value={task}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTask(e.target.value)
            }
          />
          <InputField
            placeholder="Description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <button
            onClick={onCreateTask}
            className={`btn btn-active btn-primary w-1/3 self-end ${
              insertLoading && "loading"
            }`}
          >
            {insertLoading ? "Loading" : "Create"}
          </button>
          <Tasks
            data={tasks}
            onCompleteTask={onCompleteTask}
            onDeleteTask={onDeleteTask}
          />
        </Container>
      </main>
    </div>
  );
};

export default Home;
