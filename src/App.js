import { useEffect, useState } from "react";
import "./App.scss";
import { db } from "./firebase-config";
import Img from "./me.png";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [addUser, setAddUser] = useState({
    name: null,
    email: null,
    age: null,
    img: [],
  });
  useEffect(() => {
    const getUsers = async () => {
      await getDocs(usersCollectionRef)
        .then((res) =>
          setUsers(
            res.docs?.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            })
          )
        )
        .catch((err) => console.log(err));
    };
    getUsers();
  });
  const addUsers = async (e) => {
    e.preventDefault();
    // console.log(addUser)
    await addDoc(usersCollectionRef, { ...addUser, age: Number(addUser.age) })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setAddUser({
      name: null,
      email: null,
      age: null,
      img: [],
    });
  };
  const updateAge = async (id, age, op) => {
    await updateDoc(doc(db, "users", id), {
      age: op === "add" ? age + 1 : age - 1,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <form onSubmit={addUsers} className="form">
        <input
          type="name"
          placeholder="Full Name"
          required
          id="name"
          value={addUser.name}
          onChange={(e) => setAddUser({ ...addUser, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          required
          id="age"
          value={addUser.age}
          onChange={(e) => setAddUser({ ...addUser, age: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          id="email"
          value={addUser.email}
          onChange={(e) => setAddUser({ ...addUser, email: e.target.value })}
        />
        <input
          type="file"
          required
          id="img"
          onChange={(e) => {
            let base64String = "";

            function imageUploaded() {
              var file = document.querySelector("input[type=file]")["files"][0];

              var reader = new FileReader();

              reader.onload = function () {
                base64String = reader.result
                  .replace("data:", "")
                  .replace(/^.+,/, "");
                setAddUser({
                  ...addUser,
                  img: `data:image/png;base64,${base64String}`,
                });
              };
              reader.readAsDataURL(file);
            }

            imageUploaded(e);
          }}
        />
        <button type="submite">Add User</button>
      </form>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user">
            <img src={user.img ? user.img : Img} />
            <div className="detail">
              <div className="user-text">Name: {user.name}</div>
              <div className="user-text">
                Age:
                <AiOutlineMinus
                  className="icon"
                  onClick={() => updateAge(user.id, user.age, "sub")}
                />{" "}
                {user.age}{" "}
                <IoMdAdd
                  className="icon"
                  onClick={() => updateAge(user.id, user.age, "add")}
                />
              </div>
              <div className="user-text">Email: {user.email}</div>
            </div>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
