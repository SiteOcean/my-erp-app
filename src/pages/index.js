// pages/students.js (or any appropriate filename)

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust path as needed
import HomePage from '../pages/Home'
const Students = () => {
  // const [name, setName] = useState('test');
  // const [age, setAge] = useState('12');
  // const [address, setAddress] = useState('cbe');
  // const [students, setStudents] = useState([]);

  // // Function to add a student
  // const addStudent = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, 'students'), {
  //       name,
  //       age,
  //       address
  //     });
  //     console.log('Student added with ID: ', docRef);
  //     // Clear input fields after adding
  //     setName('');
  //     setAge('');
  //     setAddress('');
  //     // Refresh student list
  //     fetchStudents();
  //   } catch (error) {
  //     console.error('Error adding student: ', error);
  //   }
  // };

  // // Function to fetch students from Firestore
  // const fetchStudents = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'students'));
  //     const studentData = [];
  //     querySnapshot.forEach((doc) => {
  //       studentData.push({ id: doc.id, ...doc.data() });
  //     });
  //     setStudents(studentData);
  //   } catch (error) {
  //     console.error('Error fetching students: ', error);
  //   }
  // };

  // // Fetch students on component mount
  // useEffect(() => {
  //   fetchStudents();
  // }, []);

  return (
    <div>

      <HomePage/>
      {/* <h1>Student Information</h1>
      <div>
        <h2>Add Student</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addStudent();
          }}
        >
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit" className='bg-green-300'>Add Student</button>
        </form>
      </div>
      <div>
        <h2 className='underline uppercase'>Student List:</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <strong>Name:</strong> {student.name},{' '}
              <strong>Age:</strong> {student.age},{' '}
              <strong>Address:</strong> {student.address}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Students;
