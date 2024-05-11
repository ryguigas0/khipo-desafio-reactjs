import { useContext } from "react";
import { Button } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import TagInputContext from "../../../../contexts/TagInputContext"

export default function TagItemInput({ tagValue, tagId, setFieldValue }) {
    const [tags, setTags, removedTags, setRemovedTags] = useContext(TagInputContext)

    const handleRemove = () => {
        const newTagList = tags.filter(tag => tag.title !== tagValue)
        setTags(newTagList)
        setFieldValue("tagsString", tagList2String(newTagList), false)
        if (tagId) {
            const newRemovedTagList = [].concat(removedTags, [{ title: tagValue, id: tagId }])
            setRemovedTags(newRemovedTagList)
            setFieldValue("tagsRemoveString", tagList2String(newRemovedTagList), false)
        }
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

function tagList2String(tagList) {
    return JSON.stringify(tagList)
}