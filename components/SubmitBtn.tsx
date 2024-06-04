import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`${pending ? "loading-spinner loading-sm" : ""} btn btn-primary text-white text-lg w-full block my-4`}
      aria-disabled={pending}
    >
      ناردن
    </button>
  );
};


