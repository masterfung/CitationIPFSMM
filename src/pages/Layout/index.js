import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { db } from './firebase-config.js';
import { createNewPost, createNewCitation, getUserData } from './dbHelpers.js';
import { Nav } from 'react-bootstrap';
import './index.css';

import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

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
  theme: 'dark',
});

window.ethereum &&
  window.ethereum.on('chainChanged', chainId => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  });

window.ethereum &&
  window.ethereum.on('accountsChanged', async accounts => {
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
  console.log(`AFTER firebaseInit()`);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [citations, setCitations] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  const [currUser, setCurrUser] = useState({});
  const [userExists, setUserExists] = useState(false);

  const UsersCollectionRef = collection(db, 'Users');
  const PostsCollectionRef = collection(db, 'Posts');
  const CitationsCollectionRef = collection(db, 'Citations');

  const [uCites, setUCites] = useState([]);
  const [uPosts, setUPosts] = useState([]);

  const handleCount = () => {
    // setCount(count + 1);
    setUCites(users.userCitations); // This will not use the latest value of count
    setUPosts(users.userPosts);
  };
  // let uCites = users.userCitations;
  // let uPosts = users.userPosts;
  const testCollectionRef = collection(db, 'test');

  const firebaseGetUsers = async db => {
    console.log(`==========================================`);

    const UsersSnapshot = await getDocs(UsersCollectionRef);

    const PostsSnapshot = await getDocs(PostsCollectionRef);
    const CitationsSnapshot = await getDocs(CitationsCollectionRef);

    console.log(`SUCCESS Users Collection querySnapshot `);
    console.log(`UsersSnapshot ::: ${UsersSnapshot}`);
    console.log(UsersSnapshot);

    UsersSnapshot.forEach(doc => {
      if (address != '') {
        // console.log(`SUCCESS Users Collection UsersSnapshot `);
        // console.log("users ::: " + JSON.stringify(doc));
        // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        // console.log(`doc.userAddr => ${doc.id}`);
        // console.log(`doc.userCitations => ${doc.userCitations}`);
        if (address === `${doc.id}`) {
          setCurrUser(doc.data());
          setUserExists(true);
        }
      }
    });

    // let docsArr = UsersSnapshot.docs;
    setUsers(UsersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    setPosts(PostsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    setCitations(
      CitationsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );

    // docs[0]._document
  };

  useEffect(() => {
    console.log('mounted');
    firebaseGetUsers(db);
    return () => console.log('unmounting...');
  }, []);

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState();
  const [walletConnected, setWalletConnected] = useState(false);

  const navigate = useNavigate();

  // useCallback memoizes entire function, prevent function object for connectWallet getting created every re-render
  // use original function object created at initialization
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
    console.log('SIGNER :', signer);
    console.log('ADDRESS :', address);
    console.log('BALANCE :', balance);
    console.log('CHAIN ID :', chainId);
    setWalletConnected(true);
    setUserAddress(address);
    firebaseGetUsers(db).then(x => {
      console.log(x);
      // updateWithNewUser();
      console.log(' FINISHED firebaseGetUsers()');
    });
  }, []);

  const didMount = useRef(false);

  function makeid(length) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let citationObj = {
    parentCID: 'QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyKKa',
    citationCID: 'QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyTTR',
    citationURL: 'https://ipfs-link/CID',
    citationHash: 'hash of text selection',
  };

  let postObj = {
    cid: 'QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyKKa',
    title: 'Ancient Egypt',
    ipfsURL: 'https://ipfs-link/CID',
  };

  const demoHelpers = async () => {
    let newCid = makeid(46);
    citationObj.parentCID = newCid;
    postObj.cid = newCid;
    // createNewPost, createNewCitation, getUserData
    let createPostRes = await createNewPost(address, postObj);
    console.log(createPostRes);

    let createCitationRes = await createNewCitation(address, citationObj);
    console.log(createCitationRes);

    let userData = await getUserData(address);
    console.log(userData);

    const UsersCollectionRef = collection(db, 'Users');

    const UsersSnapshot = await getDocs(UsersCollectionRef);
    setUsers(UsersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const updateDBs = async () => {
    let newCid = makeid(46);
    citationObj.parentCID = newCid;
    postObj.cid = newCid;
    const docRef = doc(db, 'Users', address);
    // Atomically add a new region to the "regions" array field.
    let x = await updateDoc(docRef, {
      citationsArray: arrayUnion(citationObj),
      postsArray: arrayUnion(postObj),
    });
    if (x) {
      let docSnap = await getDoc(docRef);
      setCurrUser(docSnap.data());
    }
  };

  useLayoutEffect(() => {}, [currUser, users]);

  useLayoutEffect(() => {
    console.log(`address changed : ${address} `);

    if (address == '') {
      setUserExists(false);
      setCurrUser({});
      // return;
      console.log('address is empty string ');
    } else {
      const docRef = doc(db, 'Users', address);
      let docSnap = undefined;

      const checkDBifUserExists = async () => {
        docSnap = await getDoc(docRef);
      };
      let citationObj = {
        parentCID: 'QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyKKa',
        citationCID: 'QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyTTR',
        citationURL: 'https://ipfs-link/CID',
        citationHash: 'hash of text selection',
      };

      let postObj = {
        cid: 'QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyKKa',
        title: 'Ancient Egypt',
        ipfsURL: 'https://ipfs-link/CID',
      };
      const updateUserDBCollections = async () => {
        // Atomically add a new region to the "regions" array field.
        await updateDoc(docRef, {
          citationsArray: arrayUnion(citationObj),
          postsArray: arrayUnion(postObj),
        });
      };

      checkDBifUserExists().then(x => {
        if (docSnap != undefined && docSnap.exists()) {
          console.log('FOUND  userExists ');
          console.log('Post data:', docSnap.data());
          setUserExists(true);
          setCurrUser(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such Post!');
          // user not found in db
          const updateWithNewUser = async () => {
            const UsersCollectionRef = collection(db, 'Users');

            const UsersSnapshot = await getDocs(UsersCollectionRef);
            setUsers(
              UsersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            );
            // setUserExists(true);
            users.map(user => {
              // return <React.Fragment>{JSON.stringify(["a", { b: "c" }])}</React.Fragment>;
              if (user.id == address) {
                console.log(' 2 users.map((user) => { ');
                setUserExists(true);
                // userExists = true;
                // userObj = user;

                setCurrUser(user);
              }
            });
          };

          const docData2 = {
            citationsArray: [],
            postsArray: [],
          };
          // await setDoc(doc(db, "Users", address), docData2);
          setDoc(doc(db, 'Users', address), docData2).then(x => {
            console.log('FINISHED setDoc(doc(db, Users, address), docData2) ');
            updateWithNewUser().then(y => {
              console.log('FINISHED  updateWithNewUser() ');
            });
          });
        }
      });
    }
  }, [address]);

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
      setUserExists(false);
      setAddress('');
      setCurrUser({});
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <h1>Citation IPFS</h1>
      <nav>
        <ul>
          <span className='cit-nav-link'>
            <Link to='/'>Home</Link>
          </span>
          <span className='cit-nav-link'>
            <Link to='/contribute'>Blogs</Link>
          </span>
          <span className='cit-nav-link'>
            <Link to='/example'>Example</Link>
          </span>
          {/* <input placeholder="Username..." /> */}
          <input placeholder='User Address...' />
          {/* <button>Search</button> */}
          {/* handleCount(); */}
          <button className='btn' onClick={handleCount}>
            Search
          </button>

          {!walletConnected ? (
            <>
              <button className='btn' onClick={connectWallet}>
                Connect Wallet
              </button>

              {users.map(user => {
                // return <React.Fragment>{JSON.stringify(["a", { b: "c" }])}</React.Fragment>;

                return (
                  <div>
                    <div className='db-data'>
                      {' '}
                      <b>
                        {user.id.startsWith('0x')
                          ? `user's address : ${user.id}`
                          : ''}
                      </b>
                      <ul>
                        {user.id.startsWith('0x') &&
                          user.citationsArray.map(item => {
                            return <li>{JSON.stringify(item)}</li>;
                          })}
                      </ul>
                      <ul>
                        {user.id.startsWith('0x') &&
                          user.postsArray.map(item => {
                            return <li>{JSON.stringify(item)}</li>;
                          })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <button className='btn' onClick={disconnectWallet}>
                Disconnect Wallet
              </button>
              <button className='btn' onClick={() => navigate('/contribute')}>
                Contribute
              </button>

              <button className='btn' onClick={updateDBs}>
                Add new citation and post to user
              </button>
              <button className='btn' onClick={demoHelpers}>
                Demo Helper functions
              </button>

              {!userExists ? (
                <>
                  <div>IS NEW USER</div>
                </>
              ) : (
                <>
                  let a= 1; let entries = Object.entries(currUser);
                  <div>
                    LOGIN SUCCESS() CALLED curr user data :
                    <li>{JSON.stringify(currUser)}</li>
                  </div>
                  curr user data2 :
                  <li>{JSON.stringify(currUser.citationsArray)}</li>
                  curr user data3 :
                  <li>{JSON.stringify(currUser.postsArray)}</li>
                  <ul>
                    {currUser.citationsArray &&
                      currUser.citationsArray.map(item => {
                        return <li>{item[0]}</li>;
                      })}
                  </ul>
                  <ul>
                    {currUser.postsArray &&
                      currUser.postsArray.map(item => {
                        return <li>{item[0]}</li>;
                      })}
                  </ul>
                </>
              )}
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
