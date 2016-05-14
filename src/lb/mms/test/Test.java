package lb.mms.test;

import java.util.ArrayList;

import lb.mms.dao.impl.ControlItemDAOImpl;
import lb.mms.entity.ControlItem;
import net.sf.json.JSONArray;



public class Test
{

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午03:34:55</li>
     * <li>3、方法含义：</li>
     * <li>4、返回类型：void</li>
     * <li>5、方法说明：</li>
     * </ul>
     * @param args
     * @throws Exception 
     */
    public static void main(String[] args) throws Exception
    {
        // TODO Auto-generated method stub
        
        ControlItemDAOImpl deptiml = new ControlItemDAOImpl();
        ArrayList<ControlItem> deplistArrayList =  deptiml.findAll();
        String str = JSONArray.fromObject(deplistArrayList).toString();
        System.out.print(str);

    }

}
