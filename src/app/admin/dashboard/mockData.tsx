export interface Product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
  }
  
  export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
  }
  
  export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
  }
  
  export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
  }
  
  export interface ExpenseSummary {
    expenseSummarId: string;
    totalExpenses: number;
    date: string;
  }
  
  export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
  }
  
  export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
  }
  
  export interface User {
    userId: string;
    name: string;
    email: string;
  }
  

// Mock data for Products
export const mockProducts: Product[] = [
    {
      productId: "prod1",
      name: "Laptop",
      price: 1500,
      rating: 4.5,
      stockQuantity: 10,
    },
    {
      productId: "prod2",
      name: "Smartphone",
      price: 800,
      rating: 4.7,
      stockQuantity: 20,
    },
    {
      productId: "prod3",
      name: "Headphones",
      price: 150,
      rating: 4.3,
      stockQuantity: 50,
    },
  ];
  
  // Mock data for NewProduct
  export const mockNewProduct: NewProduct = {
    name: "Smartwatch",
    price: 300,
    rating: 4.2,
    stockQuantity: 15,
  };
  
  // Mock data for SalesSummary
  export const mockSalesSummary: SalesSummary[] = [
    {
      salesSummaryId: "sales1",
      totalValue: 5000,
      changePercentage: 10.5,
      date: "2025-01-01",
    },
    {
      salesSummaryId: "sales2",
      totalValue: 4500,
      changePercentage: -5.3,
      date: "2025-01-02",
    },
  ];
  
  // Mock data for PurchaseSummary
  export const mockPurchaseSummary: PurchaseSummary[] = [
    {
      purchaseSummaryId: "purchase1",
      totalPurchased: 2000,
      changePercentage: 2.5,
      date: "2025-01-01",
    },
    {
        totalPurchased: 1800,
      purchaseSummaryId: "purchase2",
      changePercentage: -10.0,
      date: "2025-01-02",
    },
  ];
  
  // Mock data for ExpenseSummary
  export const mockExpenseSummary: ExpenseSummary[] = [
    {
      expenseSummarId: "expense1",
      totalExpenses: 1200,
      date: "2025-01-01",
    },
    {
      expenseSummarId: "expense2",
      totalExpenses: 1300,
      date: "2025-01-02",
    },
  ];
  
  // Mock data for ExpenseByCategorySummary
  export const mockExpenseByCategorySummary: ExpenseByCategorySummary[] = [
    {
      expenseByCategorySummaryId: "category1",
      category: "Marketing",
      amount: "500",
      date: "2025-01-01",
    },
    {
      expenseByCategorySummaryId: "category2",
      category: "Logistics",
      amount: "700",
      date: "2025-01-01",
    },
  ];
  
  // Mock data for DashboardMetrics
  export const mockDashboardMetrics: DashboardMetrics = {
    popularProducts: mockProducts,
    salesSummary: mockSalesSummary,
    purchaseSummary: mockPurchaseSummary,
    expenseSummary: mockExpenseSummary,
    expenseByCategorySummary: mockExpenseByCategorySummary,
  };
  
  // Mock data for Users
  export const mockUsers: User[] = [
    {
      userId: "user1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      userId: "user2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
  ];
  
  console.log(mockDashboardMetrics);
  console.log(mockUsers);
  