import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { db } from './firebase-config.js';

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword,signInAnonymously } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
// import { getAuth, createUserWithEmailAndPassword } from import { initializeApp } from
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
// import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseAuth = async (db) => {
    const email = "opulentpastanotorious@gmail.com";
    const password = "pz:'?+q]5R=X-KgA";

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log(`TRUE signInWithEmailAndPassword`)
            // Signed in..
        })
        .catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });

    // signInAnonymously(auth)
    //     .then(() => {
    //         console.log(`TRUE signInAnonymously`)
    //         // Signed in..
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(`FALSE signInAnonymously`)
    //         // ...
    //     });

    // const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(`TRUE onAuthStateChanged`)
            console.log(`user ::: ${user}`)
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            console.log(`FALSE onAuthStateChanged`)
            console.log(`user ::: ${user}`)
            // User is signed out
            // ...
        }
    });


    // const querySnapshot = await getDocs(collection(db, "Users"));
    // querySnapshot.forEach((doc) => {
    //     console.log(`SUCCESS Users Collection querySnapshot `);
    //     console.log(`${doc.id} => ${doc.data()}`);
    // });


    const docRef = doc(db, "Posts", "Post1");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Post data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such Post!");
    }

}

const firebaseRead = async (db) => {

    // var citiesRef = db.collection("cities");

    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    // });
}




const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: process.env.REACT_APP_INFURA_API_KEY,
            },
        },
    },
    theme: "dark",
});

window.ethereum &&
    window.ethereum.on("chainChanged", (chainId) => {
        web3Modal.cachedProvider &&
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    });

window.ethereum &&
    window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length === 0) {
            await web3Modal.clearCachedProvider();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        web3Modal.cachedProvider &&
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    });

