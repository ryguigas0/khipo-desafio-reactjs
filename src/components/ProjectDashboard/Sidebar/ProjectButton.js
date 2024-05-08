import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ArrowRight, PencilSquare } from "react-bootstrap-icons";
import SelectedProjectContext from "../../../contexts/SelectedProjectContext";
import ProjectsSidebarContext from "../../../contexts/ProjectsSidebarContext";

export default function ProjectButton({ project, editButton }) {
    const [selectedProject, setSelectedProject] = useContext(SelectedProjectContext)
    const [showSidebar, setShowSidebar] = useContext(ProjectsSidebarContext)

    const isEditing = selectedProject && selectedProject.id === project.id

    const handleClick = () => {
        setSelectedProject(project)
        setShowSidebar(false)
    }

    return <div className="d-flex flex-row justify-content-between align-items-center border border-dark border-width-1 rounded p-2 m-1">
        <h3>{project.name}</h3>
        <Button variant="primary" onClick={handleClick}>
            {isEditing ? <PencilSquare fontSize={"200%"} /> : <ArrowRight fontSize={"200%"} />}
        </Button>
    </div>
}