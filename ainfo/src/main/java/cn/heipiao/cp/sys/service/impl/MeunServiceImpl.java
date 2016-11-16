package cn.heipiao.cp.sys.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.heipiao.cp.core.constant.SysConstant;
import cn.heipiao.cp.sys.mapper.MeunMapper;
import cn.heipiao.cp.sys.pojo.Meun;
import cn.heipiao.cp.sys.service.MeunService;

/**
 * 
 * 说明 :
 * 		菜单serviceImpl
 * 功能 : 
 *      a.	菜单查询
 *      b.	资源查询
 * @author chenwenye
 * @since 2016-6- heipiao1.0
 */
@Service
public class MeunServiceImpl implements MeunService{
	
	@Resource
	private MeunMapper meunMapper;

	@Override
	public List<String> getMeunUrlList() {
		List<Meun> meuns = meunMapper.selectByPid(SysConstant.RESOURCE_ROOT_ID);
		List<String> urls = new ArrayList<String>(meuns.size());
		
		for (Meun meun : meuns) {
			urls.add(meun.getUrl());
		}
		
		return urls;
	}

}
