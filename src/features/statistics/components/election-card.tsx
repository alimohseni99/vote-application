import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { RadialChart } from "./radial-chart";

type Props = {
  title: string;
  time: string;
};

export function ElectionCardConcluded({ title, time }: Props) {
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-lg border border-gray-200 ">
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle>
          <strong>Title:</strong> {title}
        </CardTitle>
        <CardDescription>
          <p>
            <strong>Time:</strong> {time}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Show Result</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle className="justify-center items-center text-center">
              Summery of the Election
            </DialogTitle>
            <div className="flex justify-center items-center">
              <RadialChart />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
