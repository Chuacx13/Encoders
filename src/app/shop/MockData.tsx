import { BillboardType } from "../(components)/Billboard";


export const mockBillboard: BillboardType = {
  id: "1",
  label: "Juicy Fruits",
  imageUrl:
    "https://www.bgi-usa.com/wp-content/uploads/Blog-citrus-juicy-fruits-featured-image-1.png",
};

export const mockFoodProductList = {
  title: "Fresh & Delicious Food",
  items: [
    {
      id: "1",
      category: {
        id: "cat1",
        name: "Fruits",
        billboard: mockBillboard,
      },
      name: "Fresh Strawberries",
      price: "499",
      isFeatured: true,
      size: {
        id: "size1",
        name: "Box",
        value: "box",
      },
      images: [
        {
          id: "img1",
          url: "https://cdn.nyallergy.com/wp-content/uploads/square-1432664914-strawberry-facts1.jpeg",
        },
      ],
    },
    {
      id: "2",
      category: {
        id: "cat2",
        name: "Vegetables",
        billboard: {
          id: "bill2",
          label: "Green Goodness",
          imageUrl:
            "https://img.pikbest.com/ai/illus_our/20230414/1087bc57005ad26a02654dca21bde9a7.jpg!w700wp",
        },
      },
      name: "Organic Broccoli",
      price: "249",
      isFeatured: true,
      size: {
        id: "size2",
        name: "Bunch",
        value: "bunch",
      },
      images: [
        {
          id: "img2",
          url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSy31xCSe25IuWcPkualoBbw3tbJ0kPmbJtwQZA1Vdj3PvEXLEWrnfOZD2Kd00d-QSbEJ-lOhts0w-hejHOmzTpyA",
        },
      ],
    },
    {
      id: "3",
      category: {
        id: "cat3",
        name: "Dairy",
        billboard: {
          id: "bill3",
          label: "Creamy & Fresh",
          imageUrl:
            "https://www.mashed.com/img/gallery/when-you-consume-a-lot-of-dairy-every-day-this-is-what-happens-to-your-body/intro-1608096791.jpg",
        },
      },
      name: "Fresh Milk",
      price: "379",
      isFeatured: false,
      size: {
        id: "size3",
        name: "1 Litre",
        value: "1-litre",
      },
      images: [
        {
          id: "img3",
          url: "https://images.stockcake.com/public/e/1/f/e1f26bd7-b99b-40aa-a70b-391071b294ec_large/fresh-milk-outside-stockcake.jpg",
        },
      ],
    },
  ],
};
