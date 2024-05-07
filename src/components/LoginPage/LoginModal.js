import { Modal } from 'react-bootstrap'
import LoginForm from './LoginForm'

export default function LoginModal({ createUser, changePassword }) {
    return (<>
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <LoginForm
                createUser={createUser}
                changePassword={changePassword} />
        </Modal.Dialog>
    </>)
}