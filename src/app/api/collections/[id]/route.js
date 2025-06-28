import { connectDB } from "@/lib/mongodb";
import Collection from "@/models/collectionModel";
import { NextResponse } from "next/server";

// Utility to check for duplicate name or slug
async function checkForDuplicate({ name, slug, excludeId = null }) {
  const conditions = [];
  if (name) conditions.push({ name });
  if (slug) conditions.push({ slug });

  if (conditions.length === 0) return false;

  const query = { $or: conditions };
  if (excludeId) query._id = { $ne: excludeId };

  return await Collection.findOne(query);
}

// GET single collection
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDB();

    const collection = await Collection.findById(id).populate("products");
    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: collection });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT (update) collection
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const existingCollection = await Collection.findById(id);
    if (!existingCollection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    const duplicate = await checkForDuplicate({
      name: body.name,
      slug: body.slug,
      excludeId: id,
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "Collection with this name or slug already exists" },
        { status: 409 }
      );
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ data: updatedCollection });
  } catch (e) {
    return NextResponse.json(
      {
        error: e.message.includes("validation")
          ? "Invalid Collection data"
          : "Server error",
      },
      { status: e.message.includes("validation") ? 400 : 500 }
    );
  }
}

// DELETE collection
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectDB();

    const deletedCollection = await Collection.findByIdAndDelete(id);
    if (!deletedCollection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Collection deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// import { db } from "@/lib/firebase/firebase-client";
// import { Timestamp, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
// import { NextResponse } from 'next/server';

// export async function GET(request, { params }) {
//     const { id } = params;
//     try {
//         const snap = await getDoc(doc(db, `tags/${id}`));
//         const cat = snap.data();
//         return NextResponse.json({ data: cat });
//     } catch (e) {
//         return NextResponse.json({ error: e.message }, { status: 404 });
//     }
// }

// export async function PUT(request, { params }) {
//     const { id } = params;
//     try {
//         const { data } = await request.json();

//         const updatePayload = {
//             ...data,
//             updatedAt: serverTimestamp(),
//         };

//         const firestoreRef = doc(db, `tags/${id}`);
//         await updateDoc(firestoreRef, updatePayload);

//         return NextResponse.json({ success: true });
//     } catch (e) {
//         return NextResponse.json({ error: e.message }, { status: 400 });
//     }
// }

// export async function DELETE(request, { params }) {
//     const { id } = params;
//     try {
//         await deleteDoc(doc(db, `tags/${id}`));
//         return NextResponse.json({ success: true });
//     } catch (e) {
//         return NextResponse.json({ error: e.message }, { status: 400 });
//     }
// }
