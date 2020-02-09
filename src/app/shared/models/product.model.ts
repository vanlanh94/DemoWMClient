import {Category} from './category.model';
import {Supplier} from './supplier.model';
import {Attachment} from './attachment.model';

export interface Product {
    id: number;
    name: string;
    color: string;
    quantityInStock: number;
    description: string;
    price: number;
    image: File;
    active: boolean;
    category: Category;
    supplier: Supplier;
    attachments: Attachment[];
}
