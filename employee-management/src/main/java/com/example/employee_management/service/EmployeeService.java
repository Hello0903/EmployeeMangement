package com.example.employee_management.service;

import com.example.employee_management.entity.Employee;
import com.example.employee_management.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // CREATE
    public Employee saveEmployee(Employee employee) {

        return employeeRepository.save(employee);
    }

    // READ
    public List<Employee> getAllEmployees() {

        return employeeRepository.findAll();
    }

    // UPDATE
    public Employee updateEmployee(Long id, Employee employeeDetails) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow();

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());

        return employeeRepository.save(employee);
    }

    // DELETE
    public void deleteEmployee(Long id) {

        employeeRepository.deleteById(id);
    }

    public Employee updateEmployee1(Long id, Employee employeeDetails) {

    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

    employee.setFirstName(employeeDetails.getFirstName());
    employee.setLastName(employeeDetails.getLastName());
    employee.setEmail(employeeDetails.getEmail());

    return employeeRepository.save(employee);
}
}