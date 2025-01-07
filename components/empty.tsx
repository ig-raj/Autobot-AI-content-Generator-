import Image from "next/image";
interface EmptyProps {
    label: string;
}



export const Empty = ({
   label
}: EmptyProps) => {
    return (
      <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="relative h-72 w-72 item-center justify-center">
          <Image alt="Empty" fill src="/logo.png" />
        </div>
        <p className="text-muted-foreground text-sm text-center">{label}</p>
      </div>
    );
}