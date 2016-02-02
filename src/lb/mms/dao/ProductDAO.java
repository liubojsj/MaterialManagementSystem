package lb.mms.dao;

import java.util.List;

import lb.mms.entity.Product;

public interface ProductDAO {
    public List<Product> getProductList(int start,int limit,String keyWord ) throws Exception ;
    public int getRowCount(String keyWord) throws Exception ;
    public Boolean insertProduct(Product p) throws Exception ;
    public boolean insertImgByProductID(int productID,String imgName) throws Exception ;
    public Boolean deleteProductByID(int productID) throws Exception ;
    public Boolean updateProduct(Product p) throws Exception ;
}
