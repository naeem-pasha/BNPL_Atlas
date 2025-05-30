import { RequestData } from "@/App";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";

interface DeliveryAuthorizationProps {
  data: RequestData;
}

export default function DeliveryAuthorizationDialog({
  data,
}: DeliveryAuthorizationProps) {
  const minDate = new Date().toISOString().split("T")[0];

  const [deliveryDate, setDeliveryDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryDate(event.target.value);
  };

  const handleAssignDate = async (id: string) => {
    if (!deliveryDate) {
      alert("Please select a delivery date.");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_VENDOR_URL}/aprove/assaign-date/${id}`,
        { deliveryDate }
      );

      if (response.data.success) {
        window.location.reload();
      } else {
        alert("Failed to assign the date.");
      }
    } catch (error) {
      console.error("Error assigning date:", error);
      alert("An error occurred while assigning the date.");
    }
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant="outline">Delivery Letter Issued</Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="max-w-4xl bg-white rounded-lg shadow-lg p-6 font-sans overflow-y-auto max-h-[90vh]">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center mb-4">
            Delivery Authorization Notice
          </h1>
          <p className="text-right font-semibold text-gray-600">
            {data.updatedAt.split("T")[0]}
          </p>
        </div>

        {/* To Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">To,</h2>
          <div className="grid md:grid-cols-2 gap-4 border-b-2 pb-4">
            <div>
              <p className="font-semibold">Honda Atlas</p>
              <p className="text-gray-600">Karachi</p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2"></div>
              <div className="flex gap-2">
                <span className="font-semibold w-20">From:</span>
                <span>Meezan Bank Ltd.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4 border-b-2 border-dashed pb-2">
            Assignment of Delivery Date
          </h3>
          <p className="text-gray-600 mb-4">
            With reference to the Sales Receipt of the Purchase order, Number{" "}
            {data?._id.split("-")[0]}, dated
            <span className="font-semibold">
              {" "}
              {data?.updatedAt.split("T")[0]}
              {", "}
            </span>
            we hereby request you to please assign date for delivery of the
            bike.
          </p>
        </div>
        {/* Main Table */}

        {/* Buyer Information */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="font-semibold w-32">Delivery Time Period:</span>
              <span>
                <Input
                  type="date"
                  min={minDate}
                  value={data.deliveryDate || deliveryDate}
                  onChange={handleDateChange}
                  // disabled={!data.deliveryDate}
                />{" "}
                (9AM to 6 PM)
              </span>
            </div>
          </div>
          <Button
            disabled={!!data.deliveryDate}
            onClick={() => handleAssignDate(data._id)}
          >
            Assign Date
          </Button>
        </div>

        {/* Footer Section */}
        <div className="mt-8 border-t-2 pt-4">
          <div className="text-right">
            <p className="text-lg font-bold text-gray-700">
              Meezan Bank Limited
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
