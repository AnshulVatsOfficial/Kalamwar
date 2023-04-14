import React from 'react';
import { useToast } from '@chakra-ui/react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyAthGH887jVfq1cynOlwZHb4vCvgWui0Kw",
    authDomain: "kalamwar-3d7e4.firebaseapp.com",
    projectId: "kalamwar-3d7e4",
    storageBucket: "kalamwar-3d7e4.appspot.com",
    messagingSenderId: "690053929167",
    appId: "1:690053929167:web:e8e180b9b92e7b2a48bfba"
  };

const SubmitVideo = () => {

    const [videoTitle, setVideoTitle] = React.useState("");
    const [videoTitleLength, setVideoTitleLength] = React.useState(100);

    const [artistName, setArtistName] = React.useState("");
    const [artistNameLength, setArtistNameLength] = React.useState(50);

    const [videoDesc, setVideoDesc] = React.useState("");
    const [videoDescLength, setVideoDescLength] = React.useState(5000);

    const [instaAccount, setInstaAccount] = React.useState("");
    const [youtubeAccount, setYoutubeAccount] = React.useState("");

    const [videoThumbnail, setVideoThumbnail] = React.useState({});
    const [isThumbnailAttached, setIsThumbnailAttached] = React.useState(false);
    const [videoThumbnailPreview, setVideoThumbnailPreview] = React.useState("");
    const [thumbnailUrl, setThumbnailUrl] = React.useState("");
    const [thumbnailName, setThumbnailName] = React.useState("");//setting name of thumbnail same as video title
    const [isMetadataUploaded, setIsMetadataUploaded] = React.useState(false);

    const [videoFile, setVideoFile] = React.useState({});
    const [isVideoAttached, setIsVideoAttached] = React.useState(false);
    // const [videoFilePreview, setVideoFilePreview] = React.useState("");

    const [userId, setUserId] = React.useState("");
    const [userDisplayName, setUserDisplayName] = React.useState("");

    // const videoRef = React.useRef();
    // React.useEffect(() => {
    //     videoRef.current?.load();
    //   }, [videoFilePreview]);

    const toast = useToast();//using Chakra UI Toast

    const app = initializeApp(firebaseConfig);//initializing firebase
    const storage = getStorage(app);//taking reference of firebase storage
    const database = getFirestore(app);//taking reference of firestore database

    // const thumbnailMetaData = {//metadata for blog poster being uploaded to Firebase Storage
    //     contentType: '/*'
    // }

    // const auth = getAuth();//getting user uid even after refresh so that page content gets displayed even after refreshing it
    // onAuthStateChanged(auth, (user) => {
    //     if(user){
    //         const uid = user.uid;
    //         const userName = user.displayName;
    //         setUserDisplayName(userName);
    //         setUserId(uid);
    //     }
    //     else{
    //         console.log("Error gettting UID");
    //     }
    // });

    //creating reference to store video's metadata in a collection named "Videos" in Firestore Database
    const videoCollectionRef = collection(database, "Videos");

    const videoMetadata = {//metadata for each video
        title: videoTitle,
        description: videoDesc,
        artist: artistName,
        artistInstaId: instaAccount,
        artistYouTubeChannel: youtubeAccount
    }

    //uploading video thumbnail to Firebase Storage
    const uploadMetadata = async (event) => {
        event.preventDefault();
        if(videoTitle.length == 0){
            toast({
                title: "Please enter video title !",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
        }

        else if(artistName.length == 0){
            toast({
                title: "Please enter artist name !",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
        }

        else if(videoDesc.length == 0){
            toast({
                title: "Please enter video description !",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
        }

        else{
            await addDoc(videoCollectionRef, videoMetadata)
            .then((resolve)=>{
                setIsMetadataUploaded(true);
                console.log(resolve);
                toast({
                    title: 'Metadata posted successfully !',
                    description: "",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error)=>{
                console.log(error);
            });
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2500);
        }
        }

        function guardarArchivo(e) {
            setVideoFile(e.target.files[0]);
            setIsVideoAttached(true);
            // var file = e.target.files[0] //the file
            var reader = new FileReader() //this for convert to Base64 
            reader.readAsDataURL(e.target.files[0]) //start conversion...
            reader.onload = function (e) { //.. once finished..
              var rawLog = reader.result.split(',')[1]; //extract only thee file data part
              var dataSend = { dataReq: { data: rawLog, name: videoFile.name, type: videoFile.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
              fetch('https://script.google.com/macros/s/AKfycbwcLqrESmi7j6BKp9ARYUt682wwkOZC8EJC7LpVuQLgRWdaoQw/exec', //your AppsScript URL
                { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
                .then(res => res.json()).then((a) => {
                  console.log(a) //See response
                }).catch(e => console.log(e)) // Or Error in console
            }
          }

    return (
        <section id="contact-section">
            <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Submit Your Video</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                    Submit your video to KalamWar at ZERO Cost
                    </p>
                </div>
                <form className="mx-auto mt-12 max-w-xl sm:mt-12">
                    {
                        isMetadataUploaded
                        ?
                        <div className="sm:col-span-2">
                            <label htmlFor="video-file" className="block text-sm font-semibold leading-6 text-gray-900">
                            Upload Video *
                            </label>
                            <div className="mt-2.5">
                                <Link
                                    id="video-file"
                                    target='_blank'
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >Upload Video to Drive</Link>
                            </div>
                        </div>
                        :
                        <>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                        {/* Video Title */}
                        <div className="">
                            <label htmlFor="video-title" className="block text-sm font-semibold leading-6 text-gray-900">Video Title *</label>           
                            <div className="mt-2.5">
                            <input
                                type="text"
                                name="video-title"
                                id="video-title"
                                autoComplete="videoTitle"
                                placeholder="Enter your video title"
                                maxLength={100}
                                value={videoTitle}
                                onChange={(event)=>{
                                    setVideoTitle(event.target.value);
                                    setVideoTitleLength(100 - event.target.value.length);
                                    setThumbnailName(event.target.value);
                                    if(100 - event.target.value.length === 0){
                                        toast({
                                            title: "You've reached maximum title length",
                                            description: "Title should be maximum of 100 characters",
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

                        {/* Video Description */}
                        <div className="">
                            <label htmlFor="video-desc" className="block text-sm font-semibold leading-6 text-gray-900">
                            Artist Name *
                            </label>
                            <div className="mt-2.5">
                            <input
                                type="text"
                                name="artist-name"
                                id="artist-name"
                                autoComplete="artistName"
                                placeholder="Enter artist name"
                                maxLength={50}
                                value={artistName}
                                onChange={(event)=>{
                                    setArtistName(event.target.value);
                                    setArtistNameLength(50 - event.target.value.length);
                                    if(50 - event.target.value.length === 0){
                                        toast({
                                            title: "You've reached maximum length for artist name",
                                            description: "Artist Name should be maximum of 50 characters",
                                            status: 'error',
                                            duration: 2000,
                                            isClosable: true,
                                            position: 'top',
                                        });
                                    }
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p>{artistNameLength} characters left</p>
                            </div>
                        </div>

                        {/* Artist's Instagram Account*/}
                        <div className="">
                            <label htmlFor="insta-account" className="block text-sm font-semibold leading-6 text-gray-900">
                            Your Instagram Account Link (optional)
                            </label>
                            <div className="mt-2.5">
                            <input
                                type="url"
                                name="insta-account"
                                id="insta-account"
                                autoComplete="instagramAccount"
                                placeholder="Enter your instagram account link"
                                onChange={(event)=>{
                                    setInstaAccount(event.target.value);
                                }}
                                value={instaAccount}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>

                        {/* Artist's YouTube Channel */}
                        <div className="">
                            <label htmlFor="youtube-channel" className="block text-sm font-semibold leading-6 text-gray-900">
                            Your YouTube Channel Link (optional)
                            </label>
                            <div className="mt-2.5">
                            <input
                                type="url"
                                name="youtube-channel"
                                id="youtube-channel"
                                autoComplete="youtubeChannel"
                                placeholder="Enter your YouTube channel link"
                                maxLength={5000}
                                onChange={(event)=>{guardarArchivo(event)}}
                                value={youtubeAccount}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>

                        {/* Video Thumbnail */}
                        <div className="sm:col-span-2">
                            <label htmlFor="video-thumbnail" className="block text-sm font-semibold leading-6 text-gray-900">
                            Upload Video *
                            </label>
                            <div className="mt-2.5">
                            <input
                                type="file"
                                name="video-thumbnail"
                                id="video-thumbnail"
                                accept="video/*"
                                onChange={(event)=>{
                                    setVideoFile(event.target.files[0]);
                                    setIsVideoAttached(true);
                                    // setVideoThumbnailPreview(URL.createObjectURL(event.target.files[0]));
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>

                        {/* Preview Video Thumbnail */}
                        {/* {
                            isThumbnailAttached
                            ?
                            <div className="sm:col-span-2">
                                <label htmlFor="video-thumbnail" className="block text-sm font-semibold leading-6 text-gray-900">Thumbnail Preview</label>
                                <img
                                    src={videoThumbnailPreview}
                                    className="sm:w-[57rem] md:-ml-4 lg:-ml-0"
                                    width={1280}
                                    height={720}
                                />
                            </div>
                            :
                            <></>
                        } */}

                        {/* Video file */}
                        {/* <div className="sm:col-span-2">
                            <label htmlFor="video-file" className="block text-sm font-semibold leading-6 text-gray-900">
                            Upload Video *
                            </label>
                            <div className="mt-2.5">
                            <Link
                                id="video-file"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >Upload Video to Drive</Link>
                            </div>
                        </div> */}

                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Video Description *
                            </label>
                            <div className="mt-2.5">
                            <textarea
                                name="video-desc"
                                id="video-desc"
                                rows={4}
                                maxLength={5000}
                                value={videoDesc}
                                onChange={(event)=>{
                                    setVideoDesc(event.target.value);
                                    setVideoDescLength(5000 - event.target.value.length);
                                    if(5000 - event.target.value.length === 0){
                                        toast({
                                            title: "You've reached maximum desc. length",
                                            description: "Desc. should be maximum of 5000 characters",
                                            status: 'error',
                                            duration: 2000,
                                            isClosable: true,
                                            position: 'top',
                                        });
                                    }
                                }}
                                placeholder="Enter video description"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                            <p>{videoDescLength} characters left</p>
                        </div>

                        </div>
                        <div className="mt-10">
                        <button
                            type="submit"
                            onClick={uploadMetadata}
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Upload Metadata
                        </button>
                        </div>
                        </>
                    }
                </form>
            </div>
        </section>
    );
}

export default SubmitVideo;
