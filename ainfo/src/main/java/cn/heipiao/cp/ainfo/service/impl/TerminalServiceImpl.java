package cn.heipiao.cp.ainfo.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.heipiao.cp.ainfo.mapper.TerminalMapper;
import cn.heipiao.cp.ainfo.pojo.Terminal;
import cn.heipiao.cp.ainfo.service.TerminalService;

@Service
public class TerminalServiceImpl implements TerminalService {

	@Resource
	private TerminalMapper terminalMapper;

	@Override
	public List<Terminal> getTerminalList(Terminal pojo) {
		return terminalMapper.selectTerminalList(pojo);
	}

	@Override
	public Integer createTerminal(Terminal pojo) {
		return terminalMapper.insertTerminal(pojo);
	}

	@Override
	public Integer updateTerminal(Terminal pojo) {
		return terminalMapper.updateTerminalById(pojo);
	}

	@Override
	public Integer queryListCount(Map<String, Object> map) {
		return terminalMapper.queryListCount(map);
	}

	@Override
	public List<Terminal> queryList(Map<String, Object> map) {
		return terminalMapper.queryList(map);
	}

}
