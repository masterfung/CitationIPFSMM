import { db } from './firebase-config.js';
import {
    doc, getDoc, getFirestore, collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc, arrayUnion, arrayRemove

} from "firebase/firestore";

/*
    SAMPLE PARAMETER ARGUMENTS
    let address= "0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf"

    let citationObj = {
        "parentCID": "QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyKKa",
        "citationCID": "QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyTTR",
        "citationURL": "https://ipfs-link/CID",
        "citationHash": "hash of text selection"
    }

    let postObj = {
        "cid": "QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyKKa",
        "title": "Ancient Egypt",
        "ipfsURL": "https://ipfs-link/CID"
    }
 */

const createNewPost = async (address, postObj) => {
    const docRef = doc(db, "Users", address);
    let docSnap = await getDoc(docRef);
    if (docSnap) {
        let x = await updateDoc(docRef, {
            postsArray: arrayUnion(postObj)
        });
    }
}

const createNewCitation = async (address, citationObj) => {
    const docRef = doc(db, "Users", address);
    let docSnap = await getDoc(docRef);
    if (docSnap) {
        let x = await updateDoc(docRef, {
            citationsArray: arrayUnion(citationObj),
        });
    }
}

/*
    sample getUserData() return value

        {
            "postsArray": [
                {
                    "ipfsURL": "https://ipfs-link/CID",
                    "cid": "vs2dgkWOomo8J66WdPcG9gDt3MTbhvJQQ7ecJyRaIWxQmz",
                    "title": "Ancient Egypt"
                },
                {
                    "cid": "1ikQTaLWoxhTs7GgOAdeOGfxV3IrTZgAvSx5mdAlINwaN0",
                    "ipfsURL": "https://ipfs-link/CID",
                    "title": "Ancient Egypt"
                }
            ],
            "citationsArray": [
                {
                    "parentCID": "vs2dgkWOomo8J66WdPcG9gDt3MTbhvJQQ7ecJyRaIWxQmz",
                    "citationCID": "QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyTTR",
                    "citationHash": "hash of text selection",
                    "citationURL": "https://ipfs-link/CID"
                },
                {
                    "citationHash": "hash of text selection",
                    "parentCID": "1ikQTaLWoxhTs7GgOAdeOGfxV3IrTZgAvSx5mdAlINwaN0",
                    "citationCID": "QmbGh29JWMxt1TZGRsHqqHz3KGGcbV31fsCY8Es1GMyTTR",
                    "citationURL": "https://ipfs-link/CID"
                }
            ]
        }

*/

const getUserData = async (address) => {
    const docRef = doc(db, "Users", address);
    let docSnap = await getDoc(docRef);
    if (docSnap) {
        return docSnap.data();
    }
}


export { createNewPost, createNewCitation, getUserData }
