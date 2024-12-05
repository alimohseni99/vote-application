import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <Button className="w-full">Show Details</Button>
      </CardFooter>
    </Card>
  );
}
