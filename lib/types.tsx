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
  blood: (number & Blood) | null;
  class: (number & UtilityTable) | null;
  created_at: string;
  id: string;
  health: string | null;
  name: string | null;
  school: string | null;
  phone: string | null;
  address: string | null;
  travel: (number & UtilityTable) | null;
  ragaz: (number & UtilityTable) | null;
  publish: boolean | null;
  teacher: any;
  second_phone: string | null;
  pay: string | null;
  secondpay: string | null;
  course: (string & Course) | null;
}

export interface StudentRaw {
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
  created_at: string;
  id: string;
  course: string & Course | null;
  teacher: string & Teacher | null;
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
  course: (string & Course) | null;
  student: (string & Student) | null;
  teacher: (string & Teacher) | null;
  expense_type: "course" | "others";
  items: (string & Item) | null;
}

export interface Blood {
  id: number;
  title: string | null;
}

export interface UtilityTable {
  id: number;
  title: string | null;
}

export interface Reklam {
  id: string;
  created_at: string;
  title: string | undefined;
  content: string | null;
  link: string | null;
  media: string;
}
