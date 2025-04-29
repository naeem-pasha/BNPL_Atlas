import { RequestData } from "@/App";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ViewDetailProps {
  data: RequestData;
}

const Invoice: React.FC<ViewDetailProps> = ({ data }) => {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant="outline">Invoice</Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-white rounded-lg shadow-lg p-6 font-sans overflow-y-auto max-h-[90vh]">
        <div className="container mx-auto p-6 max-w-2xl">
          <div className="border border-gray-400 p-6">
            <h1 className="text-center text-xl font-bold mb-6">
              Intimation for Sale Certificate / Sale Invoice
            </h1>

            {/* To Section */}
            <div className="mb-4">
              <p className="mb-2">
                To{" "}
                <span className="font-bold">
                  <p>Honda Atlas</p>
                </span>
              </p>
            </div>

            {/* Main Content */}
            <div className="mb-4">
              <p className="mb-2">
                With reference to the bike sold to MBL, having Engine No.
                <span className="font-bold">{data.engineNo}</span> & Chassis No.{" "}
                <span className="font-bold">{data.chasisNo}</span> and which you
                are holding right now on trust basis.
              </p>

              <p className="mb-2">
                This is to inform you that we have now sold the Bike to one of
                our financing customer. Therefore, you are requested to please
                issue formal sale certificate / sale invoice in favor of our
                customer (the End User).
              </p>
            </div>

            {/* Details Section */}
            <div className="mb-4">
              <h2 className="font-bold mb-2">Details are given below:</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <span>Customer Name:</span>{" "}
                    <span className="font-bold">{data?.name}</span>
                  </p>
                  <p>
                    <span>CNIC Number:</span>{" "}
                    <span className="font-bold">{data?.cnic}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>Contact Number:</span>{" "}
                    <span className="font-bold">{data?.phoneNo}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="mt-12">
              <p>Regards</p>
              <div className="mt-8">
                <p>____________________</p>
                <p className="font-bold">Meezan Bank</p>
              </div>
            </div>

            {/* Note Section */}
            <div className="mt-6 border-t pt-4 text-sm italic">
              <p>
                Note: Provided Sale certificate / Sale invoice will be used by
                customer to get the Bike registered on his name.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Invoice;
