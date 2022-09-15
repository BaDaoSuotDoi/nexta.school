export type Result = {
    code: number,
    message: string,
    result: boolean
}

export type School = {
    id: number,
    code: string,
    name: string,
    address: string
}

export type Class = {
    id: number,
    name: string,
    course_level_id: number,
    school_id ?: number
}

export type Teacher = {
    id: number,
    code: string,
    name: string,
    school_id?:number,
    class_id?: number,
    password?:string,
}


export type Pupil = {
    id: number,
    code: string,
    full_name: string,
    password?:string,
    class_id?: number,
}

export type CourseLevel = {
    id: number,
    course_name: string,
    level: number,
}