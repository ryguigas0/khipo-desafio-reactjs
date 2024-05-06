import { Modal, Form, InputGroup, FloatingLabel, Button } from 'react-bootstrap'
import LoginFormFooter from './LoginFormFooter'
import LoginFormInputs from './LoginFormInputs'

export default function LoginModal({ createUser, changePassword }) {
    return (<>
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <LoginFormInputs createUser={createUser} changePassword={changePassword} />
                </Modal.Body>
                <LoginFormFooter createUser={createUser} changePassword={changePassword} />
            </Form>
        </Modal.Dialog>
    </>)
}