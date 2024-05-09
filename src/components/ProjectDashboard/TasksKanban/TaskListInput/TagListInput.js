import { useState } from "react";
import { Button, Form, FormLabel, InputGroup } from "react-bootstrap";
import TagItemInput from "./TagItemInput";
import TagInputContext from "../../../../contexts/TagInputContext"

export default function TagListInput({ initialValue, setFieldValue }) {
    const [tags, setTags] = useState(initialValue ? string2TagList(initialValue) : [])
    const [addTagValue, setaddTagValue] = useState("")

    const appendTag = () => {
        if (addTagValue) {
            const newTagList = uniqueItemsList([].concat(tags, [addTagValue]))
            console.log({ newTagList })
            setTags(newTagList)
            setFieldValue("tagsString", tagList2String(newTagList), false)
            setaddTagValue("")
        }
    }

    return <TagInputContext.Provider value={[tags, setTags]}>
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
                            key={i} tagValue={t} />)
                    }
                </ul>
            </div>
        </InputGroup>
    </TagInputContext.Provider>
}

function uniqueItemsList(list) {
    return Array.from((new Set(list)).entries()).map(([k, v]) => v)
}

function string2TagList(tagString) {
    return tagString ? tagString.trim().split(",") : []
}

function tagList2String(tagList) {
    return tagList.join(", ")
}