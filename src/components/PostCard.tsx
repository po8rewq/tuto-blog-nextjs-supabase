import { Post } from '@/types/Post';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

type Props = {
  post: Post;
};
const PostCard = ({ post }: Props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          <span
            className="d-inline-block text-truncate"
            style={{ width: '100%' }}
          >
            {post.body}
          </span>
        </Card.Text>
        <Link href={`/posts/${post.id}`} legacyBehavior>
          <Button variant="link">Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
