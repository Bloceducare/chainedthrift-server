export interface IDataBaseWrapper {
    find(query: object): any;
    insertOne(data: any): Promise<any>;
}
