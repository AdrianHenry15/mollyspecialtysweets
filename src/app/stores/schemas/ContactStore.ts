import { OrderOption } from "@/app/costants/GlobalOptions";

export interface ContactStore {
  // STATE
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  deliveryOption: OrderOption;
  deliveryAddress: string;
  occasion: string;
  recipient: string;
  colors: string;
  details: string;
  contactFormSubmit: boolean;
  // Error Handling
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  phoneError: string;
  dateError: string;
  deliveryOptionError: string;
  occasionError: string;
  recipientError: string;
  colorsError: string;
  // ACTIONS
  handleFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDeliveryOption: (selected: any) => void;
  handleDeliveryAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOccasion: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRecipient: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleColors: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDetails: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  setContactFormSubmit: (formSubmit: boolean) => void;
}
