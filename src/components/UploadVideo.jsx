import * as React from 'react';
import { useToast } from '@chakra-ui/react';

const UploadVideo = () => {
    const [videoTitle, setVideoTitle] = React.useState("");
    const [videoTitleLength, setVideoTitleLength] = React.useState(100);

    const toast = useToast();//using Chakra UI Toast

    return (
        <section id="contact-section">
            <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Submit Your Video</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                    Submit your video to KalamWar at ZERO Cost
                    </p>
                </div>
                <form action="#" className="mx-auto mt-12 max-w-xl sm:mt-12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">Video Title</label>
                        <div className="mt-2.5">
                        <input
                            type="text"
                            name="video-title"
                            id="video-title"
                            autoComplete="given-name"
                            placeholder="Enter your video title"
                            maxLength={100}
                            onChange={(event)=>{
                                setVideoTitle(event.target.value);
                                setVideoTitleLength(100 - event.target.value.length);
                                if(100 - event.target.value.length == 0){
                                    toast({
                                        title: "You've reached maximum title length",
                                        description: "Title should be within 100 characters",
                                        status: 'error',
                                        duration: 2000,
                                        isClosable: true,
                                        position: 'top',
                                    });
                                }
                            }}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p>{videoTitleLength} characters left</p>
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
    );
}

export default UploadVideo;
