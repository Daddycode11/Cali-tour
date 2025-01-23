import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Transactions, transactionsConverter } from '../../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private firestore: Firestore) {}

  // For admin to get all orders
  getAllTransactions(): Observable<Transactions[]> {
    const transactionsRef = collection(
      this.firestore,
      'transactions'
    ).withConverter(transactionsConverter);
    const q = query(transactionsRef, orderBy('createdAt', 'desc'));

    return collectionData(q).pipe(
      map((transactions) => transactions as Transactions[])
    );
  }

  // For users to see their orders
  getAllTransactionsByUsers(userID: string): Observable<Transactions[]> {
    const transactionsRef = collection(
      this.firestore,
      'transactions'
    ).withConverter(transactionsConverter);
    const q = query(transactionsRef, where('userID', '==', userID));

    return collectionData(q).pipe(
      map((transactions) => transactions as Transactions[])
    );
  }

  // To view transaction info
  getTransactionById(
    transactionID: string
  ): Observable<Transactions | undefined> {
    const transactionDocRef = doc(
      this.firestore,
      `transactions/${transactionID}`
    ).withConverter(transactionsConverter);

    return docData<Transactions>(transactionDocRef, { idField: 'id' }).pipe(
      map((transactionData) => {
        if (!transactionData) {
          return undefined;
        }
        // Here, you can ensure that FieldValues are properly handled
        return transactionData;
      })
    );
  }

  // Create transaction / order
  addTransaction(transaction: Transactions): Promise<void> {
    const transactionDocRef = doc(
      collection(this.firestore, 'transactions'),
      transaction.id
    ).withConverter(transactionsConverter);

    return setDoc(transactionDocRef, transaction);
  }

  // Update transaction info / update order
  updateTransaction(transaction: Transactions): Promise<void> {
    const transactionDocRef = doc(
      this.firestore,
      `transactions/${transaction.id}`
    ).withConverter(transactionsConverter);

    return updateDoc(transactionDocRef, { ...transaction });
  }

  // Delete order / for admin
  deleteTransaction(transactionID: string): Promise<void> {
    const transactionDocRef = doc(
      this.firestore,
      `transactions/${transactionID}`
    ).withConverter(transactionsConverter);

    return deleteDoc(transactionDocRef);
  }
}
