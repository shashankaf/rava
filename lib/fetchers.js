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