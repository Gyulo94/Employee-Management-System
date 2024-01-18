package com.employee.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.employee.dto.EmployeeDTO;
import com.employee.entity.Employee;
import com.employee.exception.ResourceNotFoundException;
import com.employee.mapper.EmployeeMapper;
import com.employee.repository.EmployeeRepository;
import com.employee.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDTO(savedEmployee);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("ID: " + employeeId + " 에 해당하는 직원을 찾을 수 없습니다."));
        return EmployeeMapper.mapToEmployeeDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDTO(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO updateEmployee(Long employeeId, EmployeeDTO updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("ID: " + employeeId + " 에 해당하는 직원을 찾을 수 없습니다."));

        employee.setName(updatedEmployee.getName());
        employee.setJobGrade(updatedEmployee.getJobGrade());
        employee.setEmail(updatedEmployee.getEmail());

        Employee udatedEmployeeObj = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDTO(udatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("ID: " + employeeId + " 에 해당하는 직원을 찾을 수 없습니다."));

        employeeRepository.deleteById(employeeId);
    }

}
