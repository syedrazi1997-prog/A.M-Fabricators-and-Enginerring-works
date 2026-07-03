export interface CartItem {
  productId: string;
  productName: string;
  measurementLabel: string;
  unit: string;
  width: number;
  height: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
  isCustom: boolean;
  customWidth?: number;
  customHeight?: number;
}
