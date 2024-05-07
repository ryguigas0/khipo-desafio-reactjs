import { Button } from "react-bootstrap";
import { ArrowRight, PencilSquare } from "react-bootstrap-icons";

export default function ProjectButton({ project, editButton }) {
    const handleClick = () => {
        console.log(editButton? "EDITING": "GETTING")
        console.log({ project })
    }

    return <div className="d-flex flex-row justify-content-between align-items-center border border-dark border-width-1 rounded p-2 m-1">
        <h3>{project.name}</h3>
        <Button variant="primary" onClick={handleClick}>
            {editButton ? <PencilSquare fontSize={"200%"} /> : <ArrowRight fontSize={"200%"} />}
        </Button>
    </div>
}