import { signOutUser } from '../../../services/Firebase/firebaseService';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../reducers/userSlice';


const Header = () => {
		const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            await signOutUser();
						dispatch(setCurrentUser(null));
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <header className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Activity Tracker</h1>
                <Button 
                    onClick={ handleSignOut } 
                    variant="secondary"
                >
                    Sign Out
                </Button>
            </div>
        </header>
    );
};

export default Header; 