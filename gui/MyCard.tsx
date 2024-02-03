import * as React from "react";

import { Card, Text } from "@nextui-org/react";

export function MyCard({ header, body }) {
  return (
    <Card variant="bordered">
      <Card.Header>
        <Text b>{header}</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>{body}</Card.Body>
    </Card>
  );
}
