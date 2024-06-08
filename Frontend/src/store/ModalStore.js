import { create } from "zustand";

const useModal = create((set, get) => ({
  modals: {},
  openModal: (id) =>
    set((state) => ({ modals: { ...state.modals, [id]: true } })),
  closeModal: (id) =>
    set((state) => ({ modals: { ...state.modals, [id]: false } })),
  isOpen: (id) => get().modals[id] || false,
}));

export default useModal;
