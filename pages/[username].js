import { useRouter } from 'next/router';
import Header from '../components/Header';
import { IoPersonCircle } from 'react-icons/io5';

const UserHome = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <Header />
      <main className="max-w-screen-md mx-auto">
        <section className="p-4 mb-4 flex flex-col gap-2 text-center
            md:flex-row md:justify-center md:items-center md:text-left md:mb-6">
          <div className="flex justify-center">
            <IoPersonCircle className="w-24 h-24 md:w-28 md:h-28"/>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-2xl">{username}</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, molestiae!
            </p>
          </div>
        </section>

        <div className="flex text-xl text-gray-700 text-center font-bold">
          <div className="py-2 w-1/2 text-blue-500 border-b-2 border-blue-500">포스트</div>
          <div className="py-2 w-1/2">소개</div>
        </div>
        <article className="divide-y-2">
          <article className="px-4 py-6 space-y-3">
            <h2 className="font-semibold text-2xl">Sample Blog Post Title...</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, atque eaque fuga fugiat fugit ipsam
              iure maiores molestiae nobis, odit officia porro quia sed? Deleniti eligendi non quidem reiciendis.
              Officia?
            </p>
            <div className="text-gray-500 text-sm">
              2 days ago &middot; 0개의 댓글
            </div>
          </article>
          <article className="px-4 py-6 space-y-3">
            <h2 className="font-semibold text-2xl">Sample Blog Post Title...</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, atque eaque fuga fugiat fugit ipsam
              iure maiores molestiae nobis, odit officia porro quia sed? Deleniti eligendi non quidem reiciendis.
              Officia?
            </p>
            <div className="text-gray-500 text-sm">
              2 days ago &middot; 0개의 댓글
            </div>
          </article>
        </article>
      </main>
    </>
  );
};

export default UserHome;
