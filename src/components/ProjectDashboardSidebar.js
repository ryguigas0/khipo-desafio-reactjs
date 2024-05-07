import { Navbar, Nav, Container, Offcanvas, NavDropdown, Form, Button } from 'react-bootstrap'
import ProjectList from './ProjectDashboard/Sidebar/ProjectList'
import { useState } from 'react'
import { ArrowRight, DoorOpenFill, PencilSquare, Plus } from 'react-bootstrap-icons';

export default function ProjectDashboardSidebar({ username }) {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateProject = () => {
        console.log("create projhect")
    }

    const handleLogout = () => {
        console.log("Logging out")
    }

    return <>
        <Navbar className="bg-body-tertiary">
            <Container>
                <Button variant='primary' onClick={handleShow} resposive="lg">Sidebar</Button>
                <Navbar.Text>
                    {username}
                </Navbar.Text>
            </Container>
        </Navbar>
        <Offcanvas show={show} onHide={handleClose} backdrop='static'>
            <Offcanvas.Header className='d-flex justify-content-between'>
                <div>
                    <bold>{username}</bold>
                </div>
                <Button variant='danger' onClick={handleLogout} resposive="lg">
                    <DoorOpenFill />
                </Button>
            </Offcanvas.Header>
            <Offcanvas.Body className='d-flex flex-column justify-content-between'>
                <ProjectList />
                <div className="d-flex flex-row justify-content-between align-items-center border border-dark border-width-1 rounded p-2 m-1">
                    <div className='fs-4'>Criar projeto</div>
                    <Button variant="success" onClick={handleCreateProject}>
                        <Plus fontSize={"200%"} />
                    </Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    </>
}