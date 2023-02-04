import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  //  const [isLoading, setIsLoading] = useState(false);
  //  const [error, setError] = useState(null);

  const { isLoading, error, sendRequest } = useHttp();

  const enterTaskHandler = async (taskText) => {
  

    const addingData = (newObj) => {
      
      const generatedId = newObj.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      
      props.onAddTask(createdTask);
    };

    // const {isLoading,error}=useHttp({
    //   url: "https://react-http-5e8f1-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
    //   method: "PUT",
    //   header: {
    //     "Content-Type": "application/json",
    //   },
    //   body: taskText,
    // },addingData);

    // setIsLoading(true);
    // setError(null);

    sendRequest(
      {
        url: "https://react-http-5e8f1-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: {text:taskText},
      },
      addingData
    );

    // try {
    //   const response = await fetch(
    //     "https://react-http-5e8f1-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({ text: taskText }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Request failed!");
    //   }

    //   const data = await response.json();

    //   const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };

    //   props.onAddTask(createdTask);
    // } catch (err) {
    //   setError(err.message || "Something went wrong!");
    // }
    // setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
