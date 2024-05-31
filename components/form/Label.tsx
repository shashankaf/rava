interface LableProps {
  children: React.ReactNode
}
export default function Label({ children }: LableProps) {
  return (
    <label
      className="w-full font-bold text-lg text-white mx-2"
    >{children}</label>
  );
}
