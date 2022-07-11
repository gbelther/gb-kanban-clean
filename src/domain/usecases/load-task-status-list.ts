export interface LoadTaskStatusList {
  loadAll: () => Promise<LoadTaskStatusList.Model[]>;
}

export namespace LoadTaskStatusList {
  export type Model = {
    id: string;
    name: string;
    order: number;
  };
}
