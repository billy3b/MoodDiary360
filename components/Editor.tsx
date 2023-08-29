'use client'

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { Autosave, useAutosave } from 'react-autosave';

const Editor =({entry}) => {
    const [value,setValue] = useState(entry.content);
    const [isLoading, setisLoading] = useState(false)
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setisLoading(true)
            const updated = await updateEntry(entry.id, _value)
            setisLoading(false)
            
        }

    })
    return <div className="w-full h-full">
        {isLoading && 
            <div>....saving</div>
        }
        <textarea className='w-full h-full text-xl p-8 outline-none' value={value} onChange={e => setValue(e.target.value)}/>
    </div>
}

export default Editor;
