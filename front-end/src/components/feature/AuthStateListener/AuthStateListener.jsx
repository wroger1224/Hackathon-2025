import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onIdTokenChangedListener } from '../../../services/Firebase/firebaseService';
import { setUser } from '../../../reducers/userSlice';
import { fetchUserProfile } from '../../../reducers/userProfileSlice';

export function AuthStateListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onIdTokenChangedListener((user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(setUser(userData));
        // Fetch profile after setting user
        dispatch(fetchUserProfile(user.uid));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}
