package cn.heipiao.cp.sys.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.heipiao.cp.sys.mapper.OperationLogMapper;
import cn.heipiao.cp.sys.pojo.OperationLog;
import cn.heipiao.cp.sys.service.OperationService;

/**
 * 
 * 说明 :
 * 		操作日志serviceImpl
 * @author chenwenye
 * @since 2016-6-13 heipiao1.0
 */
@Service
public final class OperationServiceImpl implements OperationService{
	
	@Resource
	private OperationLogMapper operationLogMapper;

	@Override
	public List<OperationLog> findByUserId(String id) {
		return this.operationLogMapper.selectByUserId(id);
	}

	@Override
	public void insert(OperationLog log) {
		this.operationLogMapper.insert(log);
	}

	@Override
	public List<OperationLog> findByTime(Date start , Date end) {
		return null;
	}
	
}
