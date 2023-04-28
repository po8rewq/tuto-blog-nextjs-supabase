import useGetPosts from '@/hooks/usePosts';
import { useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import PostCard from './PostCard';
import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PostList = () => {
  const { getPosts, posts, loading } = useGetPosts();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const renderContent = () => {
    if (!posts.length) return <p>No posts yet</p>;
    return (
      <Row xs={1} md={2} className="g-4">
        {posts.map((post) => (
          <Col key={post.id}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container>
      <Stack direction="horizontal" gap={3}>
        <h1>Latest posts</h1>
        <Link href={`/posts/new`} legacyBehavior>
          <Button size="sm">+ new post</Button>
        </Link>
      </Stack>
      {loading ? <p>Loading...</p> : renderContent()}
    </Container>
  );
};

export default PostList;
