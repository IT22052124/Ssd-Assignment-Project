import {
  BrowserRouter as Router,
  Route,
  Routes ,
} from "react-router-dom";
import AddProduct from "./Product/Pages/Addproduct";
import Updateproduct from "./Product/Pages/Updateproduct";
import Products from "./Product/Pages/Products";
import RestockProduct from "./Product/Pages/RestockProduct"
import Suppliers from "./Supplier/Pages/Suppliers";
import CreateSupplier from "./Supplier/Pages/CreateSupplier";
import Updatesupplier from "./Supplier/Pages/Updatesupplier";
import ViewSupplier from "./Supplier/Pages/ViewSupplier";
import ViewPurchase from "./Supplier/Pages/ViewPurchase";
import ViewPendingPurchase from "./Supplier/Pages/ViewPendingPurchase";
import Delivery from "./Delivery/Pages/Delivery";
import CreateDelivery from "./Delivery/Pages/CreateDelivery";
import UpdateDelivery from "./Delivery/Pages/UpdateDelivery";
import CreateEmployee from "./Employee/Pages/CreateEmployee";
import Employee from "./Employee/Pages/Employee";
import Updateemployee from "./Employee/Pages/Updateemployee";
import AddCC from "./Payment/Pages/AddCreditCard";
import MarkAttendance from "./Employee/Pages/Attendance";
import CCForm from "./Payment/Pages/Components/CreditCardForm";
import Customers from "./Customer/Customers";
import RegisterCustomer from "./Customer/RegisterCustomer";
import UpdateCustomer from "./Customer/UpdateCustomer";
import TopCustomers from "./Customer/TopCustomers";
import AssignmentDelivery from "./Delivery/Pages/AssignmentDelivery";
import Dashboard from "./Dashboard/Dashboard";
import Cart from "./Cart/Pages/Cart";
import Offpay from "./Payment/Pages/OfflinePayment";
import CC from "./Payment/Pages/CreditCard"
import UpdateCC from "./Payment/Pages/Components/CCUpdateForm";
import ViewCustomer from "./Customer/ViewCustomer";
import CreateWholesalecustomer from "./Wholesalecustomer/Pages/CreateWholesalecustomer"
import Wholesalecustomer from "./Wholesalecustomer/Pages/Wholesalecustomer";
import UpdateWholesalecustomer from "./Wholesalecustomer/Pages/UpdateWholesalecustomer";
import ViewWholesalecustomer from "./Wholesalecustomer/Pages/ViewWholesalecustomer";
import WholesalecustomerReport from "./Wholesalecustomer/Pages/reportWholesalecustomer";
import LoginPage from "./Login/LoginPage";
import ProductDetails from "./Product/Pages/Components/ProductDetails";
import SalaryCalculatorForm from "./Employee/Pages/Salaryform";
import Attendance from "./Employee/Pages/listAttendance";
import ProductCustomerUI from "./Product/Pages/ProductCustomerUI";
import ViewEmployees from "./Employee/Pages/ViewEmployees";
import { AuthProvider } from './Shared/Components/context/authcontext';
import ViewDelivery from "./Delivery/Pages/ViewDelivery";
import ProtectedRouteCustomer from "./Shared/Components/context/PrivateRoute";
import CheckLogin from "./Shared/Components/context/checkLogin";
import ConfirmOrderPage from "./Order/OrderConfirm";
import ProductReview from "./Product/Pages/ProductReview"
import { DeliveryLoginPage } from "./Delivery/Pages/Components/DeliveryLogin"
import CheckDeliveryLogin from "./Shared/Components/context/checkdeliveryLogin";
import DeliveryPersonProfile from "./Delivery/Pages/Components/DeliveryPersonProfile";
import { DeliveryAuthProvider } from "./Shared/Components/context/DeliveryAuthContext";
import ViewCost from "./Profit/Pages/ViewCost";
import ViewProfit from "./Profit/Pages/ViewProfit";
import ProfitReport from "./Profit/Pages/ProfitReport";
import ProductReport from "./Product/Pages/ProductReport";
import Order from "./Order/Order";
import CalculateProfit from "./Profit/Pages/CalculateProfit";
import HistoryTable from "./Employee/Pages/salaryHistory"
import Report from "./Employee/Pages/reportEmp";
import SupplierReport from "./Supplier/Pages/SupplierReport";
import InquiryReport from "./Inquiry/Pages/InquiryReport";
import DeliveryPersonOrders from "./Delivery/Pages/CompleteDelivery";
import Employeelogin from "./Employee/Pages/Employeelogin"
import EmployeeloginformUpdate from "./Employee/Pages/Components/employeeloginformUpdate"
import Employeeloginform from "./Employee/Pages/Components/EmployeeloginForm"
import BillingUI from "./Invoice/Pages/BillingUI";
import DeliveryReport from "./Delivery/Pages/DeliveryReport";
import OrderReport from "./Order/OrderReport"
import OrderHistory from "./Order/OrderHistory"
import LoginPageEmployee from "./LoginEmployee/LoginEmployee";
import CheckEmployeelogin from "./Shared/Components/context/checkemployeeLogin"
import EmployeeAuthProvider from "./Shared/Components/context/EmployeeAuthContext";
import Faq from "./Faq/Pages/Faq";
import FaqCreate from "./Faq/Pages/CreateFaq";
import FaqUpdate from "./Faq/Pages/UpdateFaq";
import FaqView from "./Faq/Pages/Viewfaq";
import FaqViewCustomer from "./Faq/Pages/CustomerFaqView";
import FaqCustomer from "./Faq/Pages/FaqTableCustomer";
import InquiryCustomer from "./Inquiry/Pages/InquiryTableCustomer";
import Inquiry from "./Inquiry/Pages/InquiryAdmin";
import InquiryViewAdmin from "./Inquiry/Pages/ViewInquiryAdmin";
import InquiryViewCustomer from "./Inquiry/Pages/ViewInquiryCustomer";
import InquiryCreate from "./Inquiry/Pages/CreateInquiry";
import ProtectedRouteEmployee from "./Shared/Components/context/PrivateEmployeeRoute";
import ProtectedRouteCashier from "./Shared/Components/context/PrivateCashierRoute";
import InvoiceTable from "./Invoice/Pages/invoiceTable";

