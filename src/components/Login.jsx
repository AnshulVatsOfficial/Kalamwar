import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPageImage from '../assets/login-page-image.jpg';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from '@chakra-ui/react';

const firebaseConfig = {
  apiKey: "AIzaSyAthGH887jVfq1cynOlwZHb4vCvgWui0Kw",
  authDomain: "kalamwar-3d7e4.firebaseapp.com",
  projectId: "kalamwar-3d7e4",
  storageBucket: "kalamwar-3d7e4.appspot.com",
  messagingSenderId: "690053929167",
  appId: "1:690053929167:web:e8e180b9b92e7b2a48bfba"
};

const Login = () => {

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    let navigate = useNavigate();
    const toast = useToast();//using Chakra UI Toast

    // localStorage.setItem("isAccountCreated", false);
    // localStorage.setItem("isSignedIn", false);
    // localStorage.setItem("isSignedInWithGoogle", false);

        //create new account
        const createNewAccount = (event) => {
            event.preventDefault();
            if(userFirstName != "" && userLastName != "" && userEmail != "" && userPassword != ""){
                createUserWithEmailAndPassword(auth, userEmail, userPassword)
                .then((userCredential) => {
                    localStorage.setItem("isAccountCreated", true);
                    localStorage.setItem("isSignedIn", false);
                    localStorage.setItem("isSignedInWithGoogle", false);
                    const user = userCredential.user;
                    console.log(user);
                    toast({
                        title: 'Account created Successfully !',
                        description: "We've created an account for you.",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: 'top-right',
                    });
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);        
                    toast({
                        title: 'Error Creating Account !',
                        description: "Please try again.",
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: 'top-right',
                    });
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
            }
            else{
                alert("Please enter all details !");
            }
        }

        //allowing user to sign in with his email and password if already has a account
        const allowUserSignIn = (event) =>{
            event.preventDefault();
            if(localStorage.getItem("isSignedInWithGoogle") === "false"){//If user is not already signed in with Google
                signInWithEmailAndPassword(auth, userEmail, userPassword)
                .then((userCredential) => {
                    localStorage.setItem("isSignedInWithGoogle", true);
                    localStorage.setItem("isSignedIn", true);
                    toast({
                        title: 'Signin Successful !',
                        description: "You're signed in into BlackInk",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',
                    });
                    console.log(userCredential.user.auth);
                    setTimeout(() => {
                        navigate("/");
                        window.location.reload();
                    }, 3000);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("Invalid Username or Password !");
                });
            }
            else{//If user is already signed in with Google
                toast({
                    title: "You're already signed in !",
                    description: "You're already signed in into BlackInk",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                });
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 3000);
            }
        }

    return (
        <section id="login-section">
            <div className="overflow-hidden bg-white lg:pt-12 sm:pt-0 pt-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <img
                    src={LoginPageImage}
                    alt="About Us"
                    className="sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    width={2432}
                    height={1442}
                />
                <div className="isolate bg-white px-6 py-0 sm:py-0 md:py-0 lg:py-16 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Account/Login</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                        Create a new account or Login with existing account
                        </p>
                    </div>
                {
                    localStorage.getItem("isAccountCreated") == "true"
                    ?
                    <form className="mx-auto mt-8 max-w-xl sm:mt-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                        Email
                        </label>
                        <div className="mt-2.5">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userEmail} onChange={(event)=>{setUserEmail(event.target.value)}}
                            autoComplete="email"
                            placeholder="Enter your email"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                        Password
                        </label>
                        <div className="mt-2.5">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={userPassword} onChange={(event)=>{setUserPassword(event.target.value)}}
                            autoComplete="password"
                            placeholder="Create your password"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    </div>
                    <div className="mt-5 flex lg:flex-row md:flex-col sm:flex-col flex-col">
                    <button
                        type="submit"
                        onClick={allowUserSignIn}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 lg:mr-2 lg:my-0 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Log in Now
                    </button>
                    </div>
                </form>
                :
                <form className="mx-auto mt-8 max-w-xl sm:mt-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                        First name
                        </label>
                        <div className="mt-2.5">
                        <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            value={userFirstName} onChange={(event)=>{setUserFirstName(event.target.value)}}
                            autoComplete="given-name"
                            placeholder="Enter your first name"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                        Last name
                        </label>
                        <div className="mt-2.5">
                        <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            value={userLastName} onChange={(event)=>{setUserLastName(event.target.value)}}
                            autoComplete="family-name"
                            placeholder="Enter your last name"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                        Email
                        </label>
                        <div className="mt-2.5">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userEmail} onChange={(event)=>{setUserEmail(event.target.value)}}
                            autoComplete="email"
                            placeholder="Enter your email"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                        Password
                        </label>
                        <div className="mt-2.5">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={userPassword} onChange={(event)=>{setUserPassword(event.target.value)}}
                            autoComplete="password"
                            placeholder="Create your password"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    </div>
                    <div className="mt-5 flex lg:flex-row md:flex-col sm:flex-col flex-col">
                    <button
                        type="submit"
                        onClick={createNewAccount}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 lg:mr-2 lg:my-0 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create Account
                    </button>
                    </div>
                </form>
                }
                </div>
                </div>
            </div>
        </div>
        </section>
    );
}

export default Login;
