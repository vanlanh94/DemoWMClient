export class WmConstant {
    // Api from back-end
    public static API_URL = 'http://localhost:8080/api/';
    public static API_GET_CATEGORY_NAME = 'category/getIdAndName';
    public static API_GET_SUPPLIER_NAME = 'supplier/getIdAndName';
    public static API_GET_ATTACHMENT_BY_PRODUCT_ID = 'attachment/getByProductId';

    // Models
    public static CATEGORY = 'category';
    public static PRODUCT = 'product';
    public static SUPPLIER = 'supplier';
    public static ATTACHMENT = 'attachment';
    public static INVOICE = 'invoice';
    public static USER = 'user';

    // Actions
    public static CREATE = 'create';
    public static UPDATE = 'update';
    public static DELETE = 'delete';

    // Symbols
    public static FORWARD_SLASH = '/';
    public static QUESTION_MARK = '?';
    public static EQUAL = '=';

    // Keyword
    public static KEYWORD = 'keyword';
    public static NAME = 'name';
    public static FIND = 'find';
}
