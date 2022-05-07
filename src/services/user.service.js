import { UserModel } from "@/store/models";
import * as firestore from "firebase/firestore";
import { firebaseDb } from "@/plugins";

export class UserService {
  constructor() {
    this.getDataObj = () => {
      const { name, email, uid, lastActiveAt } = this;

      return { name, email, uid, lastActiveAt };
    };

    this.getUserById = async (userId) => {
      if (!userId) return;
      const q = firestore.query(
        firestore.collection(firebaseDb, "users"),
        firestore.where("uid", "==", userId)
      );

      const querySnapshot = await firestore.getDocs(q);

      if (!querySnapshot.docs.length) return null;
      const doc = querySnapshot.docs[0];

      return doc.data();
    };

    this.createUser = async (userData) => {
      const data = new UserModel(userData).getDataObj();

      data.id = "0";
      data.createdAt = new Date();
      const userDoc = await firestore.addDoc(
        firestore.collection(firebaseDb, "users"),
        data
      );

      firestore.updateDoc(userDoc, {
        id: userDoc.id,
      });

      return userDoc;
    };

    this.updateUser = async ({ id, userData }) => {
      const userDoc = firestore.doc(firebaseDb, "users", id);

      await firestore.updateDoc(userDoc, userData);

      return userDoc;
    };

    this.userListener = async (userId, commit) => {
      const user = await this.getUserById(userId);

      if (!user) return;

      this.unsubscribe = firestore.onSnapshot(
        firestore.doc(firebaseDb, "users", user.id),
        (doc) => {
          const docData = doc.data();

          if (!docData) return;

          // console.log('Current data: ', docData)
          commit("updateUser", new UserModel(docData));
        },
        (error) => {
          console.log(error);
        }
      );
    };

    this.userKillListener = () => {
      this.unsubscribe && this.unsubscribe();
    };

    this.updateLastActivityTime = async (userId) => {
      const user = await this.getUserById(userId);

      if (!user) return;

      await this.updateUser({
        id: user.id,
        userData: {
          lastActiveAt: firestore.serverTimestamp(),
        },
      });
    };
  }
}
