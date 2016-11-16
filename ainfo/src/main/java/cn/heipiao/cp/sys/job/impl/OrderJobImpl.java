package cn.heipiao.cp.sys.job.impl;

import org.springframework.stereotype.Service;

import cn.heipiao.cp.core.spring.extend.Config;
import cn.heipiao.cp.core.vo.RespMsg;
import cn.heipiao.cp.sys.job.BaseJob;
import cn.heipiao.cp.sys.job.OrderJob;

/**
 * @说明 订单job实现类 
 * @author chenwenye
 * @version heipiao1.0 2016年8月1日
 */
@Service("orderJob")
public class OrderJobImpl extends BaseJob implements OrderJob {
	
	@Override
	public void outTimeOrder() {
		RespMsg<?> resp = this.execute(Config.getMapProp("api.outtime.order"), POST , null);
		this.isSuccess(resp);
	}

}
