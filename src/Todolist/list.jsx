import { useEffect, useState } from "react";

import { axiosInstance } from "../../axios.config";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTilte] = useState("");
  const [query, setQuery] = useState("");

  const getData = (query) => {
    console.log(query);
    axiosInstance
      .get(`/todos`, {
        params: {
          q: query,
        },
      })
      .then((res) => setTodos(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setTilte(e.target.value);
  };

  const handleDelete = (id) => {
    axiosInstance.delete(`/todos/${id}`).then(() => getData());
  };

  const handleEdit = (content) => {
    axiosInstance
      .patch(`/todos/${content.id}`, {
        completed: !content.completed,
      })
      .then(() => getData());
  };

  const handleDone = (status) => {
    axiosInstance
      .patch(`/todos/${status.id}`, {
        completed: !status.completed,
      })
      .then(() => getData());
  };

  const addTask = async (e) => {
    e.preventDefault();
    let taskData = {
      title,
      completed: false,
    };
    axiosInstance.post(`/todos`, taskData).then(() => getData());
    setTilte("")
  };

  useEffect(() => {
    const getSearchedData = setTimeout(() => {
      getData(query);
    }, 500);
    return () => clearTimeout(getSearchedData);
  }, [query]);

  const searchTask = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="todolist">
      <div className="search">
        <input
          onChange={searchTask}
          type="text"
          placeholder="Search ex: todo 1"
        />
      </div>
      <form className="addTask" onSubmit={addTask}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Add a task........"
          value={title}
        />
        <button className="addtask-btn">Add Task</button>
      </form>
      <div className="lists">
        {todos?.map((todo, id) => (
          <div key={id} className={`list ${todo.completed ? "completed" : ""}`}>
            <p> {todo.title}</p>
            <div className="span-btns">
              {!todo.completed && (
                <span onClick={() => handleDone(todo)} title="completed">
                  ✓
                </span>
              )}
              <span
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
                title="delete"
              >
                x
              </span>
              <span
                className="edit-btn"
                onClick={() => handleEdit(todo)}
                title="edit"
              >
                ↻
              </span>
            </div>
          </div>
        ))}
        {!todos?.length && <h1>No Records</h1>}
      </div>
    </div>
  );
};

export default Todolist;
