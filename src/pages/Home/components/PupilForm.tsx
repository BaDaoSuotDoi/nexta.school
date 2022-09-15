import { Pupil } from "../../../store/type"

const PupilForm = ({pupil,setPupil, handleData}:{pupil:Pupil,setPupil: any,  handleData: any})=>{

    return (
        <div>
           {
             pupil.id ? (
                <div>
                    <div>NAME: <input value={pupil.full_name} onChange={(e)=>{setPupil({...pupil, full_name: e.target.value})}} className=' px-2 py-2'/></div>
                    <div>CODE: <input value={pupil.code} onChange={(e)=>{setPupil({...pupil, code: e.target.value})}} className=' px-2 py-2'/></div>
                    <button className='bg-blue-500 px-2 py-2' onClick={handleData("pupil","update", pupil,setPupil)}>SAVE</button>
                    <button className='bg-red-500  px-2 py-2' onClick={handleData("pupil","delete", {pupil_id: pupil.id},setPupil)}>DELETE</button>
                </div>
             ):(
                <div>
                    <div>NAME: <input value={pupil.full_name} onChange={(e)=>{setPupil({...pupil, full_name: e.target.value})}} className=' px-2 py-2'/></div>
                    <div>CODE: <input value={pupil.code} onChange={(e)=>{setPupil({...pupil, code: e.target.value})}} className=' px-2 py-2'/></div>
                    <div>PASSWORD: <input value={pupil.password} onChange={(e)=>{setPupil({...pupil, password: e.target.value})}} className=' px-2 py-2'/></div>
                    <button className='bg-blue-500 px-2 py-2' onClick={handleData("pupil","create", pupil,setPupil)}>CREATE</button>
                </div>
             )
           }
        </div>
    )
}

export default PupilForm