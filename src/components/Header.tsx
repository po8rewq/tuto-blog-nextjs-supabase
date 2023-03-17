import useSignIn from '@/hooks/useSignIn';
import { useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import SignupModal from './SignupModal';

const Header = () => {
  const user = useUser();
  const [showModal, setShowModal] = useState(false);
  const { signOut } = useSignIn();
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <>
      <SignupModal show={showModal} handleClose={() => setShowModal(false)} />
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">My Supabase blog</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user ? (
              <Button variant="link" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button onClick={() => setShowModal(true)}>Login</Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
