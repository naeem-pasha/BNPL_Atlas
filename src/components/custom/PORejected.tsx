import { RequestData } from "@/App";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";

interface DeliveryAuthorizationProps {
  data: RequestData;
}

export default function MusawamahRejected({
  data,
}: DeliveryAuthorizationProps) {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant="outline">Rejected</Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="max-w-4xl bg-white rounded-lg shadow-lg p-6 font-sans overflow-y-auto max-h-[90vh]">
        <p>Cancellation of Vehicle Purchase – {data.engineNo}</p>
        <p>Dear Atlas Honda </p>
        <p>
          This is to inform you that our financing customer has decided not to
          proceed with the purchase of the vehicle. Accordingly, the sale
          transaction between MBL and you, pertaining to the vehicle with
          chassis number {data.engineNo}, stands cancelled.
        </p>
        <p>
          You may now proceed with the disposal or resale of the said vehicle at
          your discretion. Thank you for your continued cooperation.
        </p>
      </DialogContent>
    </Dialog>
  );
}
