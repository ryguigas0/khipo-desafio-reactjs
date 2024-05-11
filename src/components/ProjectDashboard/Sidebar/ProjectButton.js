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

    const handleSelect = () => {
        setSelectedProject(project)
        setShowSidebar(false)
        setMemberList([project.owner].concat(project.members))
    }

    const handleEdit = () => {
        setProjectFormData(project)
        setShowProjectForm(true)
    }

    return <div className="d-flex flex-row justify-content-between">
        <div className='fs-4'>{project.name}</div>
        <div>
            {isEditing && <Button variant="none" onClick={handleEdit}>
                <PencilSquare fontSize={"200%"} />
            </Button>}
            <Button variant="none" onClick={handleSelect}>
                <ArrowRight fontSize={"200%"} />
            </Button>
        </div>
    </div>
}