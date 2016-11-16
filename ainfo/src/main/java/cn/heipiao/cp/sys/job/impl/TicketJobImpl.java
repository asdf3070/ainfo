package cn.heipiao.cp.sys.job.impl;

import cn.heipiao.cp.core.spring.extend.Config;
import cn.heipiao.cp.core.vo.RespMsg;
import cn.heipiao.cp.sys.job.BaseJob;
import cn.heipiao.cp.sys.job.TicketJob;

/**
 * @说明 票券job 
 * @author chenwenye
 * @version heipiao1.0 2016年8月1日
 */
public class TicketJobImpl extends BaseJob implements TicketJob {

	@Override
	public void registerTicket() {
		RespMsg<?> resp = this.execute(Config.getMapProp(""), GET, "");
		@SuppressWarnings("unused")
		boolean b = this.isSuccess(resp);
	}

}
