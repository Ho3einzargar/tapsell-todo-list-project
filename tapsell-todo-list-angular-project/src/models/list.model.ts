import { TaskModel } from "./task.model";

export class ListModel {
    title: string;
    isMain: boolean;
    date: any;
    _id?: string;
    tasks?: TaskModel[]
    constructor() {
        this.title = ''
        this.tasks = []
        this._id = ''
        this.date = new Date().getTime();
        this.isMain = false;
    }
}