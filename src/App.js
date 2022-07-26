import { useState, useEffect } from "react";
import "./styles.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      age: Number(newAge),
      title: newTitle,
      text: newText
    });
  };

  const updateUser = async (id, age, sum) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + sum };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [usersCollectionRef]);

  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <input
        placeholder="Title..."
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
      />
      <input
        placeholder="Text.."
        onChange={(event) => {
          setNewText(event.target.value);
        }}
      />
      <button onClick={createUser}> Create User</button>

      {users.map((user) => {
        return (
          <div key={user.id}>
            {" "}
            <h1>Name: {user.name}</h1>
            <h2>Age: {user.age}</h2>
            <h2>Title: {user.title}</h2>
            <h2>Text: {user.text}</h2>
            <button
              onClick={() => {
                updateUser(user.id, user.age, +1);
              }}
            >
              {" "}
              Increase +
            </button>
            <button
              onClick={() => {
                updateUser(user.id, user.age, -1);
              }}
            >
              {" "}
              Decrease -
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
