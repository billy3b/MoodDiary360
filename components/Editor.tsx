'use client'

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from 'react-autosave'

const Editor =({entry}) => {
    const [value,setValue] = useState(entry)
    const [isLoading, setisLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry)
    const {mood, summary,subject, negative} = analysis
    const analysisData = [
      { name: 'Summary', value:summary},
      { name: 'Subject', value:subject},
      { name: 'Mood', value:mood},
      { name: 'Negative', value:negative?'True':'False'},

  ]
    useAutosave({
        data: value,
        onSave: async (_value) => {
          setisLoading(true)
          const data = await updateEntry(entry, _value)
          setAnalysis(data.analysis)
          setisLoading(false)
        },
      })
    return ( 
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2"> 
        {isLoading && 
            <div>....saving</div>
        }
        <textarea className='w-full h-full text-xl p-8 outline-none' value={value} onChange={e => setValue(e.target.value)}/>
      </div>
      <div className="border-l border-black/20">
            <div className="  bg-blue-300 px-6 py-10">
                <h2 className="text-2xl"> Analysis </h2>
            </div>
            <div>
                    <ul>
                        <li>
                            {analysisData.map(item => (
                                <li key={item.name}
                                    className="px-2 py-4 flex items-center justify-center border-b border-t border-black/10">
                                    <span className="text-lg font-semibold">{item.name}</span>
                                    <span>{item.value}</span>     
                                </li>
                            ))}
                        </li>
                    </ul>
                </div>
        </div>

    </div>
    )
}

export default Editor;
