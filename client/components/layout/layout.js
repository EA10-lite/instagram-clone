import React from 'react';
import { useRouter } from 'next/router';
import styles from './layout.module.css';

// components
import Header from '../header/Header';

// context
import UserContextProvider from '../../context/user';

export default function Layout({ children }){
    const { pathname } = useRouter();
    const auth_route = pathname === '/login' || pathname === '/signup' || pathname === '/reset-password';

    return (
        <>
            { !auth_route && (
                <UserContextProvider>
                    <div>
                        <div className={styles.layoutHeader}>
                            <Header />
                        </div>
                        <div className={styles.layoutMain}>
                            { children }
                        </div> 
                    </div>
                </UserContextProvider>
            )}
            { auth_route && (
                <div className={styles.layoutMain}>
                    { children }
                </div>
            )}
        </>
    )
}
