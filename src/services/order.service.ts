import { DataService } from "./data.service";
import {OrderDto} from "../models/orders/order.model";

class OrderService extends DataService<OrderDto>{}

export const orderService = new OrderService();