import { useContext } from "react";
import { Button } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import TagInputContext from "../../../../contexts/TagInputContext"

export default function TagItemInput({ tagValue }) {
    const [tags, setTags] = useContext(TagInputContext)

    const handleRemove = () => {
        setTags(tags.filter(tag => tag !== tagValue))
    }

    return <li>
        <div className="d-flex flex-row justify-content-between align-items-center py-1">
            <div>{tagValue}</div>
            <Button variant="danger" onClick={handleRemove}>
                Remove tag
            </Button>
        </div>
    </li>
}