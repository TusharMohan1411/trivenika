import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-client";

export const createNewBlogCategory = async ({ data, imageURL }) => {
    const firestoreRef = doc(db, `blogCategories/${data.slug}`);
    const existingDoc = await getDoc(firestoreRef);
    if (existingDoc.exists()) {
        throw new Error("Slug already exists. Please choose a unique slug.");
    }

    await setDoc(firestoreRef, {
        ...data,
        imageURL: imageURL,
        timestamp: Timestamp.now(),
    });

    await updateDoc(firestoreRef, { id: firestoreRef.id });
};

export const updateBlogCategory = async ({ data, imageURL }) => {

    const firestoreRef = doc(db, `blogCategories/${data.id}`);

    const updatePayload = {
        ...data,
        timestamp: Timestamp.now(),
    };

    if (image) {
        updatePayload.imageURL = imageURL;
    }

    await updateDoc(firestoreRef, updatePayload);
}

export const deleteBlogCategory = async (id) => {
    await deleteDoc(doc(db, `blogCategories/${id}`));
}

export const getBlogCategory = async (id) => {
    return await getDoc(doc(db, `blogCategories/${id}`)).then((snap) => snap.data());
}

export const getAllBlogCategories = async () => {
    // build a query that orders by timestamp descending
    const q = query(
        collection(db, "blogCategories"),
        orderBy("timestamp", "desc")
    );

    // execute the query
    const snaps = await getDocs(q);

    // map to data objects
    return snaps.docs.map((doc) => doc.data());
};





// export const createNewBlogCategory = async ({ data, image }) => {
//     const firestoreRef = doc(db, `blogCategories/${data.slug}`);
//     const existingDoc = await getDoc(firestoreRef);
//     if (existingDoc.exists()) {
//         throw new Error("Slug already exists. Please choose a unique slug.");
//     }

//     const imageURL = await uploadImage(image);

//     await setDoc(firestoreRef, {
//         ...data,
//         imageURL: imageURL,
//         timestamp: Timestamp.now(),
//     });

//     await updateDoc(firestoreRef, { id: firestoreRef.id });

// };

// export const updateBlogCategory = async ({ data, image }) => {

//     const firestoreRef = doc(db, `blogCategories/${data.id}`);

//     const updatePayload = {
//         ...data,
//         timestamp: Timestamp.now(),
//     };

//     if (image) {
//         const imageURL = await uploadImage(image);
//         updatePayload.imageURL = imageURL;
//     }

//     await updateDoc(firestoreRef, updatePayload);
// }