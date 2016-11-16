package cn.heipiao.cp.ainfo.mapper;

import java.util.List;
import java.util.Map;

import cn.heipiao.cp.ainfo.pojo.Staff;

public interface StaffMapper {

	List<Staff> selectTerminalList(Staff pojo);

	Integer insertTerminal(Staff pojo);

	Integer updateTerminalById(Staff pojo);

	List<Staff> queryList(Map<String, Object> map);

	int queryListCount(Map<String, Object> map);	
}