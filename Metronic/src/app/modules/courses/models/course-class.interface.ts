export interface CourseClass {
    _id: string;
    title: string;
    state: number;
    courseSection: string;
    description: string;
    vimeo_id?: string;
    time?: string;
}