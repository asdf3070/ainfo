package cn.heipiao.cp.sys.job.impl;

import org.springframework.stereotype.Service;
import cn.heipiao.cp.sys.job.AccountJob;
import cn.heipiao.cp.sys.job.BaseJob;

/**
 * @说明  账户job
 * @author chenwenye
 * @version heipiao1.0 2016年8月1日
 */
@Service("accountJob")
public class AccountJobImpl extends BaseJob implements AccountJob {

	@Override
	public void presentAudit() {
		// TODO Auto-generated method stub

	}

}
