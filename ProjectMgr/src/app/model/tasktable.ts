export class TaskTable {
    taskid: number;
    parentid?:number;
    projectid: number;
    taskdesc: string;
    startdate?: Date;
    enddate?: Date;
    priority?: number;
    status?: string; 

    constructor() {}
}