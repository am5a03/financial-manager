interface Props {
  label: string;
  children: React.ReactNode;
}

export default function FormFeild({ label, children }: Props) {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="date" className="w-1/6">
        {label}
      </label>
      {children}
    </div>
  );
}
