
import { Container, Row, Col} from 'react-bootstrap'

import './LoginPage.css'
import LoginModal from '../../components/LoginPage/LoginModal'

export default function LoginPage({ createUser, changePassword }) {
    return (
        <div className='loginContainer'>
            <Container className='p-4'>
                <Row>
                    <Col>
                        <div
                            className="modal show"
                            style={{ display: 'block', position: 'initial' }}
                        >
                            <LoginModal changePassword={changePassword} createUser={createUser} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}