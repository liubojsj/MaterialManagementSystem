package lb.mms.dao;

import java.util.List;
import java.util.Map;

import lb.mms.entity.ControlItem;

public interface ControlItemDAO {
	public boolean insertControlItem(ControlItem ci) throws Exception;

	public boolean deleteControlItem(int control_item_id) throws Exception;

	public List<ControlItem> findAll() throws Exception;

	public List<ControlItem> findAllByID(int department_id, int start, int limit)
			throws Exception;

	public int getCountByDepartmentID(int department_id) throws Exception;

	public int getCount() throws Exception;

	public boolean updateControlItem(ControlItem ci) throws Exception;

	public boolean updateControlItemSum(int control_item_id ,int dynamic_expend)
			throws Exception;

}
