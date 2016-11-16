package cn.heipiao.cp.ainfo.service;

import java.util.List;
import java.util.Map;

import cn.heipiao.cp.ainfo.pojo.Terminal;

public interface TerminalService {

	List<Terminal> getTerminalList(Terminal pojo);

	Integer createTerminal(Terminal pojo);

	Integer updateTerminal(Terminal pojo);

	Integer queryListCount(Map<String, Object> map);

	List<Terminal> queryList(Map<String, Object> map);
}
