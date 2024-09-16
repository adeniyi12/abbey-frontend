import { Link } from "react-router-dom";
import Header from "../components/Header";
import Search from "../components/Search";
import { getFeeds } from "../api/services/feed";


export default function Feed() {
    const { data: posts, isLoading, error } = getFeeds();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error</div>;
    }

  return (
    <>
      <Header />
      <div className="bg-white py-24 sm:py-32 text-left">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Vibe Up</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Get Advice, Share Knowledge and Connect.</p>
            <Search />
            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
              {posts.map((post: any) => (
                <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img alt="" src={post?.imageUrl} className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post?.created_at} className="text-gray-500">
                        {post.date}
                      </time>
                      <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {post?.category}
                      </a>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href="#">
                          <span className="absolute inset-0" />
                          {post?.title}
                        </a>
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600">{post?.description}</p>
                    </div>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        <img alt="" src={post.user_profile_picture} className="h-10 w-10 rounded-full bg-gray-50" />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            <Link to={`/relationships/user/${post.user_id}`}>
                              <span className="absolute inset-0" />
                              {post?.user_first_name + " " + post?.user_last_name}
                            </Link>
                          </p>
                          <p className="text-gray-600">{post?.user_location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
