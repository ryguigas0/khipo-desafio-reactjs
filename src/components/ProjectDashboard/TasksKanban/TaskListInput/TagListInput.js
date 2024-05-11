import { useState } from "react";
import { Button, Form, FormLabel, InputGroup } from "react-bootstrap";
import TagItemInput from "./TagItemInput";
import TagInputContext from "../../../../contexts/TagInputContext"

export default function TagListInput({ initialValue, setFieldValue }) {
    const [tags, setTags] = useState(string2TagList(initialValue))
    const [addTagValue, setaddTagValue] = useState("")
    const [removedTags, setRemovedTags] = useState([])

    const appendTag = () => {
        if (addTagValue) {
            if (tags.findIndex(t => t.title === addTagValue) === -1) {
                const newTagList = [].concat(tags, [{ title: addTagValue, id: undefined }])
                setTags(newTagList)
                setFieldValue("tagsString", tagList2String(newTagList), false)
            }
            setaddTagValue("")
        }
    }

    return <TagInputContext.Provider value={[tags, setTags, removedTags, setRemovedTags]}>
        <InputGroup className="d-flex flex-column">
            <FormLabel
                itemID="tagsString"
                label="Tag String"
                className="mb-3"
            />
            <Form.Control
                id="tagsString"
                as="text"
                className="visually-hidden"
            />
            <div>
                <div className="d-flex">
                    <Form.Control
                        placeholder="Tag name"
                        value={addTagValue}
                        onChange={v => setaddTagValue(v.target.value)}
                    />
                    <Button variant='primary' onClick={appendTag}>Add</Button>
                </div>
                <ul>
                    {
                        tags.map((t, i) => <TagItemInput
                            key={i} tagValue={t.title} tagId={t.id} setFieldValue={setFieldValue} />)
                    }
                </ul>
            </div>
        </InputGroup>
    </TagInputContext.Provider>
}

function string2TagList(tagString) {
    return tagString ? JSON.parse(tagString) : []
}

function tagList2String(tagList) {
    return JSON.stringify(tagList)
}