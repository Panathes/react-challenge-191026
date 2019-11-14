import React, { useEffect, useState } from "react";
import { AGetAllStudents, Student } from "../actions/student.action";
import { Teacher } from "../actions/teacher.action";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import "./dashboard.component.scss";

// Components
import Menu from "./dashboard/menu.component";
import Add from "./add.component";

interface IProps {
  onFetchStudents: any;
  students: Student[];
  isFetchingStudents: boolean;
  teachers: Teacher[];
  isFetchingteachers: boolean;
}

interface IState {}

const Home = (props: IProps) => {
  const { students, isFetchingStudents } = props;

  useEffect(() => {
    props.onFetchStudents();
  }, []);

  return (
    <div className="container_home">
      <Menu />
      <div className="header">
        <h1>Promotion</h1>
      </div>
      <div>
        {isFetchingStudents && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="student-row">
          {!isFetchingStudents &&
            students.map((student: Student, id) => (
              <div key={id} className="student_element">
                
              </div>
            ))}
        </div>
      </div>
      <Add />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    students: state.student.list,
    isFetchingStudents: state.student.fetching,
    teachers: state.teacher.list,
    isFetchingteachers: state.teacher.fetching
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchStudents: () => dispatch(AGetAllStudents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
