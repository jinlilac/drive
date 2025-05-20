import { create } from 'zustand';

type WorkStackType = {
  driveLastJob: (() => void) | null;
};

type WorkStackStoreType = WorkStackType & {
  setDriveLastJob: (fn: () => void) => void;
  undoLastJob: () => void;
};

const useWorkStack = create<WorkStackStoreType>()((set, get) => ({
  driveLastJob: null,
  setDriveLastJob: (fn) => set(() => ({ driveLastJob: fn })),
  undoLastJob: () => {
    const lastJob = get().driveLastJob;
    if (lastJob) {
      lastJob();
      set(() => ({ driveLastJob: null }));
    }
  },
}));

export default useWorkStack;
