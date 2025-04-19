import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MeezanLogo from "@/assets/meezanHeader.png";
import { RequestData } from "@/App";

interface dailogProps {
  customer: RequestData;
}

const Dailogbox = ({ customer }: dailogProps) => {
  // const handleViewDownload = async (request: RequestData) => {
  //   const blob = await pdf(<MyDocument details={request} />).toBlob();
  //   const url = URL.createObjectURL(blob);
  //   window.open(url);
  // };

  return (
    <Dialog>
      <DialogTrigger>
        <button
          className={` bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs font-medium transition-colors`}
        >
          View PO
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <header className="border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center justify-around space-x-4">
            <div className="w-32 h-full bg-gray-200">
              <img src={MeezanLogo} alt="meezan logo" />
            </div>
            <h1 className="text-2xl font-bold">Purchase Order</h1>
          </div>
        </header>
        {/* <!-- Main Form Container --> */}
        <div>
          <div className="p-4 max-w-4xl mx-auto font-sans">
            {/* Header Section */}
            <div className="flex justify-between mb-6">
              <div className="block gap-4">
                <span className="font-semibold">Order Reference #</span>
                <br />
                <span>{customer._id}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-semibold">Order Date:</span>
                <span>{customer.createdAt.toString().split("T")[0]}</span>
              </div>
            </div>

            {/* Order To/By Section */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className="font-semibold">Order To:</span>
                  <span>M/S. Honda Atlas</span>
                </div>
                {/* <div className="ml-8">
                  <div>Address:</div>
                  <div>&lt;Customer address&gt;</div>
                </div> */}
              </div>

              <div>
                <div className="flex gap-2 mb-2">
                  <span className="font-semibold">Order By:</span>
                  <span>Meezan Bank Ltd. C/O Mr. ABC</span>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <table className="w-full mb-4 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">S.No.</th>
                  <th className="border p-2 text-left">Model Description</th>
                  <th className="border p-2 text-left">Quantity</th>
                  <th className="border p-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">1</td>
                  <td className="border p-2">{customer.bikeVarient}</td>
                  <td className="border p-2">1</td>
                  <td className="border p-2">{customer.price_meezan}</td>
                </tr>
              </tbody>
            </table>

            {/* Total Section */}
            <div className="flex justify-end gap-4 mb-6">
              <span className="font-semibold">Total</span>
              <span>{customer.price_meezan}</span>
            </div>

            {/* Notification Section */}
            <div className="text-sm italic">
              Please Notify the Bank immediately if this order cannot be
              completed on or before 6-Apr-19
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Dailogbox;
