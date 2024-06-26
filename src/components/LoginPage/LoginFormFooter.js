import { Modal, Button } from "react-bootstrap"

export default function LoginFormFooter({ createUser, changePassword }) {
    if (createUser) {
        return <Modal.Footer className='flex flex-column justify-content-center'>
            <Button variant="primary" type="submit">Create account</Button>
            <div className="flex flex-row justify-content-center modal-footer">
                <Button variant="secondary" href='/'>Back to login</Button>
            </div>
        </Modal.Footer>
    } else if (changePassword) {
        return <Modal.Footer className='flex flex-column justify-content-center'>
            <Button variant="primary" type="submit">Change password</Button>
            <div className="flex flex-row justify-content-center modal-footer">
                <Button variant="secondary" href='/'>Back to login</Button>
            </div>
        </Modal.Footer>
    } else {
        return <Modal.Footer className='flex flex-column justify-content-center'>
            <Button variant="primary" type="submit">Login</Button>
            <div className="flex flex-row justify-content-center modal-footer">
                <Button variant="secondary" href='/new-user'>Create account</Button>
                <Button variant="secondary" href='/change-password'>Change password</Button>
            </div>
        </Modal.Footer>
    }
}