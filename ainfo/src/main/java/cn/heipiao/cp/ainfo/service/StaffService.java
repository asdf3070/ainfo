package cn.heipiao.cp.ainfo.service;

import java.util.List;
import java.util.Map;

import cn.heipiao.cp.ainfo.pojo.Staff;

public interface StaffService {

	List<Staff> getTerminalList(Staff pojo);

	Integer createTerminal(Staff pojo);

	Integer updateTerminal(Staff pojo);

	int queryListCount(Map<String, Object> map);

	List<Staff> queryList(Map<String, Object> map);
}
