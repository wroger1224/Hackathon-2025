import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onIdTokenChangedListener } from '../../../services/Firebase/firebaseService';
import { setUser } from '../../../reducers/userSlice';

export function AuthStateListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onIdTokenChangedListener ((user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);


  return children;
}
