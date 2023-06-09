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
    { name: 'Submit Video', to: "/submitvideo" },
    { name: 'Analytics', to: "/analytics" },
    { name: 'Crew Members', to: "/crewmembers" },
  ];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const app = initializeApp(firebaseConfig);//initializing firebase
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    let navigate = useNavigate();//using navigate to navigate to other page on refresh
    const toast = useToast();//using Chakra UI Toast
    
    //Login in directly with google
    const loginWithGoogle = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
            localStorage.setItem("isSignedIn", true);
            localStorage.setItem("isSignedInWithGoogle", true);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            toast({
                title: 'Signin Successful !',
                description: "You're signed in into KalamWar",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
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

    const SignOutOfAccount = () => {
        signOut(auth).
        then(()=>{
            localStorage.setItem("isSignedIn", false);
            localStorage.setItem("isSignedInWithGoogle", false);
            toast({
                title: 'Signout Successful !',
                description: "You're signed out of KalamWar",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 2500);
        });
    }

    
    let navBar = document.querySelectorAll('.nav-link');
    let navCollapse = document.querySelector('.navbar-collapse.collapse');

    navBar.forEach(function(link){
        link.addEventListener("click", function(){
            navCollapse.classList.remove("show");
        });
    });
    // const handleCrewMembersAction = () => {
    //     toast({
    //         title: 'Will be available soon...',
    //         description: '',
    //         status: 'warning',
    //         duration: 2000,
    //         isClosable: true,
    //         position: 'top',
    //     });
    // }

    return (
        <section id="navbar">
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8 my_navbar" aria-label="Global">
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
                    <Link key="Home" to="/" className='text-black hover:bg-blue-600 hover:text-white font-bold rounded-md px-2 py-2 text-sm'>Home</Link>

                    {
                        localStorage.getItem("isAccountCreated") == "true" && localStorage.getItem("isSignedIn") == "true"
                        ?
                        <>
                            <Link key="submit Video" to="/submitvideo" className='text-black hover:bg-blue-600 hover:text-white font-bold rounded-md px-2 py-2 text-sm'>Submit Video</Link>
                            {/* <Link key="Profile" to="/analytics" className='text-black hover:bg-blue-600 hover:text-white font-bold rounded-md px-2 py-2 text-sm'>Profile</Link> */}
                        </>
                        :
                        <></>
                    }

                    <Link key="Crew Members" to="/crewmembers" className='text-black hover:bg-blue-600 hover:text-white font-bold rounded-md px-2 py-2 text-sm'>Crew Members</Link>
                </div>
                {
                    localStorage.getItem("isAccountCreated") == "true"
                    ?
                    localStorage.getItem("isSignedIn") == "true"
                    ?
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link onClick={SignOutOfAccount} className="leading-6 rounded-md bg-indigo-600 px-3 py-2 lg:mx-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign Out
                        </Link>
                    </div>
                    :
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link to="/login" className="leading-6 rounded-md bg-indigo-600 px-3 py-2 lg:mx-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Log In Now
                        </Link>

                        <Link onClick={loginWithGoogle} className="leading-6 rounded-md bg-indigo-600 px-3 py-2 lg:mx-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Log in with google
                        </Link>
                    </div>
                    :
                    <>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link to="/login" className="leading-6 rounded-md bg-indigo-600 px-3 py-2 lg:mx-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Create Account
                        </Link>

                        <Link onClick={loginWithGoogle} className="leading-6 rounded-md bg-indigo-600 px-3 py-2 lg:mx-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Log in with google
                        </Link>
                    </div>
                    </>
                }
                </nav>

                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50 collapse navbar-collapse"/>
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                    <Link to="/" className="-m-1.5 p-1.5 text-xl font-bold brand-logo nav-link">
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
                            <Link
                            key="Home"
                            to="/"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 nav-linkzzzzzz"
                            >
                            Home
                            </Link>
                            {
                                localStorage.getItem("isAccountCreated") == "true" && localStorage.getItem("isSignedIn") == "true"
                                ?
                                <Link
                                    key="submitVideo"
                                    to="/submitvideo"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 nav-link"
                                    >
                                    Submit Video
                                </Link>
                                :
                                <></>
                            }

                            {/* {
                                localStorage.getItem("isAccountCreated") == "true" && localStorage.getItem("isSignedIn") == "true"
                                ?
                                <Link
                                    key="Profile"
                                    to="/analytics"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                    Profile
                                </Link>
                                :
                                <></>
                            } */}

                            <Link
                            key="CrewMembers"
                            to="/crewmembers"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 nav-link"
                            >
                            Crew Members
                            </Link>
                        </div>

                        {
                            localStorage.getItem("isSignedInWithGoogle") == "true" || localStorage.getItem("isSignedIn") == "true"
                            ?
                            <div className="py-6">
                                <Link
                                    to="/login"
                                    onClick={SignOutOfAccount}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 nav-link"
                                >
                                    Sign Out
                                </Link>
                            </div>
                            :
                            <>
                            <div className="py-6">
                                <Link
                                    to="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 nav-link"
                                >
                                    Create Account
                                </Link>
                            </div>

                            <div className="py-6">
                            <Link
                                to="/login"
                                onClick={loginWithGoogle}
                                className="-mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 nav-link"
                            >
                                Log in with google
                            </Link>
                            </div>
                            </>
                        }          
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
