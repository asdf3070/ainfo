package cn.heipiao.cp.ainfo.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import cn.heipiao.cp.ainfo.constant.Constant;
import cn.heipiao.cp.ainfo.constant.PageSet;
import cn.heipiao.cp.ainfo.constant.Status;
import cn.heipiao.cp.ainfo.pojo.Staff;
import cn.heipiao.cp.ainfo.service.StaffService;
import cn.heipiao.cp.core.utils.ExDigestUtils;
import cn.heipiao.cp.core.vo.RespMsg;

@Controller
@RequestMapping("/staff")
public class StaffController {
	
	public final Logger logger = LoggerFactory.getLogger(StaffController.class);

	@Resource
	private StaffService staffService;

	@RequestMapping(value="/list/{status}/{pagenum}/{pagesize}", method={RequestMethod.GET})
	@ResponseBody
	public RespMsg<?> list(
			@PathVariable("status") Integer status,
			@PathVariable("pagenum") Integer pagenum,
			@PathVariable("pagesize") Integer pagesize){
		logger.debug("status{}， pagenum{}， pagenum{}", status, pagenum, pagenum);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", status);
		//计算分页
		pagenum = pagenum <= 0 ? 1 : pagenum;
		pagesize = pagesize <= 0 ? 1 : pagesize;
		int startItem = (pagenum - 1) * pagesize;
		logger.debug("executeMap:{}", map);
		int totalItem = staffService.queryListCount(map); //
		int totalPage = totalItem / pagesize + (totalItem % pagesize == 0 ? 0 : 1);
		if (totalPage > 0 && pagenum > totalPage) { //页数大于总页数
			//pagenum = totalPage;
			//startItem = (pagenum - 1) * pagesize;
			PageSet<Staff> pageSet = new PageSet<>(pagenum, pagesize, totalItem, new ArrayList<Staff>());
			return new RespMsg<PageSet<Staff>>(pageSet);
		}
		map.put("startItem", startItem);
		map.put("pagesize", pagesize);
		//最终查询
		logger.debug("executeMap:{}", map);
		List<Staff> pojos = staffService.queryList(map);
		PageSet<Staff> pageSet = new PageSet<>(pagenum, pagesize, totalItem, pojos);
		return new RespMsg<PageSet<Staff>>(pageSet);
	}

	@RequestMapping(value="/add", method={RequestMethod.POST})
	@ResponseBody
	public RespMsg<?> add(@RequestBody String _json){
		try{
			logger.error("/staff/add:_json{}", _json);
			JSONObject json = ((JSONObject)JSONObject.parse(_json));
			Staff pojo = json == null ? null : JSONObject.toJavaObject(json, Staff.class);

			if(pojo.getPassword() != null){
				pojo.setPassword(ExDigestUtils.sha1Hex(pojo.getPassword()));
			}
			pojo.setId(staffService.createTerminal(pojo));
			return new RespMsg<Staff>(pojo);
		}catch(Exception e){
			logger.error("/staff/add:_json{}", _json);
			logger.error(e.getMessage(), e);
			return new RespMsg<>(Status.ERROR.getCode(), Status.ERROR.getCodeMsg());
		}
	}

	@RequestMapping(value="/update", method={RequestMethod.PUT})
	@ResponseBody
	public RespMsg<?> update(@RequestBody String _json){
		try{
			logger.error("/staff/update:_json{}", _json);
			JSONObject json = ((JSONObject)JSONObject.parse(_json));
			Staff pojo = json == null ? null : JSONObject.toJavaObject(json, Staff.class);
			if(pojo.getId() == null){
				return new RespMsg<>(Status.PARAM_NULL_ERROR.getCode(), Status.PARAM_NULL_ERROR.getCodeMsg());
			}
			if(pojo.getPassword() != null){
				pojo.setPassword(ExDigestUtils.sha1Hex(pojo.getPassword()));
			}
			staffService.updateTerminal(pojo);
			return new RespMsg<>(Status.SUCCESS.getCode(), Status.SUCCESS.getCodeMsg());
		}catch(Exception e){
			logger.error("/staff/update:_json{}", _json);
			logger.error(e.getMessage(), e);
			return new RespMsg<>(Status.ERROR.getCode(), Status.ERROR.getCodeMsg());
		}
	}

	@RequestMapping(value="/delete", method={RequestMethod.POST})
	@ResponseBody
	public RespMsg<?> delete(@RequestBody String _json){
		try{
			logger.error("/staff/delete:_json{}", _json);
			JSONObject json = ((JSONObject)JSONObject.parse(_json));
			Staff pojo = json == null ? null : JSONObject.toJavaObject(json, Staff.class);
			if(pojo.getId() == null){
				return new RespMsg<>(Status.PARAM_NULL_ERROR.getCode(), Status.PARAM_NULL_ERROR.getCodeMsg());
			}
			Staff delObj = new Staff();
			delObj.setId(pojo.getId());
			delObj.setStatus(Constant.TERMINAL_STATUS_DELETED);
			staffService.updateTerminal(delObj);
			return new RespMsg<>(Status.SUCCESS.getCode(), Status.SUCCESS.getCodeMsg());
		}catch(Exception e){
			logger.error("/staff/delete:_json{}", _json);
			logger.error(e.getMessage(), e);
			return new RespMsg<>(Status.ERROR.getCode(), Status.ERROR.getCodeMsg());
		}
	}

}
