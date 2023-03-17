import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import useSignIn from '@/hooks/useSignIn';
import { FormEvent, useState } from 'react';

type Props = {
  show?: boolean;
  handleClose: () => void;
};
const SignupModal = ({ show = false, handleClose }: Props) => {
  const { signInWithEmail } = useSignIn();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    type: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email);
      setAlertMessage({ type: 'success', message: 'Please check your emails' });
    } catch (error: any) {
      setAlertMessage({ type: 'danger', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Card body>
        {alertMessage && (
          <Alert variant={alertMessage.type}>{alertMessage.message}</Alert>
        )}
        <Form id="login" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formLoginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </Button>
        </Form>
      </Card>
    </Modal>
  );
};

export default SignupModal;
