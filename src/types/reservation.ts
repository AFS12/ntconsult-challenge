export interface Reservation {
  id: string;
  status: string;
  hotel: {
    name: string;
    id: string | number;
  };
  user: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
  };
  accommodation: {
    dates: string[];
    rooms: number;
    guests: number;
  };
  payment: {
    cardOwnerFirstName: string;
    cardOwnerLastName: string;
    cardName: string;
    cardNumber: string;
    cardExpirationDate: string;
    cardCvc: string;
    installment: number | null;
  };
}