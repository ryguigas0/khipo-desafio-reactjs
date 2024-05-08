
import { Container, Row, Col } from 'react-bootstrap'

import LoginModal from './LoginModal'

export default function LoginPage({ createUser, changePassword }) {
    return (
        <div style={{
            height: "100vh",
            width: "100%",
            display: "grid",
            "place-items": "center"
        }}>
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
        </div >
    )
}