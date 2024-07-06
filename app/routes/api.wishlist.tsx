import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import db from "../db.server";
import { cors } from "remix-utils/cors";

type TypeWishlist = {
  customerId: string;
  productId: string;
  shop: string;
  _action: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const customerId = url.searchParams.get("customerId");
  const productId = url.searchParams.get("productId");
  const shop = url.searchParams.get("shop");

  if (!customerId || !productId || !shop) {
    alert("missing required datas");
    return;
  }

  const wishlistFound = await db.wishlist.findMany({
    where: {
      customerId,
      productId,
      shop,
    },
  });
  const response = json({
    message: "get wishlist successfull",
    wishlisted: wishlistFound.length > 0 ? true : false,
  });
  return cors(request, response);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const method = request.method;
  const formData = await request.formData();
  const dataObj = Object.fromEntries(formData);
  const { customerId, productId, shop, _action } = dataObj as TypeWishlist;

  if (!customerId || !productId || !shop || !_action) {
    return json({
      message: "Missing required arguements like: customerId, productId, shop",
    });
  }

  switch (_action) {
    case "CREATE":
      await db.wishlist.create({
        data: {
          customerId,
          productId,
          shop,
        },
      });
      const response = json({
        message: "post success",
        method: method,
        wishlisted: true,
      });
      return cors(request, response);

    case "PATCH":
      return json({ message: "patch success", method: "patch" });

    case "DELETE":
      await db.wishlist.deleteMany({
        where: {
          customerId,
          productId,
          shop,
        },
      });

      const resDelete = json({
        message: "Deleted successful",
        method: _action,
        wishlisted: false,
      });
      return cors(request, resDelete);

    default:
      return json({ message: "everything else so far so good" });
  }
};
