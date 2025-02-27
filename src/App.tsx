import { PlusCircle } from "@phosphor-icons/react";
import styles from "./App.module.css";
import { Button, Input, Empty, Item, Header } from "./components";
import { useState } from "react";

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 1,
      text: "Demo",
      isChecked: false,
    },
  ]);
  const [inputName, setInputName] = useState<string>("");

  function handleNewAddTask() {
    const input = inputName.trim();
    if (input.length === 0 || tasks.find((task) => task.text === input)) {
      setInputName("");
      return;
    }

    const newTask: ITask = {
      id: Math.random(),
      text: inputName,
      isChecked: false,
    };

    setTasks((nextState) => [...nextState, newTask]);

    setInputName("");
  }

  function deleteTask(id: number) {
    setTasks((tarefas) => tarefas.filter((task) => task.id !== id));
  }

  // function finalizarTask(){}
    
  

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          />
          <Button onClick={handleNewAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={deleteTask}
                  toggleTaskStatus={() => {}}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  );
}
