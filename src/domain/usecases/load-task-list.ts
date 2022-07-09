export interface LoadTaskList {
  loadAll: () => Promise<LoadTaskList.Model[]>;
}

export namespace LoadTaskList {
  export type Model = {
    id: string;
    title: string;
    content: string;
    statusId: string;
    userId: string;
  };
}
