package cn.heipiao.cp.ainfo.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.heipiao.cp.ainfo.mapper.DictsMapper;
import cn.heipiao.cp.ainfo.pojo.Dicts;
import cn.heipiao.cp.ainfo.service.DictsService;

@Service
public class DictsServiceImpl implements DictsService {

	@Resource
	private DictsMapper dictsMapper;
	
	@Override
	public List<Dicts> getDictByType(String type) {
		return dictsMapper.selectDictByType(type);
	}

}
