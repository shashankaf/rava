export interface Course {
  id: string;
  created_at: string;
  title: string | null;
  start: string | null;
  end: string | null;
}

export interface Teacher {
  id: string;
  bio: string | null;
  created_at: string;
  name: string | null;
  order: number | null;
  specialty: string | null;
  photo: string | null;
}

export interface Student {
  blood: number | null;
  class: number | null;
  created_at: string;
  id: string;
  health: string | null;
  name: string | null;
  school: string | null;
  phone: string | null;
  address: string | null;
  travel: number | null;
  ragaz: number | null;
  publish: boolean | null;
  teacher: any;
  second_phone: string | null;
  pay: string | null;
  secondpay: string | null;
  course: string | null;
}

export interface Share {
  create_at: string;
  id: string;
  course: string | null;
  teacher: string | null;
  percentage: number | null;
}

export interface Item {
  id: string;
  created_at: string;
  title: string | null;
}

export interface Income {
  id: string;
  created_at: string;
  amount: number | null;
  course: string & Course | null;
  student: string & Student | null;
  teacher: string[] | null;
  spent_share: string[] | null;
}

export interface Expense {
  id: string;
  created_at: string;
  amount: number | null;
  course: string & Course | null;
  student: string & Student | null;
  teacher: string & Teacher | null;
  expense_type: "course" | "others";
  items: string & Item | null;
}
