import { Post } from '@/types/Post';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

type Props = {
  post?: Post;
  saveForm: (title: string, body: string) => Promise<void>;
};
const PostEditForm = ({ saveForm, post }: Props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveForm(title, body);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          placeholder="Your post title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Content:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={body}
          onChange={({ target }) => setBody(target.value)}
        />
      </Form.Group>
      <Button type="submit">{post ? 'Update' : 'Create'}</Button>
    </Form>
  );
};

export default PostEditForm;
