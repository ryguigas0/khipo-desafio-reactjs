import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./Sidebar/DashboardSidebar";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProjectsSidebarContext from "../../contexts/ProjectsSidebarContext";
import SelectedProjectContext from "../../contexts/SelectedProjectContext";
import MemberListContext from "../../contexts/MemberListContext";
import TaskListContext from "../../contexts/TaskListContext";
import MemberListFormContext from "../../contexts/MemberListFormContext";
import { List } from "react-bootstrap-icons";
import { jwtDecode } from "jwt-decode";
import TasksKanban from "./TasksKanban/TasksKanban";
import MemberListForm from "./MemberListForm/MemberListForm";

export default function ProjectDashboard(props) {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['token'])
    if (!cookies.token) navigate("/")
    const { userName } = jwtDecode(cookies.token)

    const [showSidebar, setShowSidebar] = useState(true)

    const [selectedProject, setSelectedProject] = useState(null)

    const [showMemberListForm, setShowMemberListForm] = useState(false)
    const [memberList, setMemberList] = useState([])

    const [taskList, setTaskList] = useState([])

    const handleShowMemberList = () => {
        setShowMemberListForm(true)
    }

    return <TaskListContext.Provider value={[taskList, setTaskList]}>
        <MemberListFormContext.Provider value={[showMemberListForm, setShowMemberListForm]}>
            <MemberListContext.Provider value={[memberList, setMemberList]}>
                <SelectedProjectContext.Provider value={[selectedProject, setSelectedProject]} >
                    <ProjectsSidebarContext.Provider value={[showSidebar, setShowSidebar]}>
                        <DashboardSidebar username={userName} />
                        <Navbar className="px-2">
                            <Button variant='none' resposive="lg" onClick={() => setShowSidebar(true)}>
                                <List fontSize={"200%"} />
                            </Button>
                            {selectedProject && <>
                                <Navbar.Brand>{selectedProject.name}</Navbar.Brand>
                                <Button onClick={handleShowMemberList}> Members </Button>
                            </>}
                        </Navbar>
                        <TasksKanban />
                        {selectedProject && <MemberListForm owner={selectedProject.owner} members={memberList} project={selectedProject}/>}
                    </ProjectsSidebarContext.Provider>
                </SelectedProjectContext.Provider>
            </MemberListContext.Provider>
        </MemberListFormContext.Provider>
    </TaskListContext.Provider>
}