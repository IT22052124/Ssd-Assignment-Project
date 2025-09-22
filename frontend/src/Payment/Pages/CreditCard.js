import { useNavigate,useLocation} from "react-router-dom";
import CardList from "./Components/CreditTable";

function Credit() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNewCreditClick = () => {
    
const queryParams = new URLSearchParams(location.search);

const subtotal = queryParams.get("subtotal");
const shippingFee = queryParams.get("shippingFee");
const total = queryParams.get("total");
const selectedItemsString = queryParams.get("selectedItems");
const id = selectedItemsString ? selectedItemsString.split(",") : [];

    // Construct the URL string with query parameters
    const queryString = `/CC/new?subtotal=${subtotal}&shippingFee=${shippingFee}&total=${total}&selectedItems=${id.join(",")}`;

    // Navigate to the new page with the constructed URL
    navigate(queryString);
  };

  return (
    <div className="Credit">
      <div class="min-h-screen h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div class="container mx-auto">
          <div class="card" style={{ width: "100%" }}>
            <div class="flex items-center justify-between">
              <h1 class="text-3xl my-8">Credit Card List</h1>
              <div class="relative mb-0 mt-1 lg:w-96"></div>
              <div onClick={handleNewCreditClick}> {/* Use an onClick event */}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  class="text-sky-800 text-4xl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"></path>
                </svg>
              </div>
            </div>
            <CardList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credit;

