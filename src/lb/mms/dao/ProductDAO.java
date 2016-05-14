package lb.mms.dao;

import java.util.List;

import lb.mms.entity.Product;

public interface ProductDAO {
	public List<Product> getProductList(int start, int limit, String keyWord,int departmentId)
			throws Exception;

	public List<Product> getProductListByDepartmentID(int start, int limit,
			int departmentId) throws Exception;

	public int getRowCount(String keyWord ,int departmentId) throws Exception;

	public Boolean insertProduct(Product p) throws Exception;

	public boolean insertImgByProductID(int productID, String imgName)
			throws Exception;

	public Boolean deleteProductByID(int productID) throws Exception;

	public Boolean updateProduct(Product p) throws Exception;

	public Product getProductById(int productId) throws Exception;
}
