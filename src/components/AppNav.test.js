import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AppNav from './AppNav';

describe('AppNav test', () => {

    it('renders AppNav component', () => {
        const userData = { isLogged: false, };

        render(
            <BrowserRouter>
                <AppNav userData={userData} />
            </BrowserRouter>
        );
        const appNavContainer = screen.getByTestId('appNav');
        expect(appNavContainer).toBeInTheDocument();
    });
    
    it('renders Home and logout links for logged user', () => {
        const userData = { isLogged: true, };

        render(
            <BrowserRouter>
                <AppNav userData={userData} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('home')).toBeInTheDocument();
        expect(screen.getByText('logout')).toBeInTheDocument();
    });

    it('doesn\'t render Signup and Login links for logged user', () => {
        const userData = { isLogged: true, };

        render(
            <BrowserRouter>
                <AppNav userData={userData} />
            </BrowserRouter>
        );
        
        expect(screen.getByTestId('appNav').querySelector('login')).not.toBeInTheDocument();
        expect(screen.getByTestId('appNav').querySelector('singup')).not.toBeInTheDocument();
    });

    it('renders Home, Singup and Login links for unlogged user', () => {
        const userData = { isLogged: false, };

        render(
            <BrowserRouter>
                <AppNav userData={userData} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('home')).toBeInTheDocument();
        expect(screen.getByText('signup')).toBeInTheDocument();
        expect(screen.getByText('login')).toBeInTheDocument();
    });

    it('doesn\'t render logout link for unlogged user', () => {
        const userData = { isLogged: false, };

        render(
            <BrowserRouter>
                <AppNav userData={userData} />
            </BrowserRouter>
        );
        
        expect(screen.getByTestId('appNav').querySelector('logout')).not.toBeInTheDocument();
    });

});
