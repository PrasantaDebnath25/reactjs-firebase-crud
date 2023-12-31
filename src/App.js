import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    console.log(usersCollectionRef)
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    //Reset Fields
    setNewName("");
    setNewAge(0);
    getUsers();
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    console.log(userDoc)
    await deleteDoc(userDoc);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  console.log("users---", users)

  return (
    <div className="App">
      <input
        value={newName}
        type="text"
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        value={newAge}
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />

      <button onClick={createUser} disabled={!newName && !newAge} > Create User</button>
      {users && users.length > 0 && users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
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
