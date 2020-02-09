import {User} from './User';
import {Product} from './product.model';
import {Attachment} from './attachment.model';

export class Invoice {
    id: number;
    description: string;
    time: Date;
    type: string;
    quantity: number;
    user: User;
    product: Product;
}
