package lb.mms.dao;

import java.util.List;

import lb.mms.entity.MessageBoard;

public interface MessageBoardDAO {
    public List<MessageBoard> findAllByID(int falg ,int id,int start ,int limit)throws Exception ;
    public int getCostExpendID(int cost_expend_id) throws Exception ;
    public Boolean insertMssageBroad( MessageBoard msgbrd ) throws Exception ;
    public Boolean updateAdminMssageBroad( MessageBoard msgbrd ) throws Exception ;
}
