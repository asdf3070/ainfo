package cn.heipiao.cp.sys.job;

/**
 * @说明 订单job 
 * @author chenwenye
 * @version heipiao1.0 2016年8月1日
 */
public interface OrderJob {
	
	/**
	 * @说明 超时订单任务
	 */
	void outTimeOrder();

}
