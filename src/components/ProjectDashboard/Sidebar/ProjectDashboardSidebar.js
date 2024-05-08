import { Navbar, Nav, Container, Offcanvas, NavDropdown, Form, Button, Col } from 'react-bootstrap'
import ProjectList from './ProjectList'
import { useContext, useState } from 'react'
import { ArrowRight, DoorOpenFill, List, PencilSquare, Plus } from 'react-bootstrap-icons';
import ProjectsSidebarContext from '../../../contexts/ProjectsSidebarContext';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function ProjectDashboardSidebar({ username }) {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const [showSidebar, setShowSidebar] = useContext(ProjectsSidebarContext)

    const handleCreateProject = () => {
        console.log("create projhect")
    }

    const handleLogout = () => {
        removeCookie()
        navigate("/")
    }

    return <>
        <Offcanvas show={showSidebar}>
            <Offcanvas.Header className='d-flex justify-content-between'>
                <Button variant='primary' resposive="lg" onClick={() => setShowSidebar(false)}>
                    <List fontSize={"200%"} />
                </Button>
            </Offcanvas.Header>
            <Offcanvas.Header className='d-flex justify-content-between'>
                <div>
                    {username}
                </div>
                <Button variant='danger' onClick={handleLogout} resposive="lg">
                    <DoorOpenFill fontSize={"200%"} />
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