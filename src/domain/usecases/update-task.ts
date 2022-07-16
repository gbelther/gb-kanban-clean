export interface UpdateTask {
  update: (data: UpdateTask.Params) => Promise<UpdateTask.Model>;
}

export namespace UpdateTask {
  export type Params = {
    id: string;
    title?: string;
    content?: string;
    statusId: string;
  };

  export type Model = {
    id: string;
    title: string;
    content: string;
    statusId: string;
    userId: string;
  };
}
