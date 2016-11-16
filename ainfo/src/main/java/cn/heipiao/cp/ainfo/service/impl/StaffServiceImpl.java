package cn.heipiao.cp.ainfo.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.heipiao.cp.ainfo.mapper.StaffMapper;
import cn.heipiao.cp.ainfo.pojo.Staff;
import cn.heipiao.cp.ainfo.service.StaffService;

@Service
public class StaffServiceImpl implements StaffService {

	@Resource
	private StaffMapper staffMapper;

	@Override
	public List<Staff> getTerminalList(Staff pojo) {
		return staffMapper.selectTerminalList(pojo);
	}

	@Override
	public Integer createTerminal(Staff pojo) {
		return staffMapper.insertTerminal(pojo);
	}

	@Override
	public Integer updateTerminal(Staff pojo) {
		return staffMapper.updateTerminalById(pojo);
	}

	@Override
	public int queryListCount(Map<String, Object> map) {
		return staffMapper.queryListCount(map);
	}

	@Override
	public List<Staff> queryList(Map<String, Object> map) {
		return staffMapper.queryList(map);
	}

}
