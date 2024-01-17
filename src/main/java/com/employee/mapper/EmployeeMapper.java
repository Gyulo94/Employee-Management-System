package com.employee.mapper;

import com.employee.dto.EmployeeDTO;
import com.employee.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDTO mapToEmployeeDTO(Employee employee) {
        return new EmployeeDTO(
                employee.getId(),
                employee.getName(),
                employee.getJobGrade(),
                employee.getEmail());
    }

    public static Employee mapToEmployee(EmployeeDTO employeeDTO) {
        return new Employee(employeeDTO.getId(),
                employeeDTO.getName(),
                employeeDTO.getJobGrade(),
                employeeDTO.getEmail());
    }

}
