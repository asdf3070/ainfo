package cn.heipiao.cp.ainfo.mapper;

import java.util.List;

import cn.heipiao.cp.ainfo.pojo.Dicts;

public interface DictsMapper {

	List<Dicts> selectDictByType(String type);

}
