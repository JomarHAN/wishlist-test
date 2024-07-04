import {
  Card,
  Layout,
  Page,
  BlockStack,
  Button,
  TextField,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { Form, json, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { ActionFunctionArgs } from "@remix-run/node";

import db from "../db.server";

type TextFieldType = {
  name: string | "";
  description: string | "";
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const dataObject = Object.fromEntries(formData) as TextFieldType;
  await db.settings.upsert({
    where: { id: "1" },
    update: {
      id: "1",
      name: dataObject.name,
      description: dataObject.description,
    },
    create: {
      id: "1",
      name: dataObject.name,
      description: dataObject.description,
    },
  });
  return json(dataObject);
};

export const loader = async () => {
  const dataText = await db.settings.findFirst();

  return json(dataText);
};

export default function SettingsPage() {
  const loaderData = useLoaderData<typeof loader>();

  const [textFieldValue, setTextFieldValue] = useState<TextFieldType>({
    name: loaderData?.name || "",
    description: loaderData?.description || "",
  });
  return (
    <Page>
      <TitleBar title="Settings page" />
      <Layout>
        <Layout.Section>
          <Card>
            <Form method="post">
              <BlockStack gap="400">
                <TextField
                  autoComplete=""
                  label="App Name"
                  value={textFieldValue.name}
                  name="name"
                  onChange={(value) => {
                    setTextFieldValue({
                      ...textFieldValue,
                      name: value,
                    });
                  }}
                />
                <TextField
                  autoComplete=""
                  label="Description"
                  value={textFieldValue.description}
                  name="description"
                  onChange={(value) => {
                    setTextFieldValue({
                      ...textFieldValue,
                      description: value,
                    });
                  }}
                />
                <Button submit fullWidth variant="primary">
                  Submit
                </Button>
              </BlockStack>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
