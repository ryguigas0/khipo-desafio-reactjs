import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ArrowRight, PencilSquare } from "react-bootstrap-icons";
import SelectedProjectContext from "../../../contexts/SelectedProjectContext";
import ProjectsSidebarContext from "../../../contexts/ProjectsSidebarContext";
import ProjectFormContext from "../../../contexts/ProjectFormContext";
import MemberListContext from "../../../contexts/MemberListContext";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export default function ProjectButton({ project, editButton }) {
    const [selectedProject, setSelectedProject] = useContext(SelectedProjectContext)
    const [showSidebar, setShowSidebar] = useContext(ProjectsSidebarContext)
    const [showProjectForm, setShowProjectForm, projectFormData, setProjectFormData] = useContext(ProjectFormContext)
    const [cookies, setCookies] = useCookies(['token'])
    const [memberList, setMemberList] = useContext(MemberListContext)

    const { userId } = jwtDecode(cookies.token)

    const isEditing = selectedProject && selectedProject.id === project.id && selectedProject.owner.id === userId

    const handleClick = () => {
        if (isEditing) {
            setProjectFormData(project)
            setShowProjectForm(true)
        } else {
            setSelectedProject(project)
            setShowSidebar(false)
            setMemberList([project.owner].concat(project.members))
        }
    }

    let classList = "d-flex flex-row justify-content-between align-items-center border border-dark border-width-1 rounded p-2 m-1"

    if(isEditing) classList += " bg-primary text-light"

    return <Button className={classList} variant="none" onClick={handleClick}>
        <div className='fs-4'>{project.name}</div>
        {isEditing ? <PencilSquare fontSize={"200%"} /> : <ArrowRight fontSize={"200%"} />}
    </Button>
}