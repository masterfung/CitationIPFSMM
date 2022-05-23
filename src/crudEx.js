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

        <button onClick={createUser}> Create User</button>
        {users.map((user) => {
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