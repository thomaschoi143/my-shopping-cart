import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { addItem } from "../features/cart/cartSlice";
import { State } from "../app/state";
import { Item } from "../app/types";
import { MAX_ITEM_QUANTITY } from "../app/constants";

type AddToCartBtnProps = {
  item: Item;
  size?: "lg" | "sm" | undefined;
  className?: string;
};

const AddToCartBtn = ({ item, size, className }: AddToCartBtnProps) => {
  const dispatch = useDispatch();
  const { name } = item;
  const quantity = useSelector((state: State) => state.cart[name]?.quantity);

  const onClickHandler = (item: Item) => {
    dispatch(addItem(item));
  };

  return (
    <Button
      onClick={() => onClickHandler(item)}
      disabled={quantity === MAX_ITEM_QUANTITY}
      className={className}
      size={size}
    >
      ADD TO CART
    </Button>
  );
};

export default AddToCartBtn;
