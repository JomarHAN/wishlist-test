import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import db from "../db.server";
import { cors } from "remix-utils/cors";

type TypeWishlistItem = {
  customerId: string;
  productId: string;
  shop: string;
};

export const loader = async () => {
  return json({
    status: "okay",
    message: "Hello from heaven",
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const method = request.method;
  const formData = await request.formData();
  const dataObj = Object.fromEntries(formData);
  const { customerId, productId, shop } = dataObj;

  if (!customerId || !productId || !shop) {
    return json({
      message: "Missing required arguements like: customerId, productId, shop",
    });
  }

  switch (method) {
    case "POST":
      const wishlist = await db.wishlist.create({
        data: {
          customerId,
          productId,
          shop,
        } as TypeWishlistItem,
      });
      const response = json({
        message: "post success",
        method: "post",
        wishlist: wishlist,
      });
      return cors(request, response);

    case "PATCH":
      return json({ message: "patch success", method: "patch" });

    default:
      return json({ message: "everything else so far so good" });
  }
};
