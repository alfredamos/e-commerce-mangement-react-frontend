import {DataService} from "./data.service";
import {CustomerDto} from "../models/customers/customer.model";

class CustomerService extends DataService<CustomerDto>{}

export const customerService = new CustomerService();