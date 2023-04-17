import React from 'react';
import { Link } from 'react-router-dom';

const CrewMembers = () => {

    const posts = [
        {
          id: 1,
          title: 'Kamlesh Banna',
          description:
            'He is an Indian Rapper and Lyricist. His Rap Songs revolve around his personality and struggles of a middle-class boy.',
          category: {
            title: 'Rapper',
            },
          author: {
            // role: 'Rapper/Lyricist',
            imageUrl: '',
            },
          youtubeChannel: 'https://www.youtube.com/@kamleshbannarecords',
          instagramHandle: ''
        },
        {
            id: 2,
            title: 'MC VENOM',
            description:
              'A Rapper with Hard Hitting Lyrics and Flow. He has spit some real facts about society in his latest release.',
            category: {
              title: 'Rapper',
              },
            author: {
              // role: 'Rapper/Lyricist',
              imageUrl: '',
              },
            youtubeChannel: 'https://youtube.com/@mcvenom2571',
            instagramHandle: 'https://instagram.com/_mc_venom_47?igshid=MTIzZWQxMDU='
          },
          {
            id: 3,
            title: 'HaKeR',
            description:
              'An Indian Rapper and Lyricist. He in his recent track, talked about Love and Promises...',
            category: {
              title: 'Rapper',
              },
            author: {
              // role: 'Rapper/Lyricist',
              imageUrl: '',
              },
            youtubeChannel: '',
            instagramHandle: ''
          },
    ];

    return (
        <section id="crew-members">
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col justify-center items-center">

                    <div className="mx-auto max-w-2xl lg:mx-0 flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Meet Kalam-Warriors</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600 text-center">RAP is more than music, it's a lifestyle !</p>
                    </div>

                    <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-8 sm:mt-8 sm:pt-8 md:mt-8 md:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between lg:py-8 md:py-8 sm:py-8 py-4 border-0 px-2 shadow-xl">
                        <div className="flex items-center gap-x-4 text-xs artist-title">
                            <Link className="relative z-10 rounded-full bg-gray-50 lg:mx-0 px-3 py-1.5 font-medium">
                                {post.category.title}
                            </Link>
                        </div>

                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                <Link>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                        </div>

                        <div className="relative mt-4 flex flex-row items-center lg:gap-x-6 gap-x-3 justify-center social-profile-and-btn">
                            <p className="h-10 w-10 rounded-full artist-logo text-center flex justify-center items-center text-2xl lg:mt-0 md:mt-0 sm:mt-0 mt-2">{post.title.substring(0,1)}</p>
                            {/* <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" /> */}
                            <div className="leading-6 flex justify-center items-center social-btn lg:mt-0 md:mt-0 sm:mt-0 mt-2">
                                <button
                                    className="yt-btn block lg:w-full md:w-full w-full rounded-md bg-red-100 mx-1 px-3 py-2.5 md:my-2 my-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                    <Link to={post.youtubeChannel} className="mt-2" target='_blank'>YouTube &nbsp;<i className="fa-brands fa-youtube"></i></Link>
                                </button>
                            </div>

                            <div className="leading-6 flex justify-center items-center social-btn lg:mt-0 md:mt-0 sm:mt-0 mt-2">
                                <button
                                    className="insta-btn block lg:w-full md:w-full w-full rounded-md bg-pink-100 mx-1 px-3 py-2.5 md:my-2 my-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
                                    <Link to={post.instagramHandle} className="mt-2" target='_blank'>Instagram &nbsp;<i className="fa-brands fa-instagram"></i></Link>
                                </button>
                            </div>
                        </div>
                        </article>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CrewMembers;
