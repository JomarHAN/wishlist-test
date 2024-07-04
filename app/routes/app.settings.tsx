import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Button,
} from "@shopify/polaris";
import { useState } from "react";

type dataType = {
  name: string | "";
  description: string | "";
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const dataObject = Object.fromEntries(formData);
  return dataObject;
};

export const loader = async () => {
  let data: dataType = {
    name: "App name",
    description: "App description",
  };
  return json(data);
};

export default function SettingsPage() {
  const loaderData: dataType = useLoaderData();
  const [textField, setTextField] = useState(loaderData);
  return (
    <Page
      primaryAction={{ content: "View on your store", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
      ]}
    >
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: "400", sm: "0" }}
            paddingInlineEnd={{ xs: "400", sm: "0" }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="post">
              <BlockStack gap="400">
                <TextField
                  autoComplete=""
                  label="App name"
                  name="name"
                  value={textField.name}
                  onChange={(value) =>
                    setTextField({ ...textField, name: value })
                  }
                />
                <TextField
                  autoComplete=""
                  label="Description"
                  name="description"
                  value={textField.description}
                  onChange={(value) =>
                    setTextField({ ...textField, description: value })
                  }
                />
                <Button submit fullWidth variant="primary">
                  Sumit
                </Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}
