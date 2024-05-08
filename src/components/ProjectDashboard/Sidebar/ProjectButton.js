import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ArrowRight, PencilSquare } from "react-bootstrap-icons";
import SelectedProjectContext from "../../../contexts/SelectedProjectContext";
import ProjectsSidebarContext from "../../../contexts/ProjectsSidebarContext";
import ProjectFormContext from "../../../contexts/ProjectFormContext";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export default function ProjectButton({ project, editButton }) {
    const [selectedProject, setSelectedProject] = useContext(SelectedProjectContext)
    const [showSidebar, setShowSidebar] = useContext(ProjectsSidebarContext)
    const [showProjectForm, setShowProjectForm, projectFormData, setProjectFormData] = useContext(ProjectFormContext)
    const [cookies, setCookies] = useCookies(['token'])

    const { userId } = jwtDecode(cookies.token)

    const isEditing = selectedProject && selectedProject.id === project.id && selectedProject.owner.id === userId

    const handleClick = () => {
        if (isEditing) {
            setProjectFormData(project)
            setShowProjectForm(true)
        } else {
            setSelectedProject(project)
            setShowSidebar(false)
        }
    }

    return <div className="d-flex flex-row justify-content-between align-items-center border border-dark border-width-1 rounded p-2 m-1">
        <h3>{project.name}</h3>
        <Button variant="primary" onClick={handleClick}>
            {isEditing ? <PencilSquare fontSize={"200%"} /> : <ArrowRight fontSize={"200%"} />}
        </Button>
    </div>
}