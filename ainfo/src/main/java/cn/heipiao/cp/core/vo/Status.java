package cn.heipiao.cp.core.vo;

public enum Status {
	
	SUCCESS(0,"成功"),
	ERROR(400,"程序异常")
	;
	
	public int status;
	
	public String message;
	
	private Status(int status, String message) {
		this.status = status;
		this.message = message;
	}
	

}
