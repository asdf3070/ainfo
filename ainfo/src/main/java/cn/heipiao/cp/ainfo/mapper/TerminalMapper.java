package cn.heipiao.cp.ainfo.mapper;

import java.util.List;
import java.util.Map;

import cn.heipiao.cp.ainfo.pojo.Terminal;

public interface TerminalMapper {

	List<Terminal> selectTerminalList(Terminal pojo);

	Integer insertTerminal(Terminal pojo);

	Integer updateTerminalById(Terminal pojo);

	Integer queryListCount(Map<String, Object> map);

	List<Terminal> queryList(Map<String, Object> map);	
}