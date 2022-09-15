import useObjectList from '../../../hooks/useObjectList'
import { Teacher } from '../../../store/type'
import {useState, useEffect} from 'react'
import { CircularProgress, MenuItem, Select } from '@mui/material';

const TeacherForm = ({teacher,setTeacher, handleData}:{teacher:Teacher,setTeacher: any,  handleData: any})=>{
    const [teacher_selected, setTeacherSelected] = useState<any>({id: 0});
    const [subject_category_id, setSubjectCategoryId] = useState<number>(1);
    const teachers = useObjectList<Teacher>("/teacher/list", [],{all_school: true,class_id: teacher.class_id })
    const [is_host, setIsHost] = useState(false);


    const detail = useObjectList<Teacher>("/teacher/unauth_detail", [],teacher)

    return (
        <div>
            {
                teacher.class_id ?(
                    <div style={{minHeight: 500}}>
                        <div>
                            {
                                teachers.loading || !teachers.value ? <CircularProgress/> :
                                teachers.value.map((item)=>{
                                    return (
                                        <div key={item.id} 
                                            onClick={()=>{setTeacherSelected(teacher_selected.id ==  item.id ? {id: 0}:  item )}}
                                            className={`border-[1px] border-green-500 cursor-pointer ${teacher_selected == item.id? 'bg-red-500':''}`}>
                                            <span>CODE : {item.code}</span>
                                            <span>NAME : {item.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            TEACHER SELECTED
                            {
                                teacher_selected.id && (
                                    <div 
                                        className={`border-[1px] border-blue-500 cursor-pointer `}>
                                        <span>CODE : {teacher_selected.code}</span>
                                        <span>NAME : {teacher_selected.name}</span>
                                    </div>
                                )
                            }
                        </div>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subject_category_id }
                            label="Subject"
                            onChange={(e)=>{setSubjectCategoryId(e.target.value as number)}}
                        >   
                               <MenuItem value={1} >Toán</MenuItem>
                               <MenuItem value={2} >Tiếng Anh</MenuItem>
                               <MenuItem value={5} >Tiếng Việt</MenuItem>
                        </Select>
                        <button onClick={()=>{setIsHost(!is_host)}} className={`px-2 py-2 ${is_host ? 'bg-blue-500': 'bg-green-500'}`}>
                            GV chủ nhiệm
                        </button>
                        <div>
                        <button className='bg-blue-500 px-2 py-2' onClick={handleData("teacher","assign_class", {...teacher,...teacher_selected,subject_category_id,type: is_host?1 : 0},setTeacher)}>Gán giáo viên vào lớp</button>
                        </div>
                    </div>
                ):teacher.id ? (
                    <div>
                        <div>NAME: <input value={teacher.name} onChange={(e)=>{setTeacher({...teacher, name: e.target.value})}} className=' px-2 py-2'/></div>
                        <div>CODE: <input value={teacher.code} onChange={(e)=>{setTeacher({...teacher, code: e.target.value})}} className=' px-2 py-2'/></div>
                        <button className='bg-blue-500 px-2 py-2' onClick={handleData("teacher","update", teacher,setTeacher)}>SAVE</button>
                        <button className='bg-red-500 px-2 py-2' onClick={handleData("teacher","delete", teacher,setTeacher)}>DELETE</button>

                        <div>

                        </div>
                    </div>
                )
                :(
                    <div>
                        <div>NAME: <input value={teacher.name} onChange={(e)=>{setTeacher({...teacher, name: e.target.value})}} className=' px-2 py-2'/></div>
                        <div>CODE: <input value={teacher.code} onChange={(e)=>{setTeacher({...teacher, code: e.target.value})}} className=' px-2 py-2'/></div>
                        <div>PASSWORD: <input value={teacher.password} onChange={(e)=>{setTeacher({...teacher, password: e.target.value})}} className=' px-2 py-2'/></div>
                        <button className='bg-blue-500 px-2 py-2' onClick={handleData("teacher","create", teacher,setTeacher)}>CREATE</button>
                    </div>
                )
            }
        </div>
    )
}

export default TeacherForm