import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";
import { useForm } from "../../../Shared/hooks/form-hook";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../../Shared/Components/util/validate";
import { GrView } from "react-icons/gr";
import TableRow from "../../../Shared/Components/UiElements/TableRow";


function PopUpPurchase(props) {
    const [isclick, setisClick] = useState(false);
    const [loading, setLoading] = useState(false);
    const [purchase, setpurchase] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/supplierproduct/purchase/list/${props.id}`)
      .then((res) => {
        setpurchase(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  console.log(purchase)
    const togglemodel = () => {
      setisClick(!isclick);
    };
  
    return (
      <>
        <Link
            
          onClick={togglemodel}
        >
          <center className="pr-24">
            <GrView />
          </center>
        </Link>
        {isclick && (
          <>
            <div
              id="deleteModal"
              tabindex="-1"
              className="fixed top-0 z-40 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 "
              aria-modal="true"
              role="dialog"
            >
              {loading ? (
                <Loader />
              ) : (
                <div class="relative p-4 w-full max-w-[820px] h-full md:h-auto">
                  <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <button
                      onClick={togglemodel}
                      type="button"
                      class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="deleteModal"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                    
                    <>
                        <div class="mt-5 relative overflow-x-auto max-h-[520px] max-w-[820px] min-h-96 shadow-md sm:rounded-lg ">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-50 uppercase bg-red-400 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 font-semibold">Purchase ID</th>
                                <th scope="col" class="px-6 py-3 font-semibold">Supplier</th>
                                <th scope="col" class="px-6 py-3 font-semibold">Product</th>
                                <th scope="col" class="px-6 py-3 font-semibold">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <center>
                                    <Loader />
                                    </center>
                                ) : (
                                    purchase.map((item, index) => {
                                    return (
                                        <TableRow key={item._id}>
                                        <td className="px-6 py-4">{item.purchaseID.ID}</td>
                                        <td className="px-6 py-4">
                                          {item.supplier_product 
                                            ? `${item.supplier_product.supplier.ID}, ${item.supplier_product.supplier.name}` 
                                            : 'Deleted'}
                                        </td>
                                        <td className="px-6 py-4">
                                          {item.supplier_product 
                                            ? `${item.supplier_product.product.ID}, ${item.supplier_product.product.name}` 
                                            : 'Deleted'}
                                        </td>
                                        <td className="px-6 py-4">{item.Quantity}</td>
                                        </TableRow>
                                    );
                                    })
                                )}
                            </tbody>
                        </table>
                        </div>
                    </>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  };

export default PopUpPurchase;