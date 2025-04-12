import { useState, createContext, useEffect } from "react";
import { onIdTokenChangedListener } from "../services/Firebase/firebaseService";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => {},
	loading: false
});

export function UserProvider({ children }){
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const unsubscribe = onIdTokenChangedListener((user) => {
			console.log(`here ${user}`)
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = { currentUser, setCurrentUser, loading };
	return <UserContext.Provider value={ value }> { children } </UserContext.Provider>
};