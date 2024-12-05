import { useSelector } from "react-redux";
import {formatCurrency} from "../../utils/helpers"
import DeleteItem from "./DeleteItem";
import UpdateItemQty from "./UpdateItemQty";
import { getCurrentQtyByIt } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, qty, totalPrice } = item;
  const currentQty = useSelector(getCurrentQtyByIt(pizzaId))

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {qty}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQty pizzaId={pizzaId} currentQty={currentQty}></UpdateItemQty>
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
