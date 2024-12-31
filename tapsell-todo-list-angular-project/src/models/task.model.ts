export class TaskModel {
    title: string;
    description: string;
    done: string;
    date: any;
    list: string;
    _id?: string;
    constructor() {
        this.title = ''
        this.date = new Date().getTime()
        this.description = ''
        this.list = ''
        this.done = ''
    }
}