const App = () => {
  return (
    <AuthProvider >
    <DeliveryAuthProvider>
    <EmployeeAuthProvider>
    <Router>
      <Routes >
        <Route element={<ProtectedRouteCustomer/>}>
          <Route path="/products" exact element={<ProductCustomerUI/>}/>
          <Route path="/ProductList/:id" exact element={<ProductDetails/>}/>
          <Route path="/faqs/" exact element={<FaqCustomer/>}/>
          <Route path="/inquiries/" exact element={<InquiryCustomer/>}/>
          <Route path="/inquiry/create" exact element={<InquiryCreate/>}/>
          <Route path="/faqs/view/:id" exact element={<FaqViewCustomer/>}/>
          <Route path="/inquiries/view/:id" exact element={<InquiryViewCustomer/>}/>
          <Route path="/CC/new" exact element={<AddCC/>}/>
          <Route path="/Cart" exact element={<Cart/>}/>
          <Route path="/offpay" exact element={<Offpay/>}/>
          <Route path="/CC" exact element={<CC/>}/>
          <Route path="/CC/:id" exact element={<UpdateCC/>}/>
          <Route path="/CC/new" exact element={<CCForm/>}/>         
        </Route>

        {/* <Route element={<ProtectedRouteEmployee/>}> */}

        <Route path="/Dashboard" exact element={<Dashboard/>}/>
        <Route path="/Product" exact element={<Products/>}/>
        <Route path="/ProductReviews" exact element={<ProductReview/>}/>
        <Route path="/Product/update/:id" exact element={<Updateproduct/>}/> 
        <Route path="/Product/new" exact element={<AddProduct/>}/>
        <Route path="/Product/Restock" exact element={<RestockProduct/>}/>
        <Route path="/Supplier" exact element={<Suppliers/>}/>
        <Route path="/Supplier/create" exact element={<CreateSupplier/>}/>
        <Route path="/Supplier/update/:id" exact element={<Updatesupplier/>}/>
        <Route path="/Supplier/view/:id" exact element={<ViewSupplier/>}/>
        <Route path="/Supplier/purchase" exact element={<ViewPurchase/>}/>
        <Route path="/Supplier/pendingpurchase" exact element={<ViewPendingPurchase/>}/>
        <Route path="/Supplier/report" exact element={<SupplierReport/>}/>
        <Route path="/Delivery" exact element={<Delivery/>}/>
        <Route path="/Delivery/create" exact element={<CreateDelivery/>}/>
        <Route path="/Delivery/update/:id" exact element={<UpdateDelivery/>}/>
        <Route path="/Employee" exact element={<Employee/>}/>
        <Route path="/Employee/update/:id" exact element={<Updateemployee/>}/> 
        <Route path="/Employee/new" exact element={<CreateEmployee/>}/>
        <Route path="/Employee/view/:id" exact element={<ViewEmployees/>}/>
        
        <Route path="/Customer" exact element={<Customers/>}/>
        <Route path="/Customer/TopCustomers" exact element={<TopCustomers/>}/>
        <Route path="/AssignDelivery" exact element={<AssignmentDelivery/>}/>
       
        <Route path="/AssignDelivery" exact element={<AssignmentDelivery/>}/>
        <Route path="/Wholesalecustomer/create" exact element={<CreateWholesalecustomer/>}/>
        <Route path="/Wholesalecustomer" exact element={<Wholesalecustomer/>}/>
        <Route path="/Wholesalecustomer/update/:id" exact element={<UpdateWholesalecustomer/>}/>
        <Route path="/Wholesalecustomer/view/:id" exact element={<ViewWholesalecustomer/>}/>
        <Route path="/Wholesalecustomer/report" exact element={<WholesalecustomerReport/>}/>
        <Route path="/Employee/attendance" exact element={<MarkAttendance />}/>
        <Route path="/Employee/attendancelist" exact element={<Attendance />}/>
        <Route path="/Employeelogin" exact element={<Employeelogin />}/>
        <Route path="/Employeelogin/new" exact element={<Employeeloginform />}/>
        <Route path="/Employeelogin/update/:id" exact element={<EmployeeloginformUpdate />}/>
        <Route path="/Salaryform" exact element={<SalaryCalculatorForm />}/>
        <Route path="/salaryHistory" exact element={<HistoryTable/>}/>
        <Route path="/employee/report" exact element={<Report/>}/>
        <Route path="/delivery/report" exact element={<DeliveryReport/>}/>
        <Route path="/Profit/cost" exact element={<ViewCost/>}/>
        <Route path="/Profit/profit" exact element={<ViewProfit/>}/>
        <Route path="/Profit/report" exact element={<ProfitReport/>}/>
        <Route path="/Order" exact element={<Order/>}/>
        <Route path="/Profit/calculate" exact element={<CalculateProfit/>}/>
      
        <Route path="/faq/" exact element={<Faq/>}/>
        <Route path="/faq/create" exact element={<FaqCreate/>}/>
        <Route path="/faqs/" exact element={<FaqCustomer/>}/>
        <Route path="/faq/update/:id" exact element={<FaqUpdate/>}/>
        <Route path="/faq/view/:id" exact element={<FaqView/>}/>
        <Route path="/inquiry_admin/" exact element={<Inquiry/>}/>
        <Route path="/inquiry_admin/view/:id" exact element={<InquiryViewAdmin/>}/>
        <Route path="/inquiry_admin/report" exact element={<InquiryReport/>}/>        
        <Route path="/ProductReport" exact element={<ProductReport/>}/> 
        <Route path="/invoice" exact element={<InvoiceTable/>}/>
        {/* </Route> */}
        <Route element={<ProtectedRouteCashier/>}>
        
        <Route path="/Billing" exact element={<BillingUI/>}/>


        </Route>
        <Route path="/" exact element={
          <CheckLogin>
            <LoginPage/>
          </CheckLogin>}/> 

          <Route path="/LoginEmployee" exact element={
          
            <LoginPageEmployee/>
         }/> 
       
        <Route path="/Customer/view/" exact element={<ViewCustomer/>}/>
        <Route path="/Customer/update/:id" exact element={<UpdateCustomer/>}/>
        <Route path="/Customer/create" exact element={<RegisterCustomer/>}/>
        <Route path="/Delivery/view/:id" exact element={<ViewDelivery/>}/>
        <Route path="/confirm-order"exact element={<ConfirmOrderPage/>} />
        <Route path="/OrderReport"exact element={<OrderReport/>} />
        <Route path="/OrderHistory"exact element={<OrderHistory/>} />
        <Route path="/deliverylogin" exact element={
          
            <DeliveryLoginPage/>
        
        }/>
        <Route path="/deliverypersonprofile" exact element={
          
            <DeliveryPersonProfile/>
        }/>
         <Route path="/deliverypersonorder" exact element={
          
          <DeliveryPersonOrders/>
      }/>
      </Routes>
    </Router>
   </EmployeeAuthProvider>
    </DeliveryAuthProvider>
    </AuthProvider>
  );
};

export default App;
