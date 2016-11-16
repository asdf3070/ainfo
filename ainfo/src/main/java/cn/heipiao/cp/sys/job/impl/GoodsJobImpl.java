package cn.heipiao.cp.sys.job.impl;

import org.springframework.stereotype.Service;

import cn.heipiao.cp.core.spring.extend.Config;
import cn.heipiao.cp.core.vo.RespMsg;
import cn.heipiao.cp.sys.job.BaseJob;
import cn.heipiao.cp.sys.job.GoodsJob;

/**
 * @说明 商品job
 * @author chenwenye
 * @version heipiao1.0 2016年8月1日
 */
@Service("goodsJob")
public class GoodsJobImpl extends BaseJob implements GoodsJob {

	@Override
	public void salesVolume() {
		RespMsg<?> resp = this.execute(Config.getMapProp(""), GET, "");
		@SuppressWarnings("unused")
		boolean b = this.isSuccess(resp);
	}

}
