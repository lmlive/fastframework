package com.livem.quickframework.controller.console;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.StatementCallback;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by liming on 2017/10/22 0022.
 */
@RequestMapping("/admin")
@Controller
public class SqlController {
	final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private JdbcTemplate jdbc;

	@RequestMapping("/sql")
	public String exesql(ModelMap map, String sql) {
	
		sql =sql==null?"": sql.trim().toLowerCase();
		map.put("sql", sql);
		try {
			if (sql.startsWith("select"))
				map.put("res", jdbc.queryForMap(sql));
			else
				jdbc.execute(sql);
		} catch (Exception e) {
			map.put("exception", e);
		}
		return "/admin/sql";
	}

}
