import { FormEvent, useContext, useState } from "react";
import { UserContext, UserContextType, UserI } from "../context/UserContext";

const Home = () => {
  const [user, setUser] = useState<UserI>({ email: "", name: "" });
  const [isEditing, setIsEditing] = useState({ status: false, id: 0 });
  const { users, addUser, deleteUser, editUser } = useContext(
    UserContext
  ) as UserContextType;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!user.email || !user.name) return;

    if (isEditing.status) {
      editUser(isEditing.id, user);
      setIsEditing({ status: false, id: 0 });
    } else addUser(user);

    setUser({ name: "", email: "" });
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleEdit = (e: FormEvent, u: UserI) => {
    e.preventDefault();
    setIsEditing({ status: true, id: u.id! });
    setUser({ name: u.name, email: u.email });
  };

  return (
    <div style={{ maxWidth: "500px", width: "100%", margin: "auto" }}>
      <h1>Home</h1>
      <p>Users list</p>

      <div>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleInput}
          value={user.email}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleInput}
          value={user.name}
        />
        <button onClick={handleSubmit}>
          {isEditing.status ? "Edit" : "Add"}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {users.map((u) => {
          return (
            <div
              style={{
                border: "1px solid #333",
                borderRadius: "10px",
                position: "relative",
                marginBottom: "10px",
                overflow: "hidden",
              }}
              key={u.id!}
            >
              {isEditing.status && isEditing.id === u.id && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(64, 64, 64, 0.7)",
                    zIndex: 10,
                  }}
                >
                  <button
                    style={{
                      border: "none",
                      outline: "none",
                      borderRadius: "5px",
                      margin: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setIsEditing({ status: false, id: 0 });
                      setUser({ name: "", email: "" });
                    }}
                  >
                    Cancel Edit
                  </button>
                </div>
              )}
              <p>
                Name - <strong>{u.name}</strong>
              </p>
              <p>
                Email - <strong>{u.email}</strong>
              </p>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
              >
                <button
                  onClick={(e) => handleEdit(e, u)}
                  style={{
                    borderRadius: "5px",
                    outline: "none",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                >
                  edit
                </button>

                <button
                  onClick={() => deleteUser(u.id!)}
                  style={{
                    borderRadius: "5px",
                    outline: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  x
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
