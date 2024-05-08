import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import ProjectDashboardSidebar from "./Sidebar/ProjectDashboardSidebar";
import TasksKanban from "./TasksKanban/TasksKanban";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { useState } from "react";
import ProjectsSidebarContext from "../../contexts/ProjectsSidebarContext";
import SelectedProjectContext from "../../contexts/SelectedProjectContext";
import { List } from "react-bootstrap-icons";


export default function ProjectDashboard(props) {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['token'])
    if (!cookies.token) navigate("/")
    const username = "PLACEHOLDER@PLACEHOLDE.COM"

    const [showSidebar, setShowSidebar] = useState(true)

    const [selectedProject, setSelectedProject] = useState(null)

    return <SelectedProjectContext.Provider value={[selectedProject, setSelectedProject]} >
        <ProjectsSidebarContext.Provider value={[showSidebar, setShowSidebar]}>
            <ProjectDashboardSidebar username={username} />
            <Navbar className="bg-body-tertiary px-2">
                <Button variant='primary' resposive="lg" onClick={() => setShowSidebar(true)}>
                    <List className="" />
                </Button>
            </Navbar>
            <TasksKanban />
        </ProjectsSidebarContext.Provider>
    </SelectedProjectContext.Provider>
}