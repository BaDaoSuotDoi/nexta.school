import { CircularProgress, MenuItem, Select } from "@mui/material"
import { useAsync } from "react-use";
import {useState} from 'react';
import Fetch from "../../../services/Fetch";
import { Toast } from "../../../services/Toast";
import { Class, CourseLevel, Pupil, Result, Teacher } from "../../../store/type";
import Modal from "react-responsive-modal";
import PupilForm from "./PupilForm";
import TeacherForm from "./TeacherForm";

const ClassForm = ({_class, setClass, handleData}:{_class:Class,setClass: any,  handleData: any})=>{
    const [pupil, setPupil] = useState<Pupil | null>(null)
    const [teacher, setTeacher] = useState<Teacher| null>(null)

    const course_levels = useAsync(async()=>{
        const res = await Fetch.get<{result: Result, data: CourseLevel[]}>("/class/course_level_list");
        const {result, data} = res.data
        if(result.code == 200 && result.result){
            return data
        }
        Toast.error(result.message)
    },[]) 

    return (
        <div>
            {
                course_levels.loading || !course_levels.value? <CircularProgress/>: (
                    <div>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={_class.course_level_id? _class.course_level_id:course_levels.value[0].id }
                            label="Level"
                            onChange={(e)=>{setClass({..._class, course_level_id: e.target.value})}}
                        >   
                                {
                                course_levels.value.map(item => (
                                    <MenuItem value={item.id} key={item.id}>{item.course_name}</MenuItem>
                                ))
                                }
                        </Select>
                        {
                            _class && _class.id? (
                                <div>
                                    <div>ID: {_class.id}</div>
                                    <div>NAME: <input value={_class.name} onChange={(e)=>{
                                        setClass({..._class, name: e.target.value})}} className=' px-2 py-2'/></div>
                                    <button className='bg-blue-500 px-2 py-2' onClick={handleData("class","update", _class,setClass)}>SAVE</button>
                                    <button className='bg-red-500  px-2 py-2' onClick={handleData("class","delete", {class_id: _class.id},setClass)}>DELETE</button>
                                    <div>
                                        <button className='bg-yellow-500  px-2 py-2' onClick={()=>{setTeacher({id: 0, code:"",name: "",class_id: _class.id })} }>
                                            ADD TEACHER
                                        </button>
                                    </div>
                                    <div>
                                        <button className='bg-green-500  px-2 py-2' onClick={()=>{setPupil({
                                            id: 0, full_name: "", code: "", class_id: _class.id
                                        })}}>
                                            ADD PUPIL
                                        </button>
                                    </div>
                                </div>
                            ):_class ?(
                                <div>
                                    <div>NAME: <input value={_class.name} onChange={(e)=>{
                                        setClass({..._class, name: e.target.value})}} className=' px-2 py-2'/></div>
                                    <button className='bg-blue-500  px-2 py-2' onClick={handleData("class","create", {
                                        ..._class,
                                        course_level_id: _class.course_level_id?  _class.course_level_id: course_levels.value[0].id
                                    },setClass)}>
                                        ADD
                                    </button>
                                </div>
                            ):""
                        }
                    </div>
                )
            }
            <Modal
                classNames={{
                    modal: "rounded-lg overflow-x-hidden w-1/2 relative"
                }}
                center
                onClose={()=>{setPupil(null)}} open={pupil? true: false}
                >
                {
                    pupil &&  <PupilForm pupil={pupil} setPupil={setPupil} handleData={handleData}/>
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
                    teacher &&  <TeacherForm teacher={teacher} setTeacher={setTeacher} handleData={handleData}/>
                }
            </Modal>

        </div>
    )
}

export default ClassForm