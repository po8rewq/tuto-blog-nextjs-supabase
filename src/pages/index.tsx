import Header from '@/components/Header';
import PostList from '@/components/PostList';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Posts list</title>
        <meta name="description" content="Blog made with NextJs and Supabase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <PostList />
      </main>
    </>
  );
};

export default Home;
