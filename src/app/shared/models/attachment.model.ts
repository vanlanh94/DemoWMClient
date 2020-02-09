import {Product} from './product.model';
import {Invoice} from './Invoice';

export interface Attachment {
    id: number;
    fileName: string;
    contentType: string;
    attachment_file: string;
    product: Product;
    invoice: Invoice;
    size: number;
}
