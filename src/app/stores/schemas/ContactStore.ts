import { OrderOption } from "@/app/costants/GlobalOptions"

export interface ContactStore {
  // State Props
  firstName: string
  lastName: string
  email: string
  phone: string
  date: string
  deliveryOption: OrderOption
  deliveryAddress?: string
  occasion?: string
  recipient?: string
  colors?: string
  details?: string
  contactFormSubmit: boolean
  // Validation
  validation: {
    firstNameError: string
    lastNameError: string
    emailError: string
    phoneError: string
    dateError: string
    deliveryOptionError: string
    deliveryAddressError: string
  }
  // Handlers
  handlers: {
    handleFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleLastName: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
    handlePhone: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleDate: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleDeliveryAddress?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleOccasion?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleRecipient?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleColors?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleDetails?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  }
  // Setters
  setters: {
    setDeliveryOption: (selected: any) => void
    setContactFormSubmit: (formSubmit: boolean) => void
  }
  // Validators
  validators?: {}
}
