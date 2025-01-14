"use client";

import Container from "../../(components)/ui/Container";
import Cart from "./CartPage";

export default function CartPage() {
  return (
    <Container>
      <div className="px-10 space-y-10">
        <Cart />
      </div>
    </Container>
  );
}
