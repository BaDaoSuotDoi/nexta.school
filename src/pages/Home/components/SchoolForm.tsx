import { Class, Pupil, School, Teacher } from "../../../store/type"
import {useState} from 'react'
import Modal from "react-responsive-modal"
import TeacherForm from "./TeacherForm"
import ClassForm from "./ClassForm"
import PupilForm from "./PupilForm"

const SchoolForm = ({school, handleData,setSchool}:{school: School, handleData: any,setSchool: any})=>{
    const [teacher, setTeacher] = useState<Teacher| null>(null)
    const [_class, setClass] = useState<Class| null>(null)
    return (
        <div>
            {
                school.id? (
                    <div>
                        <div>ID: {school.id}</div>
                        <div>CODE: <input value={school.code} onChange={(e)=>{
                            setSchool({...school, code: e.target.value})}} className=' px-2 py-2'/></div>
                        <div>NAME: <input value={school.name} onChange={(e)=>{setSchool({...school, name: e.target.value})}} className=' px-2 py-2'/></div>
                        <button className='bg-blue-500 px-2 py-2' onClick={handleData("school","update", school,setSchool)}>SAVE</button>
                        <button className='bg-red-500  px-2 py-2' onClick={handleData("school","delete", {school_id: school.id},setSchool)}>DELETE</button>
                        <div>
                            <button className='bg-yellow-500  px-2 py-2' onClick={()=>{
                                setClass({
                                    id: 0,
                                    name: "", course_level_id: 0
                                })
                            }}>ADD CLASS</button>
                        </div>
                        <div>
                            <button className='bg-green-500  px-2 py-2' onClick={()=>{
                                setTeacher({
                                    id: 0,
                                    code:"",name: ""
                                })
                            }}>ADD TEACHER</button>
                        </div>
                    </div>
                ):school ?(
                    <div>
                        <div>CODE: <input value={school.code} onChange={(e)=>{
                            setSchool({...school, code: e.target.value})}} className=' px-2 py-2' /></div>
                        <div>NAME: <input value={school.name} onChange={(e)=>{setSchool({...school, name: e.target.value})}} className=' px-2 py-2'/></div>
                        <button className='bg-blue-500  px-2 py-2' onClick={handleData("school","create", school,setSchool)}>ADD</button>
                    </div>
                ):""
            }
             <Modal
                classNames={{
                    modal: "rounded-lg overflow-x-hidden w-1/2 relative"
                }}
                center
                onClose={()=>{setClass(null)}} open={_class? true: false}
                >
                {
                    _class &&  <ClassForm _class={{..._class, school_id:school.id }} setClass={setClass} handleData={handleData}/>
                }
            </Modal>
            <Modal
                classNames={{
                    modal: "rounded-lg overflow-x-hidden w-1/2 relative"
                }}
                center
                onClose={()=>{setTeacher(null)}} open={teacher? true: false}
                >
                {
                    teacher &&  <TeacherForm teacher={{...teacher, school_id:school.id }} setTeacher={setTeacher} handleData={handleData}/>
                }
            </Modal>
        </div>
    )
}

export default SchoolForm