const Layout = () => {
    // console.log(`BEFORE firebaseInit()`);
    // let db = firebaseInit();
    console.log(`AFTER firebaseInit()`);
    // console.log(`BEFORE firebaseAuth()`);
    // firebaseAuth(db);
    // console.log(`AFTER firebaseAuth()`);
    // console.log(`BEFORE firebaseRead()`);
    // firebaseRead();
    // console.log(`AFTER firebaseRead()`);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [citations, setCitations] = useState([]);

    const UsersCollectionRef = collection(db, "Users");
    const PostsCollectionRef = collection(db, "Posts");
    const CitationsCollectionRef = collection(db, "Citations");

    const [uCites, setUCites] = useState([]);
    const [uPosts, setUPosts] = useState([]);
    const handleCount = () => {
        // setCount(count + 1);
        setUCites(users.userCitations); // This will not use the latest value of count
        setUPosts(users.userPosts);
    };
    // let uCites = users.userCitations;
    // let uPosts = users.userPosts;
    const testCollectionRef = collection(db, "test");


    useEffect(() => {
        const firebaseGetUsers = async (db) => {
            console.log(`==========================================`);

            const UsersSnapshot = await getDocs(UsersCollectionRef);

            const PostsSnapshot = await getDocs(PostsCollectionRef);
            const CitationsSnapshot = await getDocs(CitationsCollectionRef);

            console.log(`SUCCESS Users Collection querySnapshot `);
            console.log(`UsersSnapshot ::: ${UsersSnapshot}`);
            console.log(UsersSnapshot);

            for (const [key, value] of Object.entries(UsersSnapshot)) {
                console.log(`${key}: ${value}`);
            }
            console.log(` *** `);

            UsersSnapshot.forEach((doc) => {
                // console.log(`SUCCESS Users Collection UsersSnapshot `);
                console.log(`${doc.id} => ${doc.data()}`);
                console.log(`doc.userAddr => ${doc.userAddr}`);
                console.log(`doc.userCitations => ${doc.userCitations}`);
            });

            // let docsArr = UsersSnapshot.docs;
            setUsers(UsersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setPosts(PostsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setCitations(CitationsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

            // docs[0]._document
        }
        firebaseGetUsers(db);
    }, []);

    const [injectedProvider, setInjectedProvider] = useState();
    const [address, setAddress] = useState("");
    const [chainId, setChainId] = useState();
    const [walletConnected, setWalletConnected] = useState(false);

    const navigate = useNavigate();

    const connectWallet = useCallback(async () => {
        const provider = await web3Modal.connect();
        const injectedProvider = new ethers.providers.Web3Provider(provider);
        setInjectedProvider(injectedProvider);
        const signer = injectedProvider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
        const balance = Number(
            ethers.utils.formatEther(await signer.getBalance())
        ).toFixed(2);
        const chainId = await signer.getChainId();
        setChainId(chainId);
        console.log("SIGNER :", signer);
        console.log("ADDRESS :", address);
        console.log("BALANCE :", balance);
        console.log("CHAIN ID :", chainId);
        setWalletConnected(true);
    }, []);

    useEffect(() => {
        // firebaseAuth(db);
        // firebaseGetUsers(db);

        function init() {
            if (web3Modal.cachedProvider) {
                connectWallet();
            }
        }
        init();
    }, [connectWallet]);

    const disconnectWallet = async () => {
        await web3Modal.clearCachedProvider();
        setTimeout(() => {
            setWalletConnected(false);
            window.location.reload();
        }, 1000);
    };

    return (
        <>
            <h1>Citation IIPFS</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/contribute">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/reference">Reference</Link>
                    </li>
                    {/* <input placeholder="Username..." /> */}
                    <input placeholder="User Address..." />
                    {/* <button>Search</button> */}
                    {/* handleCount(); */}
                    <button className="btn" onClick={handleCount}>
                        Search
                    </button>

                    {users.map((user) => {
                        // return <React.Fragment>{JSON.stringify(["a", { b: "c" }])}</React.Fragment>;

                        return (
                            <>
                                <div>
                                    {" "}
                                    <b>user's address':</b>
                                    <ul>
                                        {user.userAddr}
                                    </ul>
                                    {/* <h1>Age: {user.age}</h1> */}
                                    {/* <h3>userCitations: {user.userCitations.map(home => <div>{home.referenceValue}</div>)}</h3>
                                    <h3>userPosts: {user.userPosts.map(home => <div>{home.referenceValue}</div>)}</h3> */}
                                    <b>user's Citations: {user.userCitations.map(home => <div>{home.referenceValue}</div>)}</b>
                                    {/* <h3>userPosts: {user.userPosts.map(home => <div>{home.referenceValue}</div>)}</h3> */}
                                    <ul>
                                        {user.userCitations && user.userCitations.map(item => {
                                            return <li>{JSON.stringify(item._key.path.segments.join('/'))}</li>;
                                        })}
                                    </ul>
                                    <b>user's Posts: </b>
                                    <ul>
                                        {user.userPosts && user.userPosts.map(item => {
                                            return <li>{JSON.stringify(item._key.path.segments.join('/'))}</li>;
                                        })}
                                    </ul>

                                </div>
                            </>
                        );
                    })}
                    {posts.map((post) => {
                        // return <React.Fragment>{JSON.stringify(["a", { b: "c" }])}</React.Fragment>;

                        return (
                            <>
                                <div>
                                    {" "}
                                    {/* <b>Posts Collection: {JSON.stringify(post)}</b> */}
                                    <b>Post Id:</b>
                                    <ul>
                                        {post.id}
                                    </ul>
                                    <b>Posts Path: {JSON.stringify(post.owner._key.path.segments.join('/'))}</b>
                                    <b> Citations Used: </b>
                                    <ul>
                                        {post.citationsUsed && post.citationsUsed.map(item => {
                                            return (
                                                <>
                                                    <li>{"postDBPath : " + JSON.stringify(post.owner._key.path.segments.join('/'))}</li>
                                                    <li>{"postTitle : " + post.postTitle}</li>
                                                    <li>{"postCID : " + post.postCID}</li>
                                                </>)
                                        })}
                                    </ul>
                                </div>
                            </>
                        );
                    })}
                    {citations.map((cite) => {
                        // return <React.Fragment>{JSON.stringify(["a", { b: "c" }])}</React.Fragment>;

                        return (
                            <>
                                <div>
                                    {" "}
                                    <b>Citations Collection: </b>
                                    {/* <h3>Citations Collection :{JSON.stringify(cite)}</h3> */}
                                    <ul>
                                        {cite.postsCiting && cite.postsCiting.map(item => {
                                            return <li>{"Citing Posts Path: " + item._key.path.segments.join('/')}</li>
                                        })}
                                    </ul>
                                    {/* <li>{"Citing Post Path: "}+{JSON.stringify(cite.postsCiting._key.path.segments.join('/'))}</li>; */}
                                    <li>{"Citing Post CID : " + cite.postCID}</li>
                                    {/* <li>{"postTitle : "}+{cite.postTitle}</li>; */}
                                    <li>{"referenceString Used by Citing Post: " + cite.referenceString}</li>
                                </div>
                            </>
                        );
                    })}

                    {!walletConnected ? (
                        <>
                            <button className="btn" onClick={connectWallet}>
                                Connect Wallet
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn" onClick={disconnectWallet}>
                                Disconnect Wallet
                            </button>
                            <button className="btn" onClick={() => navigate("/contribute")}>
                                Contribute
                            </button>
                        </>
                    )}
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
