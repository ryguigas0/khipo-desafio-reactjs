import { Navbar, Nav, Container, Offcanvas, NavDropdown, Form, Button, Col } from 'react-bootstrap'
import ProjectList from './ProjectList'
import { useContext, useState } from 'react'
import { ArrowRight, DoorOpenFill, List, PencilSquare, Plus } from 'react-bootstrap-icons';
import ProjectsSidebarContext from '../../../contexts/ProjectsSidebarContext';
import ProjectFormContext from '../../../contexts/ProjectFormContext';
import ProjectListContext from '../../../contexts/ProjectListContext'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ProjectForm from './ProjectForm';
import { jwtDecode } from 'jwt-decode';

export default function DashboardSidebar({ username }) {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const [showSidebar, setShowSidebar] = useContext(ProjectsSidebarContext)

    const [showProjectForm, setShowProjectForm] = useState(false)
    const [projectFormData, setProjectFormData] = useState(null)
    const [projectList, setProjectList] = useState(null)

    const handleCreateProject = () => {
        setShowProjectForm(true)
        setProjectFormData(null)
    }

    const handleLogout = () => {
        removeCookie()
        navigate("/")
    }

    const handleClose = () => {
        setShowSidebar(false)
    }

    return <ProjectListContext.Provider value={[projectList, setProjectList]}>
        <ProjectFormContext.Provider value={[showProjectForm, setShowProjectForm, projectFormData, setProjectFormData]}>
            <Offcanvas show={showSidebar} onHide={handleClose} backdrop={true}>
                <Offcanvas.Header className='d-flex justify-content-between'>
                    <Button variant='none' resposive="lg" onClick={handleClose}>
                        <List fontSize={"200%"} />
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Header className='d-flex justify-content-between'>
                    <h4 className='fw-bold'>
                        {username.toUpperCase()}
                    </h4>
                    <Button variant='danger' onClick={handleLogout} resposive="lg">
                        <DoorOpenFill fontSize={"200%"} />
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body className='d-flex flex-column justify-content-between'>
                    <ProjectList />
                    <div>
                        <Button className="d-flex flex-row justify-content-between align-items-center border border-dark border-width-1 rounded p-2 m-1" variant="none" onClick={handleCreateProject}>
                            <div className='fs-4'>Create project</div>
                            <Plus fontSize={"200%"} />
                        </Button>
                    </div>
                </Offcanvas.Body>
                <ProjectForm />
            </Offcanvas>
        </ProjectFormContext.Provider>
    </ProjectListContext.Provider>
}