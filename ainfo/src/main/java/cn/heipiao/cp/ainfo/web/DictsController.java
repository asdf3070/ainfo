package cn.heipiao.cp.ainfo.web;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.heipiao.cp.ainfo.pojo.Dicts;

import cn.heipiao.cp.ainfo.service.DictsService;
import cn.heipiao.cp.core.vo.RespMsg;

@Controller
@RequestMapping("/dicts")
public class DictsController {

	private final Logger logger = LoggerFactory.getLogger(DictsController.class);
	
	@Resource
	private DictsService dictsService;
	
	@RequestMapping(value="/get/{type}", method={RequestMethod.GET})
	@ResponseBody
	public RespMsg<?> get(@PathVariable("type") String type){
		logger.debug("type:{}", type);
		return new RespMsg<List<Dicts>>(dictsService.getDictByType(type));
	}
	
}
