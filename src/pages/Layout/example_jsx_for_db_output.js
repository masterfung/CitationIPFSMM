{
    users.map((user) => {
        return (
            <>
                <div>
                    {" "}
                    <h3>userAddr: {user.userAddr}</h3>
                    {/* <h1>Age: {user.age}</h1> */}
                </div>
                <div>
                    <h3>userCitations: </h3>
                    {uCites.map(home => <div>{home.referenceValue}</div>)}

                    <h3>userPosts: </h3>
                    {uPosts.map(home => <div>{home.referenceValue}</div>)}

                    <ul>
                        {uCites && uCites.map(item => {
                            return <li>{item[0]}</li>;
                        })}
                    </ul>
                    {/* <h3>userPosts</h3> */}
                    <ul>
                        {uPosts && uPosts.map(item => {
                            return <li>{item[0]}</li>;
                        })}
                    </ul>
                    );
                </div>
            </>


})
}

{
    users.map((user) => {
        return (
            <>
                <div>
                    {" "}
                    <h3>userAddr: {user.userAddr}</h3>
                    {/* <h1>Age: {user.age}</h1> */}

                    <h3>userCitations: </h3>
                    {uCites.map(home => <div>{home.referenceValue}</div>)}

                    <h3>userPosts: </h3>
                    {uPosts.map(home => <div>{home.referenceValue}</div>)}
                </div>
                <div>
                    <ul>
                        {uCites && uCites.map(item => {
                            return <li>{item[0]}</li>;
                        })}
                    </ul>
                    <h3>userCitations2 :{JSON.stringify(user.userCitations)}</h3>
                    <h3>userPosts2: {JSON.stringify(user.userPosts).join('/')}</h3>
                    {/* <h3>userPosts</h3> */}
                    <ul>
                        {uPosts && uPosts.map(item => {
                            return <li>{item[0]}</li>;
                        })}
                    </ul>
                </div>
            </>
        );
    })
}