import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import ProjectDashboardSidebar from "../../components/ProjectDashboardSidebar";
import TasksKanban from "../../components/ProjectDashboard/TasksKanban/TasksKanban";


export default function ProjectDashboard(props) {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['token'])
    if (!cookies.token) navigate("/")

    return <>
        <ProjectDashboardSidebar username={"PLACEHOLDER@PLACEHOLDE.COM"} />
        <TasksKanban />
    </>
}