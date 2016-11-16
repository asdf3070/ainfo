package cn.heipiao.cp.ainfo.service;

import java.util.List;

import cn.heipiao.cp.ainfo.pojo.Dicts;

public interface DictsService {

	List<Dicts> getDictByType(String type);

}
