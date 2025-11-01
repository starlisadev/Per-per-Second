import { useState } from "react";
import { TopUpModal } from "../TopUpModal";
import { Button } from "@/components/ui/button";

export default function TopUpModalExample() {
  const [open, setOpen] = useState(true);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Top Up Modal</Button>
      <TopUpModal
        open={open}
        onOpenChange={setOpen}
        currentBalance="2.35"
        onTopUp={(amount) => console.log("Top up:", amount)}
      />
    </div>
  );
}
