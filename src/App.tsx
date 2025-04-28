import React, { FC, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  PersonStanding,
} from "lucide-react";
import { Switch } from "./components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Dailogbox from "./components/custom/DailogBox";
import DeliveryAuthorizationDialog from "./components/custom/DeliveryAuthorization";
import Invoice from "./components/custom/Invoice";
import FinalInvoice from "./components/custom/finalInvoice";
import SalesReciptReject from "./components/custom/SalesReciptReject";
import MusawamahRejected from "./components/custom/PORejected";

export interface RequestData {
  City: string;
  EmployID: string;
  bikeColor: string;
  bikeVarient: string;
  chasisNo: string;
  cnic: string;
  createdAt: string;
  distributerNo: string;
  email: string;
  engineNo: string;
  name: string;
  phoneNo: string;
  updatedAt: string;
  ownerShipTransfer: boolean;
  isAprovedByVendor: boolean;
  riskStatus: string;
  status: string;
  finalAcceptence: boolean;
  isPublishedDeliveryLetter: boolean;
  isAcceptAutherized: boolean;
  deliveryDate: string;
  isSendInvoiceToVendor: boolean;
  isUserAcceptDelivery: boolean;
  price_meezan: number;
  isSendFinalInvoiceToBank: boolean;
  isInvoiceRejectedByBank: boolean;
  isRejectPurchaseOrder: boolean;
  isRejectMusawamah: boolean;
  _id: string;
  __v: number;
}

