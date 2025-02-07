import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Could not find requested resource</p>
        </CardContent>
      </Card>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </>
  );
}
