import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader = async () => {
  return json({
    status: "okay",
    message: "Hello from heaven",
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const method = request.method;

  switch (method) {
    case "POST":
      return json({ message: "post success", method: "post" });

    case "PATCH":
      return json({ message: "patch success", method: "patch" });

    default:
      return json({ message: "everything else so far so good" });
  }
};
