import {Grid, CircularProgress, ButtonGroup,Button, Select, MenuItem} from '@mui/material'
import {useState} from 'react'
import { useAsync } from "react-use";
import Fetch from '../../services/Fetch';
import { Toast } from '../../services/Toast';
import Modal from "react-responsive-modal";
import { Class, CourseLevel, Pupil, Result, School, Teacher } from '../../store/type';
import useObjectList from '../../hooks/useObjectList';
import SchoolForm from './components/SchoolForm';
import ClassForm from './components/ClassForm';
import PupilForm from './components/PupilForm';
import TeacherForm from './components/TeacherForm';


const Home = ()=>{
    const [school_selected, setSchoolSelected] = useState(0)
    const [class_selected, setClassSelected] = useState(0)
    const [school, setSchool] = useState<School | null>(null);
    const [_class, setClass] = useState<Class | null>(null);
    const [pupil, setPupil] = useState<Pupil | null>(null);
    const [teacher, setTeacher] = useState<Teacher | null>(null);

    const [course_level_id, setCourseLevelId] = useState(1);
    const [loading, setLoading] = useState(1);

    const schools = useObjectList<School>("/school/list", [loading]);
    const classes = useObjectList<Class>("/class/list", [loading, school_selected],{school_id: school_selected});
    

    const teachers = useObjectList<Teacher>("/teacher/list", [loading,class_selected, school_selected],class_selected? {class_id: class_selected,}:{school_id: school_selected})

    const pupils = useObjectList<Pupil>("/pupil/list", [loading,class_selected, school_selected],class_selected? {class_id: class_selected,}:{school_id: school_selected})

    const handleData = (obj: string ,action: string, data: any, setChange: any)=>{
        return async () => {
            console.log("DATA---", data)
            const res = await Fetch.postJson<{result: Result}>(`/${obj}/${action}`,data);
            const {result} = res.data
            if(result.code == 200 && result.result){
                setChange(null)
                setLoading(-loading);
                return Toast.success(result.message)
            }
    
            return Toast.error(result.message)
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
                <div className='bg-red-500 cursor-pointer' onDoubleClick={()=>{setSchool({id: 0,code: "",name:"", address:""  })}}>Trường</div>
                <div className="flex justify-between">
                    <span>ID</span>
                    <span>CODE</span>
                    <span>NAME</span>
                </div>
                {
                    schools.loading || !schools.value ? <CircularProgress /> : 
                    schools.value.map((school)=>{
                        return (
                            <div key={school.id} 
                                className={`flex justify-between border-[1px] border-blue-500 my-2 py-2 cursor-pointer ${school.id == school_selected? 'bg-blue-200':''}`}
                                onClick={()=>{setSchoolSelected(school.id); setClassSelected(0)}}
                                onDoubleClick={()=>{setSchool(school)}}
                            >
                                <span>{school.id}</span>
                                <span>{school.code}</span>
                                <span>{school.name}</span>
                            </div>
                        )
                    })
                }
            </Grid>
            <Grid item xs={6} md={3}>
                <div className='bg-green-500'
                >
                    Lớp
                </div>
                <div className="flex justify-between">
                    <span>ID</span>
                    <span>NAME</span>
                </div>
                {
                    classes.loading || !classes.value ? <CircularProgress /> : 
                    classes.value.map((c)=>{
                        return (
                            <div key={c.id} 
                                className={`flex justify-between border-[1px] border-blue-500 my-2 py-2 cursor-pointer ${c.id == class_selected? 'bg-blue-200':''}`}
                                onClick={()=>{setClassSelected(c.id)}}
                                onDoubleClick={()=>{setClass(c); setCourseLevelId(c.course_level_id)}}
                            >
                                <span>{c.id}</span>
                                <span>{c.name}</span>
                            </div>
                        )
                    })
                }
            </Grid>
            <Grid item xs={6} md={3}>
                <div className='bg-blue-500'>Giáo viên</div>
                <div className="flex justify-between">
                    <span>ID</span>
                    <span>CODE</span>
                    <span>NAME</span>
                </div>
                {
                    teachers.loading || !teachers.value ? <CircularProgress /> : 
                    teachers.value.map((p)=>{
                        return (
                            <div key={p.id} 
                                className="flex justify-between border-[1px] border-blue-500 my-2 py-2 cursor-pointer"
                                onDoubleClick={()=>{setTeacher(p)}}
                                >
                                <span>{p.id}</span>
                                <span>{p.name}</span>
                            </div>
                        )
                    })
                }
            </Grid>
            <Grid item xs={6} md={3}>
                <div className='bg-yellow-500'>Học Sinh</div>
                <div className="flex justify-between">
                    <span>ID</span>
                    <span>CODE</span>
                    <span>FULL_NAME</span>
                </div>
                {
                    pupils.loading || !pupils.value ? <CircularProgress /> : 
                    pupils.value.map((p)=>{
                        return (
                            <div key={p.id} 
                                className="flex justify-between border-[1px] border-blue-500 my-2 py-2 cursor-pointer"
                                onDoubleClick={()=>{setPupil(p);}}
                                >
                                <span>{p.id}</span>
                                <span>{p.code}</span>
                                <span>{p.full_name}</span>
                            </div>
                        )
                    })
                }
            </Grid>
            </Grid>

            <Modal
                classNames={{
                    modal: "rounded-lg overflow-x-hidden w-1/2 relative"
                }}
                center
                onClose={()=>{setSchool(null)}} open={school? true: false}
                >
                {
                    school && <SchoolForm school={school} handleData={handleData} setSchool={setSchool}/>
                }
            </Modal>


            <Modal
                classNames={{
                    modal: "rounded-lg overflow-x-hidden w-1/2 relative"
                }}
                center
                onClose={()=>{setClass(null)}} open={_class? true: false}
                >
                {
                    _class && <ClassForm _class={_class} handleData={handleData} setClass={setClass}/> 
                }
            </Modal>

            <Modal
                classNames={{
                    modal: "rounded-lg overflow-x-hidden w-1/2 relative"
                }}
                center
                onClose={()=>{setPupil(null)}} open={pupil? true: false}
                >
                {
                    pupil && <PupilForm pupil={pupil} handleData={handleData} setPupil={setPupil}/> 
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
                    teacher && <TeacherForm teacher={teacher} handleData={handleData} setTeacher={setTeacher}/> 
                }
            </Modal>
        </div>
    )
}

export default Home