const MotorcycleDashboard: React.FC = () => {
  const [data, setData] = useState<RequestData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 7;

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cnic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getAllRequest = async () => {
    try {
      const { data } = await axios.get<{
        success: boolean;
        data: RequestData[];
      }>(`${import.meta.env.VITE_VENDOR_URL}/aprove/getAllAprove`);
      if (data.success) {
        setData(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllRequest();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage motorcycle listings and customer applications
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <ShowAllDistributer />
              <DialogDemo />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      CNIC
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Employ Id
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      City
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Color
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Bike Type
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      View Form
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Engine #
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Chassis #
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Select Distributer
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                    {/* <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Customer Acceptence
                    </th> */}
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Delivery letter
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Delivered to Customer
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((customer) => (
                      <CustomerRow
                        key={customer._id}
                        customer={customer}
                        getAllRequest={getAllRequest}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={13}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center py-2 text-sm text-gray-500 border-t border-gray-200">
            <span className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Scroll horizontally to see more
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>

          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between ">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>

              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredData.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredData.length}</span>{" "}
                    results
                  </p>
                </div>

                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === index + 1
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleDashboard;

// Separate Distributor Select Component
const DistributerSelect: React.FC<{
  onSelect: (value: string) => void;
  distributerNo?: string;
  disabled: boolean;
}> = ({ onSelect, distributerNo }) => {
  const [distributers, setDistributers] = useState<
    { _id: string; name: string; phoneNo: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDistributers = async () => {
      try {
        const { data } = await axios.get<{
          data: { _id: string; name: string; phoneNo: string }[];
        }>(`${import.meta.env.VITE_VENDOR_URL}/aprove/get-distributers`);
        setDistributers(data.data);
      } catch (err) {
        setError("Failed to load distributers");
        console.error("Error fetching distributers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributers();
  }, []);

  if (distributerNo) {
    return <Input disabled value={String(distributerNo)} />;
  }

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Distributer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Distributer</SelectLabel>
          {loading ? (
            <SelectItem disabled value="loading">
              Loading...
            </SelectItem>
          ) : error ? (
            <SelectItem disabled value="error">
              {error}
            </SelectItem>
          ) : distributers.length > 0 ? (
            distributers.map((distributer) => (
              <SelectItem key={distributer._id} value={distributer.phoneNo}>
                {distributer.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="empty">
              No distributers found
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

// ShowAllDistributer Component
export const ShowAllDistributer: React.FC = () => {
  const [distributers, setDistributers] = useState<
    { _id: string; name: string; phoneNo: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDistributers = async () => {
      try {
        const { data } = await axios.get<{
          data: { _id: string; name: string; phoneNo: string; email: string }[];
        }>(`${import.meta.env.VITE_VENDOR_URL}/aprove/get-distributers`);
        setDistributers(data.data);
      } catch (error) {
        setError("Failed to load distributers. Please try again.");
        console.error("Error fetching distributers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributers();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
          <PersonStanding className="h-4 w-4" />
          <span>Show All Distributers</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>All Distributers</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            {distributers.length > 0 ? (
              <ul className="space-y-2">
                {distributers.map((distributer) => (
                  <li key={distributer._id} className="p-2 border-b">
                    <div className="font-medium">{distributer.name}</div>
                    <div className="text-sm text-gray-500">
                      {distributer.phoneNo}
                    </div>
                    <div className="text-sm text-gray-500">
                      {distributer.email}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No distributers found.</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export function DialogDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // For managing success state
  const [errorMessage, setErrorMessage] = useState(""); // For managing error state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const [loading, setLoading] = useState(false); // State to manage loading status

  const handleCreateDistributer = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const endpoint = `${
      import.meta.env.VITE_VENDOR_URL
    }/aprove/create-distributer`; // API endpoint

    const requestData = {
      name: name,
      email: email,
      phoneNo: phone,
      address: address,
    };

    setLoading(true); // Set loading to true when the request is being made

    try {
      // Send the POST request using axios
      const response = await axios.post(endpoint, requestData);

      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          // Close the dialog after a short delay to show the success message
          setIsDialogOpen(false); // Close the dialog by updating state
        }, 2000); // Adjust timeout duration as needed
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
      }
    } catch (error) {
      setIsSuccess(false);
      if (axios.isAxiosError(error)) {
        // Now 'error' is treated as an AxiosError
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Something went wrong, please try again.");
        }
      }
    } finally {
      setLoading(false); // Set loading to false after the request finishes
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setIsDialogOpen(true)} // Open the dialog when button is clicked
        >
          Create new Distributer
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create A New Distributer</DialogTitle>
          <DialogDescription>
            Make the distributer to Assign the Sale
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateDistributer} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone No
            </Label>
            <Input
              id="phone"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Address
            </Label>
            <Input
              id="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-3"
            />
          </div>

          {errorMessage && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-red-600 col-span-4 text-center">
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="submit" disabled={loading || isSuccess}>
              {loading ? "creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Main Customer Row Component

interface CustomerRowProps {
  customer: RequestData;
  getAllRequest: () => void;
}

const CustomerRow: FC<CustomerRowProps> = ({ customer, getAllRequest }) => {
  const [engineNo, setEngineNo] = useState<string>(customer.engineNo || "");
  const [chasisNo, setChasisNo] = useState<string>(customer.chasisNo || "");
  const [distributer, setDistributer] = useState<string | undefined>(
    customer.distributerNo
  );
  const [approved, setApproved] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // const isFormValid =
  //   String(engineNo).trim() !== "" &&
  //   String(chasisNo).trim() !== "" &&
  //   distributer !== undefined;

  const isSwitchDisabled = customer.chasisNo ? true : false;

  const handleSubmit = async () => {
    if (!engineNo || !chasisNo || !distributer) {
      return;
    }
    setSubmitting(true);

    const engineNoNumber = Number(engineNo);
    const chasisNoNumber = Number(chasisNo);
    const distributerNumber = Number(distributer);

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_VENDOR_URL}/aprove/yearMarked/${customer._id}`,
        {
          engineNo: engineNoNumber,
          chasisNo: chasisNoNumber,
          distributerNo: distributerNumber,
        }
      );
      if (data.success) {
        getAllRequest();
        setApproved(true);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {customer.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.cnic}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.EmployID}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.phoneNo}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.City}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.bikeColor}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.bikeVarient}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <Dailogbox customer={customer} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <Input
          className="w-40"
          value={engineNo}
          type="number"
          onChange={(e) => setEngineNo(e.target.value)}
          readOnly={approved || !!customer.engineNo}
          placeholder="Enter Engine No"
          disabled={!!customer.chasisNo && true}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <Input
          className="w-40"
          value={chasisNo}
          type="number"
          onChange={(e) => setChasisNo(e.target.value)}
          readOnly={approved || !!customer.chasisNo}
          placeholder="Enter Chassis No"
          disabled={!!customer.chasisNo && true}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <DistributerSelect
          onSelect={(value) => setDistributer(value)}
          disabled={approved}
          distributerNo={customer?.distributerNo}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            customer.riskStatus === "High"
              ? "bg-red-100 text-red-800"
              : customer.riskStatus === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {customer?.ownerShipTransfer && "Risk Transfer To Bank"}
          {customer.isInvoiceRejectedByBank && (
            <SalesReciptReject data={customer} />
          )}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2 items-center">
          <Switch
            disabled={isSwitchDisabled}
            onCheckedChange={handleSubmit}
            checked={isSwitchDisabled}
          />
          {submitting && <span className="text-xs ml-2">Submitting...</span>}
        </div>
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.finalAcceptence ? "True" : "False"}
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.isAcceptAutherized && (
          <DeliveryAuthorizationDialog data={customer} />
        )}
        {customer.isSendInvoiceToVendor && <Invoice data={customer} />}
        {customer.isUserAcceptDelivery && <FinalInvoice data={customer} />}
        {customer.isRejectMusawamah && <MusawamahRejected data={customer} />}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.isUserAcceptDelivery && (
          <p className="bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs font-medium transition-colors">
            DELIVERED
          </p>
        )}
      </td>
    </tr>
  );
};
