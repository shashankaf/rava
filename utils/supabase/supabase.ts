export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blood: {
        Row: {
          id: number
          title: string | null
        }
        Insert: {
          id?: number
          title?: string | null
        }
        Update: {
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      class: {
        Row: {
          id: number
          title: string | null
        }
        Insert: {
          id?: number
          title?: string | null
        }
        Update: {
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      course: {
        Row: {
          created_at: string
          end: string | null
          id: string
          start: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          end?: string | null
          id?: string
          start?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          end?: string | null
          id?: string
          start?: string | null
          title?: string | null
        }
        Relationships: []
      }
      expense: {
        Row: {
          amount: number | null
          course: string | null
          created_at: string
          expense_type: Database["public"]["Enums"]["expense_type_enum"] | null
          id: string
          items: string | null
          student: string | null
          teacher: string | null
        }
        Insert: {
          amount?: number | null
          course?: string | null
          created_at?: string
          expense_type?: Database["public"]["Enums"]["expense_type_enum"] | null
          id?: string
          items?: string | null
          student?: string | null
          teacher?: string | null
        }
        Update: {
          amount?: number | null
          course?: string | null
          created_at?: string
          expense_type?: Database["public"]["Enums"]["expense_type_enum"] | null
          id?: string
          items?: string | null
          student?: string | null
          teacher?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_course_fkey"
            columns: ["course"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_items_fkey"
            columns: ["items"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_student_fkey"
            columns: ["student"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_teacher_fkey"
            columns: ["teacher"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
        ]
      }
      income: {
        Row: {
          amount: number | null
          course: string | null
          created_at: string
          id: string
          spent_shares: Json | null
          student: string | null
          teacher: Json | null
        }
        Insert: {
          amount?: number | null
          course?: string | null
          created_at?: string
          id?: string
          spent_shares?: Json | null
          student?: string | null
          teacher?: Json | null
        }
        Update: {
          amount?: number | null
          course?: string | null
          created_at?: string
          id?: string
          spent_shares?: Json | null
          student?: string | null
          teacher?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "income_course_fkey"
            columns: ["course"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "income_student_fkey"
            columns: ["student"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          created_at: string
          id: string
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      ragaz: {
        Row: {
          id: number
          title: string | null
        }
        Insert: {
          id?: number
          title?: string | null
        }
        Update: {
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      share: {
        Row: {
          course: string | null
          created_at: string
          id: string
          percentage: number | null
          teacher: string | null
        }
        Insert: {
          course?: string | null
          created_at?: string
          id?: string
          percentage?: number | null
          teacher?: string | null
        }
        Update: {
          course?: string | null
          created_at?: string
          id?: string
          percentage?: number | null
          teacher?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "share_course_fkey"
            columns: ["course"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "share_teacher_fkey"
            columns: ["teacher"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
        ]
      }
      student: {
        Row: {
          address: string | null
          blood: number | null
          class: number | null
          course: string | null
          created_at: string
          health: string | null
          id: string
          name: string | null
          pay: string | null
          phone: string | null
          publish: boolean | null
          ragaz: number | null
          school: string | null
          second_phone: string | null
          secondpay: string | null
          teacher: Json | null
          travel: number | null
        }
        Insert: {
          address?: string | null
          blood?: number | null
          class?: number | null
          course?: string | null
          created_at?: string
          health?: string | null
          id?: string
          name?: string | null
          pay?: string | null
          phone?: string | null
          publish?: boolean | null
          ragaz?: number | null
          school?: string | null
          second_phone?: string | null
          secondpay?: string | null
          teacher?: Json | null
          travel?: number | null
        }
        Update: {
          address?: string | null
          blood?: number | null
          class?: number | null
          course?: string | null
          created_at?: string
          health?: string | null
          id?: string
          name?: string | null
          pay?: string | null
          phone?: string | null
          publish?: boolean | null
          ragaz?: number | null
          school?: string | null
          second_phone?: string | null
          secondpay?: string | null
          teacher?: Json | null
          travel?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_blood_fkey"
            columns: ["blood"]
            isOneToOne: false
            referencedRelation: "blood"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_class_fkey"
            columns: ["class"]
            isOneToOne: false
            referencedRelation: "class"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_course_fkey"
            columns: ["course"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_ragaz_fkey"
            columns: ["ragaz"]
            isOneToOne: false
            referencedRelation: "ragaz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_travel_fkey"
            columns: ["travel"]
            isOneToOne: false
            referencedRelation: "travel"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          name: string | null
          order: number | null
          photo: string | null
          specialty: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          name?: string | null
          order?: number | null
          photo?: string | null
          specialty?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          name?: string | null
          order?: number | null
          photo?: string | null
          specialty?: string | null
        }
        Relationships: []
      }
      travel: {
        Row: {
          id: number
          title: string | null
        }
        Insert: {
          id?: number
          title?: string | null
        }
        Update: {
          id?: number
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_expense: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      fetch_all_data: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_most_popular_teachers: {
        Args: Record<PropertyKey, never>
        Returns: {
          teacher_id: string
          name: string
          specialty: string
          photo: string
          popularity_count: number
        }[]
      }
      get_total_expense: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_total_income: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      course_type_enum: "hourly" | "summer" | "private"
      expense_type_enum: "course" | "others"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
