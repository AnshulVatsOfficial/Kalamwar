import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DocumentMagnifyingGlassIcon, CurrencyDollarIcon, ArrowUpCircleIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Switch } from '@headlessui/react'
import AboutUsImage from '../assets/about-page-image-kalamwar.png';


const features = [
    {
      name: 'Earn Revenue',
      description:
        "You'll get paid 90% of total revenue that all your videos generated in last 28 days on Kalamwar's Official YouTube Channel and Facebook Page",
      icon: CurrencyDollarIcon,
    },
    {
      name: 'Get Discovered',
      description: "As there are rappers from different geographical locations, you'll get discovered to correct audience",
      icon: DocumentMagnifyingGlassIcon,
    },
    {
      name: 'Grow Together',
      description: "Kalamwar's motive is to grow together by generating a continuous flow of revenue for all rappers",
      icon: ArrowUpCircleIcon,
    },
  ];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Home = () => {
    return (
        <>
        {/* Hero Section */}
        <section id="hero-section">
        <div className="bg-white mb-0">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl pt-20 sm:py-32 lg:pt-32 lg:pb-0 mb-0">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl hero-text">
                        Join KalamWar and feel true essence of Rap.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                        A Digital Crew for Underground Rappers to Earn Revenue, Reach New Audience and Get Discovered...
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/login"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Get started <span aria-hidden="true">&rarr;</span>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        
        {/* About Section */}
        <section id="about-section">
        <div className="overflow-hidden bg-white lg:pt-32 sm:pt-0 pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <img
                    src={AboutUsImage}
                    alt="About Us"
                    className="sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    width={2432}
                    height={1442}
                />

                <div className="lg:pr-8">
                    <div className="lg:max-w-lg">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">About Us</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What's the Magic</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Kalamwar is a digital space for underground rappers where they can submit their Rap Songs and we'll upload their track on Kalamwar's Offcial YouTube Channel and Facebook Page !
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                        {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                            <dt className="inline font-semibold text-black">
                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                            {feature.name}
                            </dt>{' '}
                            <dd className="inline">{feature.description}</dd>
                        </div>
                        ))}
                    </dl>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section">
            <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                    Contact us and we'll reply you as soon as we can
                    </p>
                </div>
                <form action="#" method="POST" className="mx-auto mt-12 max-w-xl sm:mt-12">
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
                            autoComplete="email"
                            placeholder="Enter your email"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                        Phone Number
                        </label>
                        <div className="mt-2.5">
                        <input
                            type="tel"
                            name="phone-number"
                            id="phone-number"
                            autoComplete="tel"
                            maxLength="10"
                            placeholder="Enter your phone number"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                        Message
                        </label>
                        <div className="mt-2.5">
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            placeholder="Enter your message"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                        />
                        </div>
                    </div>
                    </div>
                    <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Let's talk
                    </button>
                    </div>
                </form>
            </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works-section">
            
        </section>
        </>
    );
}

export default Home;