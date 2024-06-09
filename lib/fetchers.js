import { supabase } from "../utils/supabase/client"

export const ragaz_fetcher = async () => {
  try {
    const { data, error } = await supabase.from('ragaz').select();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const class_fetcher = async () => {
  try {
    const { data, error } = await supabase.from('class').select();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const bloods_fetcher = async () => {
  try {
    const { data, error } = await supabase.from('blood').select();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const travel_fetcher = async () => {
  try {
    const { data, error } = await supabase.from('travel').select();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const course_fetcher = async () => {
  try {
    const { data, error } = await supabase.from('course').select();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};


export const subject_fetcher = async () => {
  try {
    const { data, error } = await supabase.from('subject').select();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const single_teacher_fetcher = async (id) => {
  try {
    const { data, error } = await supabase.from('teacher').select().eq("id", id).single();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const single_course_fetcher = async (id) => {
  try {
    const { data, error } = await supabase.from('course').select().eq("id", id).single();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};



export const all_data_fetcher = async () => {
  try {
    const { data, error } = await supabase.rpc('fetch_all_data').select()
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const teacher_fetcher = async () => {
  try {
    const { data, error } = await supabase.from('teacher').select();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const student_fetcher = async() => {
  try {
    const {data, error} = await supabase.from("student").select()
    if(error) {
      console.log(error)
      return null;
    }
    return data;
  } catch(e) {
    console.log(e)
    return null;
  }
}

export const single_income_fecther = async (id) => {
  try {
    const { data, error } = await supabase.from('income').select(`*, student(*), course(*)`).eq("id", id).single();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const single_expense_fecther = async (id) => {
  try {
    const { data, error } = await supabase.from('expense').select(`*, student(*), course(*), teacher(*)`).eq("id", id).single();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};


export const reklam_fetcher = async() => {
  try {
    const {data, error} = await supabase.from("reklam").select().limit(10).order("created_at", {ascending: false})
    if(error) {
      console.log(error)
      return null;
    }
    return data;
  } catch(e) {
    console.log(e)
    return null;
  }
}

export const single_share_fetcher = async(id) => {
 try {
    const { data, error } = await supabase.from('share').select(`*, course(*), teacher(*)`).eq("id", id).single();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
