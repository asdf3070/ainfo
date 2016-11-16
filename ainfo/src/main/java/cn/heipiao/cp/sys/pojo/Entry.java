package cn.heipiao.cp.sys.pojo;

/**
 * 说明 : 封装简单的键值对 
 * @author chenwenye
 * @since 2016-7-9  heipiao1.0
 */
public class Entry<K , V> implements java.util.Map.Entry<K, V>{
	
	private K key;
	
	private V value;
	
	public void setKey(K key) {
		this.key = key;
	}

	@Override
	public K getKey() {
		return this.key;
	}

	@Override
	public V getValue() {
		return this.value;
	}

	@Override
	public V setValue(V value) {
		return this.value = value;
	}

}
