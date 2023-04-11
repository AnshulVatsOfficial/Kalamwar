import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useToast } from '@chakra-ui/react';

const firebaseConfig = {
    apiKey: "AIzaSyAthGH887jVfq1cynOlwZHb4vCvgWui0Kw",
    authDomain: "kalamwar-3d7e4.firebaseapp.com",
    projectId: "kalamwar-3d7e4",
    storageBucket: "kalamwar-3d7e4.appspot.com",
    messagingSenderId: "690053929167",
    appId: "1:690053929167:web:e8e180b9b92e7b2a48bfba"
  };

const navigation = [
    { name: 'Home', to: "/" },
    { name: 'Upload Video', to: "/uploadvideo" },
    { name: 'Analytics', to: "/analytics" },
    { name: 'Crew Members', to: "/crewmembers" },
  ];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    let navigate = useNavigate();
    const toast = useToast();//using Chakra UI Toast
    
    //Login in directly with google
    const loginWithGoogle = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            toast({
                title: 'Signin Successful !',
                description: "You're signed in into Kalamwar",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            });
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 3000);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage);
        });
    }

    return (
        <section id="navbar">
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5 text-xl font-bold brand-logo">
                    KALAMWAR
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                    >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                    <Link key={item.name} to={item.to} className={classNames(
                        item.current ? 'bg-white text-black font-bold' : 'text-black hover:bg-blue-600 hover:text-white font-bold',
                        'rounded-md px-2 py-2 text-sm font-medium'
                      )}>
                        {item.name}
                    </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link to="/login" className="leading-6 rounded-md bg-indigo-600 px-3 py-2 lg:mx-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Create Account
                    </Link>

                    <Link onClick={loginWithGoogle} className="leading-6 rounded-md bg-indigo-600 px-3 py-2 lg:mx-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Log in with google
                    </Link>
                </div>             
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                    <Link to="#" className="-m-1.5 p-1.5 text-xl font-bold">
                        KALAMWAR
                    </Link>
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </div>
                    <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                            <Link
                            key={item.name}
                            to={item.to}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                            {item.name}
                            </Link>
                        ))}
                        </div>
                        <div className="py-6">
                        <Link
                            to="/login"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create Account
                        </Link>
                        </div>
                        <div className="py-6">
                        <Link
                            to="/login"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Log in with google
                        </Link>
                        </div>
                    </div>
                    </div>
                </Dialog.Panel>
                </Dialog>
            </header>
        </div>
        </section>
    );
}

export default Navbar;
