import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./Sidebar/DashboardSidebar";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProjectsSidebarContext from "../../contexts/ProjectsSidebarContext";
import SelectedProjectContext from "../../contexts/SelectedProjectContext";
import MemberListContext from "../../contexts/MemberListContext";
import TaskListContext from "../../contexts/TaskListContext";
import { List } from "react-bootstrap-icons";
import TaskDashboard from "./TasksKanban/TaskDashboard";
import { jwtDecode } from "jwt-decode";

export default function ProjectDashboard(props) {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['token'])
    if (!cookies.token) navigate("/")
    const { userName } = jwtDecode(cookies.token)

    const [showSidebar, setShowSidebar] = useState(true)

    const [selectedProject, setSelectedProject] = useState(null)

    const [memberList, setMemberList] = useState([])

    const [taskList, setTaskList] = useState([])

    return <TaskListContext.Provider value={[taskList, setTaskList]}>
        <MemberListContext.Provider value={[memberList, setMemberList]}>
            <SelectedProjectContext.Provider value={[selectedProject, setSelectedProject]} >
                <ProjectsSidebarContext.Provider value={[showSidebar, setShowSidebar]}>
                    <DashboardSidebar username={userName} />
                    <Navbar className="px-2">
                        <Button variant='none' resposive="lg" onClick={() => setShowSidebar(true)}>
                            <List fontSize={"200%"} />
                        </Button>
                        {selectedProject && <Navbar.Brand>{selectedProject.name}</Navbar.Brand>}
                    </Navbar>
                    <TaskDashboard />
                </ProjectsSidebarContext.Provider>
            </SelectedProjectContext.Provider>
        </MemberListContext.Provider>
    </TaskListContext.Provider>
}