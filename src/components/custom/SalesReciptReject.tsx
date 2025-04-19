import { RequestData } from "@/App";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ViewDetailProps {
  data: RequestData;
}

const SalesReciptReject: React.FC<ViewDetailProps> = ({ data }) => {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant="outline">Rejected</Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-white rounded-lg shadow-lg p-6 font-sans overflow-y-auto max-h-[90vh]">
        <div className="border border-gray-300 rounded-md p-4">
          {/* Header */}
          <div className="text-center border-b border-gray-300 pb-2 mb-4">
            <h2 className="text-xl font-bold">
              Confirmation of sales cancellation (MBL to Merchant)
            </h2>
          </div>

          {/* Document Header Info */}
          <div className="flex justify-between mb-6">
            <div>
              <p className="mb-1">To, ABC pvt. Ltd.</p>
              <p>Reference (Sale Receipt #) {data._id.split("-")[0]}</p>
            </div>
            <div>
              <p>{data.updatedAt.split("T")[0]}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-6">
            <p className="text-sm">
              With reference to the details of item(s) mentioned in MBL Sales
              confirmation via Sale Receipt (reference #{" "}
              {data?._id.split("-")[0]}), We hereby cancel the sale as per MOU{" "}
              {"{XXXX}"} signed on DATE {data?.createdAt.split("T")[0]}. Detail
              of item(s) is(are) given below. Please take physical possession of
              the below assets from MBL agent Mr/ MS {data?.name} and confirm.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-sm">
                    Asset Name
                  </th>
                  <th className="border border-gray-300 p-2 text-sm">
                    Engine/Chassis #
                  </th>
                  <th className="border border-gray-300 p-2 text-sm">Rate</th>
                  <th className="border border-gray-300 p-2 text-sm">Qty</th>
                  <th className="border border-gray-300 p-2 text-sm">
                    Total Amount (PKR) {}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-sm">
                    {data.bikeVarient}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm">
                    {data?.engineNo}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm">
                    {" "}
                    {data.price_meezan}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm text-center">
                    1
                  </td>
                  <td className="border border-gray-300 p-2 text-sm">
                    {" "}
                    {data.price_meezan}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4">
            <p>From, Meezan Bank Ltd.</p>
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" className="border-gray-300">
            Close
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Download
          </Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default SalesReciptReject;
