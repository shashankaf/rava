
interface InputStateProps {
  name: string,
  value: string | number,
  setValue: any,
  placeholder: string
}

export default function InputState({name, value, setValue, placeholder}: InputStateProps) {
  return (
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input input-bordered w-full m-2"
          placeholder={placeholder}
        />
 
  )
}
