import { atom } from "jotai";

// FORM 
export const nameAtom = atom("")
export const schoolAtom = atom("")
export const phoneAtom = atom("")
export const secondPhoneAtom = atom("")
export const addressAtom = atom("")
export const healthAtom = atom("")
export const bloodAtom = atom({id:null})
export const classAtom = atom({id:null})
export const ragazAtom = atom({id:null})
export const travelAtom = atom({id:null})
export const teacherAtom = atom([])

// SUPABASE
export const studentAtom = atom({})
export const studentsAtom = atom([])
export const courseAtom = atom({})
export const coursesAtom = atom([])
export const classesAtom = atom([])
export const paidAtom = atom(false)

// MODAL
export const modalOpenAtom = atom(false)
export const isOpenClass = atom(false)
