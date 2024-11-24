import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  title: string;
  time: Date;
  options: string[];
};

export function ElectionCard({ title, time, options }: Props) {
  return (
    <Card className="!w-[350px] space-y-6 p-6 shadow-md rounded-lg mx-auto border mt-20">
      <CardHeader>
        <CardTitle>
          <strong>Title: </strong>: {title}
        </CardTitle>
        <CardDescription>
          <p>Time: {time.toLocaleString()}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Option</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {options.map((option, index) => (
                    <SelectItem key={`${option}-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>VOTE</Button>
      </CardFooter>
    </Card>
  );
}
