import Container from "./ui/Container";
import Link from "next/link";
import NavRoutes from "./NavRoutes";
import NavbarActions from "./NavActions";
import Image from "next/image";
import { getAllCategories } from "../api";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getAllCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative flex items-center h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/shop" className="flex ml-4 lg:ml-0 gap-x-2 items-center">
            <Image
              src="/avatar.png"
              alt="MWHMart"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-xl font-bold">MWHMart</p>
          </Link>
          <NavRoutes data={categories || []} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
