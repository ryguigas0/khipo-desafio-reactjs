import { Container, Row, Col } from "react-bootstrap";

export default function TasksKanban(props) {
    return <div className='loginContainer'>
        <Container className='p-4'>
            <Row>
                <Col>
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'initial' }}
                    >
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada diam ac ante egestas ullamcorper. Praesent egestas condimentum orci eget elementum. Maecenas ex turpis, ullamcorper a mollis vitae, auctor non massa. Pellentesque tincidunt elit non orci pulvinar, vel ultrices est malesuada. Duis justo tortor, gravida nec sollicitudin sed, blandit id tellus. Vestibulum vitae mollis lacus, tempor viverra tortor. Nunc turpis nisl, dignissim eu libero sit amet, dapibus hendrerit libero. Duis eleifend massa sapien, sit amet ullamcorper dui pharetra eu. Aliquam rutrum libero non nisi ultrices ultrices. Curabitur sit amet est eget est interdum fringilla.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
}