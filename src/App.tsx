import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react';
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 1,
      text: 'Demo',
      isChecked: false,
    }
  ]);
  const [inputName, setInputName] = useState<string>('');

  function handleNewAddTask() {
    // verificar se o input está vazio
    if (inputName.trim().length === 0) {
      return;
    }
    // verificar se o input é igual a uma task já existente
    if (inputName === tasks.find((task) => task.text === inputName)?.text) {
      return;
    }

    const newTask: ITask = {
      id: Math.random(), // número aleatório
      text: inputName,
      isChecked: false,
    };

    // nextState => [...nextState, newTask]
    setTasks((nextState) => [...nextState, newTask]);

    // limpar o input
    setInputName('');
  }

  function handleRemoveTask(id: number) {
    // nextState => nextState.filter((task) => task.id !== id)
    setTasks((nextState) => nextState.filter((task) => task.id !== id));
  }

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
              {tasks.map(function nomeDaFuncao(task) {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={() => handleRemoveTask(task.id)}
                    toggleTaskStatus={() => {}}
                  />
                )
              })}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  )
}
