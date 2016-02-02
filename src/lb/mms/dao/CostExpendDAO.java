package lb.mms.dao;

import java.util.List;

import lb.mms.entity.CostExpend;

public interface CostExpendDAO {
    /**
     * 
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:58:17</li>
     * <li>3、方法含义：按部门ID查询</li>
     * <li>4、返回类型：List<CostExpend></li>
     * <li>5、方法说明：</li>
     * </ul>
     * @param department_id
     * @param start
     * @param limit
     * @return
     * @throws Exception
     */
    public List<CostExpend> findAllByID(int department_id,int start ,int limit)throws Exception ;
    public int getCountByDepartmentID(int department_id) throws Exception ;
    public int getCount() throws Exception ;
    public boolean insertCostExpend(CostExpend ce) throws Exception ;
    public boolean updateCostExpend(CostExpend ce) throws Exception ;
    public boolean deleteCostExpend(int cost_expend_id) throws Exception ;
}
