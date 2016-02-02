package lb.mms.dao;

import java.util.List;

import lb.mms.entity.ConstructionRepair;

public interface ConstructionRepairDAO {
    public List<ConstructionRepair> getConstructionRepairList(int start,int limit,String keyWord ) throws Exception ;
    public int getRowCount(String keyWord) throws Exception ;
    public Boolean insertConstructionRepair(ConstructionRepair cr) throws Exception ;
    public Boolean deleteConstructionRepairByID(int constructionRepairId) throws Exception ;
    public Boolean updateConstructionRepair(ConstructionRepair cr) throws Exception ;
}
