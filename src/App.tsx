import React from "react";
import { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Store, { ITodo } from "./AppStore";
import uuid from "uuid";
import styled from "styled-components";
const App: React.FC = observer(() => {
  const store = useContext(Store);
  const [title, seTitle] = useState("");
  const [err, setErr] = useState(false);
  //console.log(store);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      setErr(true);
    } else {
      store.addTodo({
        title,
        id: uuid.v4(),
        completed: false
      });
    }
    seTitle("");
  };
  useEffect(() => {
    store.fetchTodos();
    // eslint-disable-next-line
  }, []);
  const Form = styled.form`
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  `;
  const InputText = styled.input`
    height: 40px;
    border-radius: 3px;
    text-indent: 10px;
    border: 1px solid #eee;
    min-width: 250px;
    margin-right: 10px;
  `;
  const SubmitButton = styled.button`
    background-color: purple;
    border: none;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
    font-family: "Josefin Sans", sans-serif;
    padding: 5px 10px;
  `;
  const UL = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  `;
  const LI = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const TodoText = styled.span`
    font-family: "Swanky and Moo Moo", cursive;
    font-weight: bold;
    font-size: 30px;
    color: #333;
    :hover {
      cursor: pointer;
    }
  `;
  const RemoveButton = styled.button`
    background-color: #a02837;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    margin-left: 5px;
    border: none;
    outline: none;
    &:hover {
      cursor: pointer;
    }
    &:active {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
    }
  `;
  const ErrMessage = styled.h2`
    display: flex;
    lign-items: center;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #a02837;
    color: #fff;
    padding: 40px;
    font-family: "Josefin Sans", sans-serif;
  `;
  const CloseButton = styled.button`
    background-color: initial;
    border: none;
    color: #fff;
    font-size: 18px;
    position: absolute;
    top: 15px;
    right: 15px;
  `;
  return (
    <div className="App">
      <Form onSubmit={e => handleSubmit(e)}>
        <InputText
          type="text"
          placeholder="addTodo"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            seTitle(e.currentTarget.value)
          }
        />
        <SubmitButton type="submit">Add Todo</SubmitButton>
      </Form>
      <UL>
        {store.todos.map((todo: ITodo, idx: number) => {
          return (
            <LI key={todo.id}>
              <TodoText
                style={{
                  textDecoration: todo.completed ? "line-through" : "none"
                }}
                onClick={() => store.toggletodo(idx)}
              >
                {todo.title}
              </TodoText>
              <RemoveButton onClick={() => store.removeTodo(todo.id)}>
                &times;
              </RemoveButton>
            </LI>
          );
        })}
      </UL>
      {err && (
        <ErrMessage>
          <span>Enter A Valid Todo</span>
          <CloseButton
            onClick={() => setErr(false)}
            style={{ cursor: "pointer" }}
          >
            &times;
          </CloseButton>
        </ErrMessage>
      )}
    </div>
  );
});

export default App;
