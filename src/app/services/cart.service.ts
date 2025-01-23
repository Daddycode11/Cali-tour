import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable, switchMap, toArray } from 'rxjs';
import { Cart, cartConverter, CartWithProduct } from '../../models/cart';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  FieldValue,
} from '@angular/fire/firestore';
import { Products, productsConverter } from '../../models/products';
export const CART_COLLECTION = 'carts';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private firestore: Firestore) {}
  getAllMyCart(userID: string): Observable<CartWithProduct[]> {
    const cartRef = collection(this.firestore, CART_COLLECTION).withConverter(
      cartConverter
    );
    const productsRef = collection(this.firestore, 'products').withConverter(
      productsConverter
    );

    const q = query(cartRef, where('userID', '==', userID));

    return collectionData(q).pipe(
      mergeMap(
        (
          carts: Array<
            | Cart
            | {
                id: string | FieldValue;
                userID: string | FieldValue;
                productID: string | FieldValue;
                quantity: number | FieldValue;
              }
          >
        ) =>
          from(carts).pipe(
            mergeMap((cart: Cart | { [key: string]: any }) => {
              // Type assertion to ensure the cart is treated as a Cart type
              const typedCart = cart as Cart;

              return from(getDoc(doc(productsRef, typedCart.productID))).pipe(
                map((productDoc) => {
                  const product = productDoc.data() as Products;
                  return {
                    cart: {
                      ...typedCart,
                      id: typedCart.id ? typedCart.id.toString() : '',
                      userID: typedCart.userID
                        ? typedCart.userID.toString()
                        : '',
                      productID: typedCart.productID
                        ? typedCart.productID.toString()
                        : '',
                      createdAt:
                        typedCart.createdAt instanceof Date
                          ? typedCart.createdAt
                          : new Date(),
                    },
                    product: {
                      ...product,
                      id: product.id ? product.id.toString() : '',
                      name: product.name ? product.name.toString() : '',
                      description: product.description
                        ? product.description.toString()
                        : '',
                      price: product.price ? product.price : 0,
                      imageUrl: product.imageUrl
                        ? product.imageUrl.toString()
                        : '',
                      category: product.category
                        ? product.category.toString()
                        : '',
                      stock: product.stock ? product.stock : 0,
                    },
                  };
                })
              );
            }),
            toArray()
          )
      )
    );
  }
  async addToCart(cart: Cart): Promise<void> {
    const cartRef = collection(this.firestore, 'carts').withConverter(
      cartConverter
    );
    const q = query(
      cartRef,
      where('userID', '==', cart.userID),
      where('productID', '==', cart.productID)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // Cart doesn't exist, add new
      const newCartRef = doc(cartRef);
      await setDoc(newCartRef, { ...cart, id: newCartRef.id });
    } else {
      // Cart exists, increment quantity
      const cartDoc = querySnapshot.docs[0];
      const currentQuantity = cartDoc.data().quantity;
      await updateDoc(cartDoc.ref, { quantity: currentQuantity + 1 });
    }
  }

  async deleteToCart(cartID: string): Promise<void> {
    const cartDocRef = doc(this.firestore, `carts/${cartID}`);
    await deleteDoc(cartDocRef);
  }

  deleteCartInBatch(carts: string[]) {
    const batch = writeBatch(this.firestore);
    carts.forEach((e) => {
      batch.delete(doc(this.firestore, `carts/${e}`));
    });
    return batch.commit();
  }
  async increaseCartQuantity(cartID: string, quantity: number): Promise<void> {
    const cartDocRef = doc(this.firestore, `carts/${cartID}`).withConverter(
      cartConverter
    );

    await updateDoc(cartDocRef, { quantity: increment(quantity) });
  }
}
