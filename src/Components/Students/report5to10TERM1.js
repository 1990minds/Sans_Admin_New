import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import Imagemain from "../../Images/mainfront.png";
import Imagesub from "../../Images/logosub.png";
import Marksbar from "../../Images/lkg bar.png";
import Marksbar1 from "../../Images/onebar.png";
import Footer from "../../Images/Sans Footer3-02.png";
import dayjs from "dayjs";
import "./index.css";
import { FaCheck } from "react-icons/fa";

const PrintComponent = ({ data, termData }) => {
  console.log(data);
  const [studentImage, setStudentImage] = useState(null);

  useEffect(() => {
    const studentImageUrl = data?.student?.personal_details?.student_image;
    setStudentImage(studentImageUrl);
  }, [data]);

  // const fa1Total =
  //   data?.termData?.English?.FA1?.marks +
  //   data?.termData?.Kannada?.FA1?.marks +
  //   data?.termData?.Hindi?.FA1?.marks +
  //   data?.termData?.Mathematics?.FA1?.marks +
  //   data?.termData?.["E V S / General Science"]?.FA1?.marks +
  //   data?.termData?.["Social Science"]?.FA1?.marks;

  // const perfa1 = ((fa1Total / 150) * 100).toFixed(2);

  // const calculateGradefa1 = (fa1Total) => {
  //   if (fa1Total >= 135) {
  //     return "A+";
  //   } else if (fa1Total >= 120) {
  //     return "A";
  //   } else if (fa1Total >= 105) {
  //     return "B+";
  //   } else if (fa1Total >= 90) {
  //     return "B";
  //   } else if (fa1Total >= 75) {
  //     return "C+";
  //   } else if (fa1Total >= 60) {
  //     return "C";
  //   } else if (fa1Total >= 45) {
  //     return "D+";
  //   } else if (fa1Total >= 30) {
  //     return "D";
  //   } else {
  //     return "E";
  //   }
  // };
  // const gradefa1 = calculateGradefa1(fa1Total);




  const subjectsForClasses5to10 = [
    "English",
    "Kannada",
    "Hindi",
    "Mathematics",
    "E V S / General Science",
    "Social Science"
  ];

  const validSubjectsCount = subjectsForClasses5to10.reduce((count, subject) => {
    console.log(count)
    if (data?.termData?.[subject]?.FA1?.marks !== 0) {
      return count + 1;
    }
    console.log("frst",count)
    return count; 
  
  }, 0);
  


const fa1Total = subjectsForClasses5to10.reduce((total, subject) => {
  if (data?.termData?.[subject]?.FA1?.marks !== 0 && data?.termData?.[subject]?.FA1?.marks !== 111) {
    return total + data?.termData?.[subject]?.FA1?.marks;
  }
  return total;
}, 0);

// Calculate the adjusted total based on the number of valid subjects
const adjustedTotal = validSubjectsCount * 10; 
console.log(adjustedTotal)
// Calculate the percentage based on the adjusted total
const perfa1 = ((fa1Total / adjustedTotal) * 100).toFixed(2)


const calculateGradefa1 = (fa1Total, adjustedTotal) => {
  const percentage = (fa1Total / adjustedTotal) * 100;

  if (percentage >= 90) {
    return "A+";
  } else if (percentage >= 80) {
    return "A";
  } else if (percentage >= 70) {
    return "B+";
  } else if (percentage >= 60) {
    return "B";
  } else if (percentage >= 50) {
    return "C+";
  } else if (percentage >= 40) {
    return "C";
  } else if (percentage >= 30) {
    return "D+";
  } else if (percentage >= 20) {
    return "D";
  } else {
    return "E";
  }
};

  const gradefa1 = calculateGradefa1(fa1Total, adjustedTotal);



  // const fa2Total =
  //   data?.termData?.English?.FA2?.marks +
  //   data?.termData?.Kannada?.FA2?.marks +
  //   data?.termData?.Hindi?.FA2?.marks +
  //   data?.termData?.Mathematics?.FA2?.marks +
  //   data?.termData?.["E V S / General Science"]?.FA2?.marks +
  //   data?.termData?.["Social Science"]?.FA2?.marks;

  // const perfa2 = ((fa2Total / 150) * 100).toFixed(2);

  // const calculateGradefa2 = (fa2Total) => {
  //   if (fa2Total >= 135) {
  //     return "A+";
  //   } else if (fa2Total >= 120) {
  //     return "A";
  //   } else if (fa2Total >= 105) {
  //     return "B+";
  //   } else if (fa2Total >= 90) {
  //     return "B";
  //   } else if (fa2Total >= 75) {
  //     return "C+";
  //   } else if (fa2Total >= 60) {
  //     return "C";
  //   } else if (fa2Total >= 45) {
  //     return "D+";
  //   } else if (fa2Total >= 30) {
  //     return "D";
  //   } else {
  //     return "E";
  //   }
  // };
  // const gradefa2 = calculateGradefa2(fa2Total);



  const subjectsForClasses5to10FA2 = [
    "English",
    "Kannada",
    "Hindi",
    "Mathematics",
    "E V S / General Science",
    "Social Science"
  ];

  const validSubjectsCountFA2 = subjectsForClasses5to10FA2.reduce((count, subject) => {
    console.log(count)
    if (data?.termData?.[subject]?.FA2?.marks !== 0) {
      return count + 1;
    }
    console.log("frst",count)
    return count; 
  
  }, 0);
  
  // Calculate the total marks for valid subjects
const fa2Total = subjectsForClasses5to10FA2.reduce((total, subject) => {
  if (data?.termData?.[subject]?.FA2?.marks !== 0 && data?.termData?.[subject]?.FA2?.marks !== 111) {
    return total + data?.termData?.[subject]?.FA2?.marks;
  }
  return total;
}, 0);

// Calculate the adjusted total based on the number of valid subjects
const adjustedTotalFA2 = validSubjectsCountFA2 * 10; 

// Calculate the percentage based on the adjusted total
const perfa2 = ((fa2Total / adjustedTotalFA2) * 100).toFixed(2)


const calculateGradefa2 = (fa2Total, adjustedTotalFA2) => {
  const percentageFA2 = (fa2Total / adjustedTotalFA2) * 100;

  if (percentageFA2 >= 90) {
    return "A+";
  } else if (percentageFA2 >= 80) {
    return "A";
  } else if (percentageFA2 >= 70) {
    return "B+";
  } else if (percentageFA2 >= 60) {
    return "B";
  } else if (percentageFA2 >= 50) {
    return "C+";
  } else if (percentageFA2 >= 40) {
    return "C";
  } else if (percentageFA2 >= 30) {
    return "D+";
  } else if (percentageFA2 >= 20) {
    return "D";
  } else {
    return "E";
  }
};

  const gradefa2 = calculateGradefa2(fa2Total, adjustedTotalFA2);




  // const sa1Total =
  //   data?.termData?.English?.SA1?.marks +
  //   data?.termData?.Kannada?.SA1?.marks +
  //   data?.termData?.Hindi?.SA1?.marks +
  //   data?.termData?.Mathematics?.SA1?.marks +
  //   data?.termData?.["E V S / General Science"]?.SA1?.marks +
  //   data?.termData?.["Social Science"]?.SA1?.marks;

  // const persa1 = ((sa1Total / 300) * 100).toFixed(2);

  // const calculateGradesa1 = (sa1Total) => {
  //   if (sa1Total >= 270) {
  //     return "A+";
  //   } else if (sa1Total >= 240) {
  //     return "A";
  //   } else if (sa1Total >= 210) {
  //     return "B+";
  //   } else if (sa1Total >= 180) {
  //     return "B";
  //   } else if (sa1Total >= 150) {
  //     return "C+";
  //   } else if (sa1Total >= 120) {
  //     return "C";
  //   } else if (sa1Total >= 90) {
  //     return "D+";
  //   } else if (sa1Total >= 60) {
  //     return "D";
  //   } else {
  //     return "E";
  //   }
  // };

  // const gradesa1 = calculateGradesa1(sa1Total);

  const subjectsForClasses5to10SA1 = [
    "English",
    "Kannada",
    "Hindi",
    "Mathematics",
    "E V S / General Science",
    "Social Science"
  ];

  const validSubjectsCountSA1 = subjectsForClasses5to10SA1.reduce((count, subject) => {
    console.log(count)
    if (data?.termData?.[subject]?.SA1?.marks !== 0) {
      return count + 1;
    }
    console.log("frst",count)
    return count; 
  
  }, 0);
  

const SA1Total = subjectsForClasses5to10SA1.reduce((total, subject) => {
  if (data?.termData?.[subject]?.SA1?.marks !== 0 && data?.termData?.[subject]?.SA1?.marks !== 111) {
    return total + data?.termData?.[subject]?.SA1?.marks;
  }
  return total;
}, 0);

// Calculate the adjusted total based on the number of valid subjects
const adjustedTotalSA1 = validSubjectsCountSA1 * 30; 

// Calculate the percentage based on the adjusted total
const perSA1 = ((SA1Total / adjustedTotalSA1) * 100).toFixed(2)


const calculateGradeSA1 = (SA1Total, adjustedTotalSA1) => {
  const percentageSA1 = (SA1Total / adjustedTotalSA1) * 100;

  if (percentageSA1 >= 90) {
    return "A+";
  } else if (percentageSA1 >= 80) {
    return "A";
  } else if (percentageSA1 >= 70) {
    return "B+";
  } else if (percentageSA1 >= 60) {
    return "B";
  } else if (percentageSA1 >= 50) {
    return "C+";
  } else if (percentageSA1 >= 40) {
    return "C";
  } else if (percentageSA1 >= 30) {
    return "D+";
  } else if (percentageSA1 >= 20) {
    return "D";
  } else {
    return "E";
  }
};

  const gradeSA1 = calculateGradeSA1(SA1Total, adjustedTotalSA1);




//term grades
function calculateGradeterm(total) {
  if (total >= 47 && total <= 50) {
    return 'A+';
  } else if (total >= 42 && total <= 47) {
    return 'A';
  } else if (total >= 36 && total <= 41) {
    return 'B+';
  } else if (total >= 30 && total <= 35) {
    return 'B';
  } else if (total >= 24 && total <= 29) {
    return 'C+';
  } else if (total >= 18 && total <= 23) {
    return 'C';
  } else if (total >= 12 && total <= 17) {
    return 'D+';
  } else if (total >= 6 && total <= 11) {
    return 'D';
  } else if (total >= 0 && total <= 5) {
    return 'E';
  } else {
    return 'Invalid';
  }
}




//term color
const getGradeColorterm = (englishTermGrade) => {
  switch (englishTermGrade) {
    case "A+":
      return "bg-[#C756A1] text-white font-bold";
    case "A":
      return "bg-[#6C8CC8] text-white font-bold";
    case "B+":
      return "bg-[#00A651] text-white font-bold";
    case "B":
      return "bg-[#00AEEF] text-white font-bold";
    case "C+":
      return "bg-[#A6CE39] text-white font-bold";
    case "C":
      return "bg-[#D7CB70] text-white font-bold";
    case "D+":
      return "bg-[#F5821F] text-white font-bold";
    case "D":
      return "bg-[#C62026] text-white font-bold";
    case "E":
      return "bg-[#6E2312] text-white font-bold";
    default:
      return "bg-[#6E2312] text-white font-bold";
  }
};

const getScoreColorterm = (englishTermTot, englishTermGrade) => {
  // Use the same color as the grade
  return getGradeColorterm(englishTermGrade);
};


const englishTermTot = (data?.termData?.English?.FA1?.marks === 111 ? 0 : data?.termData?.English?.FA1?.marks) +  (data?.termData?.English?.FA2?.marks === 111 ? 0 : data?.termData?.English?.FA2?.marks) +  (data?.termData?.English?.SA1?.marks === 111 ? 0 :data?.termData?.English?.SA1?.marks)
const englishTermGrade = calculateGradeterm(englishTermTot);

const kannadaTermTot = (data?.termData?.Kannada?.FA1?.marks === 111 ? 0 : data?.termData?.Kannada?.FA1?.marks) + (data?.termData?.Kannada?.FA2?.marks === 111 ? 0 : data?.termData?.Kannada?.FA2?.marks) +  ( data?.termData?.Kannada?.SA1?.marks === 111 ? 0 : data?.termData?.Kannada?.SA1?.marks)
const kannadaTermGrade = calculateGradeterm(kannadaTermTot);

const hindiTermTot = (data?.termData?.Hindi?.FA1?.marks === 111 ? 0 : data?.termData?.Hindi?.FA1?.marks ) +  (data?.termData?.Hindi?.FA2?.marks === 111 ? 0 : data?.termData?.Hindi?.FA2?.marks) +  ( data?.termData?.Hindi?.SA1?.marks === 111 ? 0 : data?.termData?.Hindi?.SA1?.marks)
const hindiTermGrade = calculateGradeterm(hindiTermTot);

const mathTermTot = (data?.termData?.Mathematics?.FA1?.marks === 111 ? 0 : data?.termData?.Mathematics?.FA1?.marks ) +  (data?.termData?.Mathematics?.FA2?.marks === 111 ? 0 : data?.termData?.Mathematics?.FA2?.marks) + ( data?.termData?.Mathematics?.SA1?.marks === 111 ? 0 : data?.termData?.Mathematics?.SA1?.marks)
const mathTermGrade = calculateGradeterm(mathTermTot);

const evsTermTot = (data?.termData?.["E V S / General Science"]?.FA1?.marks === 111 ? 0 : data?.termData?.["E V S / General Science"]?.FA1?.marks ) +  (data?.termData?.["E V S / General Science"]?.FA2?.marks === 111 ? 0 : data?.termData?.["E V S / General Science"]?.FA2?.marks) +  (data?.termData?.["E V S / General Science"]?.SA1?.marks === 111 ? 0 : data?.termData?.["E V S / General Science"]?.SA1?.marks)
const evsTermGrade = calculateGradeterm(evsTermTot);

const socialTermTot = (data?.termData?.["Social Science"]?.FA1?.marks === 111 ? 0 : data?.termData?.["Social Science"]?.FA1?.marks) +  (data?.termData?.["Social Science"]?.FA2?.marks === 111 ? 0 : data?.termData?.["Social Science"]?.FA2?.marks) +  (data?.termData?.["Social Science"]?.SA1?.marks === 111 ? 0 : data?.termData?.["Social Science"]?.SA1?.marks)
const socialTermGrade = calculateGradeterm(socialTermTot);



  const term1Total =
  englishTermTot +
  kannadaTermTot +
  hindiTermTot +
  mathTermTot +
  evsTermTot +
  socialTermTot;

  let perterm1;
  let calculateGradeterm1;
  
  if(data?.student?.joining_details?.class?.class_name === 'Grade 5') {
      perterm1 = ((term1Total / 250) * 100).toFixed(2);
  
      calculateGradeterm1 = (term1Total) => {
          if (term1Total >= 222.3) {
              return "A+";
          } else if (term1Total >= 194.52) {
              return "A";
          } else if (term1Total >= 166.74) {
              return "B+";
          } else if (term1Total >= 138.96) {
              return "B";
          } else if (term1Total >= 111.18) {
              return "C+";
          } else if (term1Total >= 83.34) {
              return "C";
          } else if (term1Total >= 55.58) {
              return "D+";
          } else if (term1Total >= 27.78) {
              return "D";
          } else {
              return "E";
          }
      };
  } else {
      perterm1 = ((term1Total / 300) * 100).toFixed(2);
  
      calculateGradeterm1 = (term1Total) => {
          if (term1Total >= 266.71) {
              return "A+";
          } else if (term1Total >= 233.37) {
              return "A";
          } else if (term1Total >= 200) {
              return "B+";
          } else if (term1Total >= 166.69) {
              return "B";
          } else if (term1Total >= 133.35) {
              return "C+";
          } else if (term1Total >= 100) {
              return "C";
          } else if (term1Total >= 66.67) {
              return "D+";
          } else if (term1Total >= 33.34) {
              return "D";
          } else {
              return "E";
          }
      };
  }

  const gradeterm1 = calculateGradeterm1(term1Total);

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-[#C756A1] text-white font-bold";
      case "A":
        return "bg-[#6C8CC8] text-white font-bold";
      case "B+":
        return "bg-[#00A651] text-white font-bold";
      case "B":
        return "bg-[#00AEEF] text-white font-bold";
      case "C+":
        return "bg-[#A6CE39] text-white font-bold";
      case "C":
        return "bg-[#D7CB70] text-white font-bold";
      case "D+":
        return "bg-[#F5821F] text-white font-bold";
      case "D":
        return "bg-[#C62026] text-white font-bold";
      case "E":
        return "bg-[#6E2312] text-white font-bold";
      default:
        return "bg-[#6E2312] text-white font-bold";
    }
  };

  const getGradeColorsub = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-[#C756A1] text-white font-bold";
      case "A":
        return "bg-[#6C8CC8] text-white font-bold";
      case "B+":
        return "bg-[#00A651] text-white font-bold";
      case "B":
        return "bg-[#00AEEF] text-white font-bold";
      case "C+":
        return "bg-[#A6CE39] text-white font-bold";
      case "C":
        return "bg-[#D7CB70] text-white font-bold";
      case "D+":
        return "bg-[#F5821F] text-white font-bold";
      case "D":
        return "bg-[#C62026] text-white font-bold";
      case "E":
        return "bg-[#6E2312] text-white font-bold";
      default:
        return "bg-[#6E2312] text-white font-bold";
    }
  };

  const getScoreColorsub = (score, grade) => {
    // Use the same color as the grade
    return getGradeColorsub(grade);
  };

  const getGradeColorsuboverall = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-[#C756A1] text-white font-bold ";
      case "A":
        return "bg-[#6C8CC8] text-white font-bold";
      case "B+":
        return "bg-[#00A651] text-white font-bold";
      case "B":
        return "bg-[#00AEEF] text-white font-bold ";
      case "C+":
        return "bg-[#A6CE39] text-white font-bold";
      case "C":
        return "bg-[#D7CB70] text-white font-bold";
      case "D+":
        return "bg-[#F5821F] text-white font-bold";
      case "D":
        return "bg-[#C62026] text-white font-bold";
      case "E":
        return "bg-[#6E2312] text-white font-bold";
      default:
        return "bg-white text-black font-bold";
    }
  };

  return (
    <div className="mx-6">
      <div className=" border-2 border-black">
        <div>
          <img src={Imagemain} alt="" />
        </div>
        <div className="flex justify-center items-center my-6  ">
          <img
            className="w-40 h-40 border-2 border-gray-500"
            src={studentImage}
          />
        </div>
        <p className="font-bold text-2xl text-center mt-8 text-[#99154B] ">
          Student Cummulative Record
        </p>
        <p className="font-bold text-sm text-center mt-2 text-blue-800 ">
          Academic year {data?.student?.joining_details?.year}
        </p>
        <div className="ml-32">
          <p className="font-bold text-md text-start mt-14   text-blue-800 ">
            Student Name :{" "}
            <span className="text-gray-700 text-md capitalize">
              {data?.student?.personal_details?.full_name}
            </span>
          </p>
          <p className="font-bold text-md text-start text-blue-800 ">
            Grade & Section :
            <span className="text-gray-700 text-md capitalize">
              {" "}
              {data?.student?.joining_details?.class?.class_name} & &nbsp;
              {data?.student?.joining_details?.section?.section_name}
            </span>
          </p>
        </div>
        <p className="font-bold text-2xl text-center underline mt-10 text-[#99154B] ">
          Student Profile
        </p>

        <div className="flex items-center  justify-between mt-10 mx-32 font-semibold  leading-relaxed">
          <div className="font-bold text-md text-blue-800">
            <p>
              Gender :{" "}
              <span className="text-gray-700 text-md capitalize">
                {data?.student?.personal_details?.gender}
              </span>
            </p>
            <p style={{ lineHeight: "2" }}>
              Date of Birth:{" "}
              <span className="text-gray-700 text-md capitalize">
                {dayjs(data?.student?.personal_details?.dob).format(
                  "DD-MM-YYYY"
                )}
              </span>
            </p>
            <p>
              Father's Name:{" "}
              <span className="text-gray-700 text-md capitalize">
                {data?.student?.contact_details?.father_name}
              </span>
            </p>
            <p style={{ lineHeight: "2" }}>
              Mother's Name:{" "}
              <span className="text-gray-700 text-md capitalize">
                {data?.student?.contact_details?.mother_name}
              </span>
            </p>
          </div>

          <div className="font-bold text-md  text-blue-800 ">
            <p>
              Roll No:{" "}
              <span className="text-gray-700 text-md capitalize">
                {data?.student?.joining_details?.admission_number}
              </span>
            </p>
            <p style={{ lineHeight: "2" }}>
              Register Number:{" "}
              <span className="text-gray-700 text-md capitalize">
                {data?.student?.joining_details?.register_number}
              </span>
            </p>
            <p>
              Mother Tongue:{" "}
              <span className="text-gray-700 text-md capitalize">
                {data?.student?.personal_details?.mother_tongue}
              </span>
            </p>
            <p style={{ lineHeight: "2" }}>
              Nationality:{" "}
              <span className="text-gray-700 text-md capitalize">
                {data?.student?.personal_details?.nationality}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h1 className="italic text-3xl font-serif text-center text-green-900 leading-relaxed">
            "Come, Lets put the world within child's reach!!!"
          </h1>
        </div>
        <div className="mt-10">
          <img src={Footer} alt="Report Image" />
        </div>
      </div>

     

      <div className="border-2 border-black mt-2 need ">
        <div className="mx-4">
        <div className="flex my-2 w-full ">
          <span className="text-xs w-20 ">Year: {data?.student?.joining_details?.year}</span>
          <p className="flex justify-center w-full uppercase text-md font-semibold inline-block">{termData?.term}</p>

         </div>
            <div className="flex justify-between">
              <img src={Imagesub} className="w-[400px]" alt="Report Image" />
              <span className="mx-4  text-gray-700">
                {/* Name:&nbsp; */}
                <span className="font-bold text-black">
                  {data?.student?.personal_details?.full_name}
                </span>
                <p className="text-start font-bold text-sm ">
              {data?.student?.joining_details?.class?.class_name} | {data?.student?.joining_details?.admission_number}
            </p>
              </span>
         
            </div>
          <div>
            <p className="bg-blue-400 text-white mb-1 ">
              &nbsp;ACADEMIC PERFORMANCE
            </p>
            <img src={Marksbar} className="w-full" alt="Report Image" />
            <p className="text-xs">(All values are in %)</p>
          </div>
          <div className="w-full  overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-2 border-gray-600  text-sm bg-gray-200">
                  <th className="border-2 border-gray-600  text-start">
                    Subject
                  </th>
                  <th
                    className="border-2 border-gray-600 text-center w-4"
                    colSpan="2"
                  >
                    FA1
                    <br />
                    <div className="flex justify-evenly">
                      <span>Marks</span>
                      <span>Grade</span>
                    </div>
                  </th>
                  <th
                    className="border-2 border-gray-600 text-center w-4"
                    colSpan="2"
                  >
                    FA2
                    <br />
                    <div className="flex justify-evenly">
                      <span>Marks</span>
                      <span>Grade</span>
                    </div>
                  </th>
                  <th
                    className="border-2 border-gray-600 text-center w-4"
                    colSpan="2"
                  >
                    SA1
                    <br />
                    <div className="flex justify-evenly">
                      <span>Marks</span>
                      <span>Grade</span>
                    </div>
                  </th>
                  <th
                    className="border-2 border-gray-600 text-center w-4"
                    colSpan="2"
                  >
                    TERM1
                    <br />
                    <div className="flex justify-evenly">
                      <span>Marks</span>
                      <span>Grade</span>
                    </div>
                  </th>
                </tr>
              </thead>


              <tbody>
                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    English
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.English?.FA1?.marks,
                        data?.termData?.English?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.English?.FA1?.marks === 0 ? "NT" : data?.termData?.English?.FA1?.marks === 111 ? "AB" : data?.termData?.English?.FA1?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.English?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.English?.FA1?.grade}
                    </span>
                  </td>

                  
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.English?.FA2?.marks,
                        data?.termData?.English?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.English?.FA2?.marks === 0 ? "NT" : data?.termData?.English?.FA2?.marks === 111 ? "AB" : data?.termData?.English?.FA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.English?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.English?.FA2?.grade}
                    </span>
                  </td>


                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.English?.SA1?.marks,
                        data?.termData?.English?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.English?.SA1?.marks === 0 ? "NT" : data?.termData?.English?.SA1?.marks === 111 ? "AB" : data?.termData?.English?.SA1?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.English?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.English?.SA1?.grade}
                    </span>
                  </td>


                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        englishTermTot,
                        englishTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { englishTermTot ===0 ? "NT" : englishTermTot.toFixed(2)}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                         englishTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { englishTermGrade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Kannada
                  </td>
                 

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.Kannada?.FA1?.marks,
                        data?.termData?.Kannada?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.Kannada?.FA1?.marks ===0 ? "NT" : data?.termData?.Kannada?.FA1?.marks === 111 ? "AB" : data?.termData?.Kannada?.FA1?.marks}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.Kannada?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.Kannada?.FA1?.grade}
                    </span>
                  </td>





                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.Kannada?.FA2?.marks,
                        data?.termData?.Kannada?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.Kannada?.FA2?.marks === 0 ? "NT" : data?.termData?.Kannada?.FA2?.marks === 111 ? "AB" : data?.termData?.Kannada?.FA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.Kannada?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.Kannada?.FA2?.grade}
                    </span>
                  </td>



                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.Kannada?.SA1?.marks,
                        data?.termData?.Kannada?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.Kannada?.SA1?.marks === 0 ? "NT" : data?.termData?.Kannada?.SA1?.marks === 111 ? "AB" : data?.termData?.Kannada?.SA1?.marks}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.Kannada?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.Kannada?.SA1?.grade}
                    </span>
                  </td>



                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                       kannadaTermTot,
                       kannadaTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { kannadaTermTot ===0 ? "NT" : kannadaTermTot.toFixed(2)}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                         kannadaTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { kannadaTermGrade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Hindi
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.Hindi?.FA1?.marks,
                        data?.termData?.Hindi?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.Hindi?.FA1?.marks === 0 ? "NT" : data?.termData?.Hindi?.FA1?.marks === 111 ? "AB" : data?.termData?.Hindi?.FA1?.marks}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.Hindi?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.Hindi?.FA1?.grade}
                    </span>
                  </td>




                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.Hindi?.FA2?.marks,
                        data?.termData?.Hindi?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.Hindi?.FA2?.marks === 0 ? "NT" : data?.termData?.Hindi?.FA2?.marks === 111 ? "AB" : data?.termData?.Hindi?.FA2?.marks}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.Hindi?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.Hindi?.FA2?.grade}
                    </span>
                  </td>



                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.Hindi?.SA1?.marks,
                        data?.termData?.Hindi?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.Hindi?.SA1?.marks ===0 ? "NT" : data?.termData?.Hindi?.SA1?.marks === 111 ? "AB" : data?.termData?.Hindi?.SA1?.marks}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.Hindi?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.Hindi?.SA1?.grade}
                    </span>
                  </td>






                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        hindiTermTot,
                        hindiTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { hindiTermTot ===0 ? "NT" : hindiTermTot.toFixed(2)}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                         hindiTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { hindiTermGrade}
                    </span>
                  </td>

                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Mathematics
                  </td>
                 
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.Mathematics?.FA1?.marks,
                        data?.termData?.Mathematics?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.Mathematics?.FA1?.marks === 0 ? "NT" : data?.termData?.Mathematics?.FA1?.marks === 111 ? "AB" : data?.termData?.Mathematics?.FA1?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.Mathematics?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.Mathematics?.FA1?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.Mathematics?.FA2?.marks,
                        data?.termData?.Mathematics?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.Mathematics?.FA2?.marks === 0 ? "NT" : data?.termData?.Mathematics?.FA2?.marks === 111 ? "AB" : data?.termData?.Mathematics?.FA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.Mathematics?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.Mathematics?.FA2?.grade}
                    </span>
                  </td>





                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.Mathematics?.SA1?.marks,
                        data?.termData?.Mathematics?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.Mathematics?.SA1?.marks === 0 ? "NT" : data?.termData?.Mathematics?.SA1?.marks === 111 ? "AB" : data?.termData?.Mathematics?.SA1?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.Mathematics?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.Mathematics?.SA1?.grade}
                    </span>
                  </td>


                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        mathTermTot,
                        mathTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { mathTermTot ===0 ? "NT" : mathTermTot.toFixed(2)}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                         mathTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { mathTermGrade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    E.V.S./ General Science
                  </td>



                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["E V S / General Science"]?.FA1?.marks,
                        data?.termData?.["E V S / General Science"]?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.["E V S / General Science"]?.FA1?.marks === 0 ? "NT" : data?.termData?.["E V S / General Science"]?.FA1?.marks === 111 ? "AB" : data?.termData?.["E V S / General Science"]?.FA1?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.["E V S / General Science"]?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.["E V S / General Science"]?.FA1?.grade}
                    </span>
                  </td>



                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["E V S / General Science"]?.FA2?.marks,
                        data?.termData?.["E V S / General Science"]?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.["E V S / General Science"]?.FA2?.marks === 0 ? "NT" : data?.termData?.["E V S / General Science"]?.FA2?.marks === 111 ? "AB" : data?.termData?.["E V S / General Science"]?.FA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.["E V S / General Science"]?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.["E V S / General Science"]?.FA2?.grade}
                    </span>
                  </td>



                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["E V S / General Science"]?.SA1?.marks,
                        data?.termData?.["E V S / General Science"]?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.["E V S / General Science"]?.SA1?.marks ===0 ? "NT" : data?.termData?.["E V S / General Science"]?.SA1?.marks === 111 ? "AB" : data?.termData?.["E V S / General Science"]?.SA1?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.["E V S / General Science"]?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.["E V S / General Science"]?.SA1?.grade}
                    </span>
                  </td>



                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        evsTermTot,
                        evsTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { evsTermTot ===0 ? "NT" : evsTermTot.toFixed(2)}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                         evsTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { evsTermGrade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Social Science
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Social Science"]?.FA1?.marks,
                        data?.termData?.["Social Science"]?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.["Social Science"]?.FA1?.marks ===0 ? "NT" : data?.termData?.["Social Science"]?.FA1?.marks === 111 ? "AB" : data?.termData?.["Social Science"]?.FA1?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.["Social Science"]?.FA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.["Social Science"]?.FA1?.grade}
                    </span>
                  </td>





                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Social Science"]?.FA2?.marks,
                        data?.termData?.["Social Science"]?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.["Social Science"]?.FA2?.marks ===0 ? "NT" : data?.termData?.["Social Science"]?.FA2?.marks === 111 ? "AB" : data?.termData?.["Social Science"]?.FA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.["Social Science"]?.FA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.["Social Science"]?.FA2?.grade}
                    </span>
                  </td>



                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Social Science"]?.SA1?.marks,
                        data?.termData?.["Social Science"]?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                    { data?.termData?.["Social Science"]?.SA1?.marks === 0 ? "NT" : data?.termData?.["Social Science"]?.SA1?.marks === 111 ? "AB" : data?.termData?.["Social Science"]?.SA1?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                         data?.termData?.["Social Science"]?.SA1?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { data?.termData?.["Social Science"]?.SA1?.grade}
                    </span>
                  </td>



                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        socialTermTot,
                        socialTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {  socialTermTot ===0 ? 'NT' : socialTermTot.toFixed(2)}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                         socialTermGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      { socialTermGrade}
                    </span>
                  </td>
                </tr>
              </tbody>

              
            </table>
          </div>

          <div className="w-full  overflow-x-auto mt-4">
            <p className="bg-blue-400 text-white mb-1 ">
              &nbsp;OVERALL PERFORMANCE
            </p>
            <table className="w-full text-center">
              <thead>
                <tr className="border-2 border-gray-600  text-sm bg-gray-200">
                  <th className="border-2 border-gray-600  ">OVERALL</th>
                  <th className="border-2 border-gray-600  ">FA1</th>
                  <th className="border-2 border-gray-600  ">FA2</th>
                  <th className="border-2 border-gray-600  ">SA1</th>
                  <th className="border-2 border-gray-600  ">TERM1</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Score
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {fa1Total.toFixed(2)}
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {fa2Total.toFixed(2)}
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {SA1Total.toFixed(2)}
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {term1Total.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Grade
                  </td>
                  <td className="relative border-2 border-gray-600">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsuboverall(
                        gradefa1
                      )}`}
                      style={{
                        left: "20%", // Adjust the left value to control the width
                        right: "20%", // Adjust the right value to control the width
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {gradefa1}
                    </span>
                  </td>
                  <td className="relative border-2 border-gray-600">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsuboverall(
                        gradefa2
                      )}`}
                      style={{
                        left: "20%", // Adjust the left value to control the width
                        right: "20%", // Adjust the right value to control the width
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {gradefa2}
                    </span>
                  </td>
                  <td className="relative border-2 border-gray-600">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsuboverall(
                        gradeSA1
                      )}`}
                      style={{
                        left: "20%", // Adjust the left value to control the width
                        right: "20%", // Adjust the right value to control the width
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {gradeSA1}
                    </span>
                  </td>
                  <td className="relative border-2 border-gray-600">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsuboverall(
                        gradeterm1
                      )}`}
                      style={{
                        left: "20%", // Adjust the left value to control the width
                        right: "20%", // Adjust the right value to control the width
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {gradeterm1}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Percentage
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {perfa1}%
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {perfa2}%
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {perSA1}%
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {perterm1}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 mx-4">
          <h1 className="text-sky-500 text-md font-semibold">Remarks</h1>
          <p className="text-sm mx-4">{data?.cotermdata?.remarks}</p>
        </div>

        <div className="mx-4 mt-16">
          <h1 className="text-sky-500 text-md font-semibold">
            Attendance & Health Status
          </h1>
          <hr />
          <div className="flex justify-evenly gap-20 mt-2 ">
            <span>Attd :{data?.cotermdata?.attendence}</span>
            <span>Height :{data?.student?.joining_details?.height}cm</span>
            <span>Weight :{data?.student?.joining_details?.weight}Kg</span>
            <span>BMI :{data?.student?.joining_details?.BMI}</span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
         {data?.cotermdata?.promotion_status === 'Promoted' ? <FaCheck className="text-green-500 text-2xl"/> : '' } 
         <h1 className="text-lg font-bold uppercase">{data?.cotermdata?.promotion_status === 'Promoted' ? data?.cotermdata?.promotion_status : ''}</h1>
         </div>



          <div className="flex justify-evenly  mt-8 gap-10 ">
            <div>
              <p className="">-------------------------</p>
              <p className="p-0">Signature of Parent</p>
            </div>
            <div>
              <p className="">----------------------------------</p>
              <p>Signature of Grade Teacher</p>
            </div>
            <div>
              <p className="">-----------------------------</p>
              <p>Signature of Principal</p>
            </div>
          </div>
        </div>
        <div className="mt-20    ">
          <span className="text-sm  mx-4 text-sky-500">
            Nandini Layout, Bangalore - 96. Email : sps_nlo@yahoo.com{" "}
          </span>
          <img src={Footer} alt="Report Image" />
        </div>
      </div>


      <div className="border-2 border-black mt-4  need ">
        <div className="mx-4 ">
        <div className="flex my-2 w-full ">
          <span className="text-xs w-20 ">Year: {data?.student?.joining_details?.year}</span>
          <p className="flex justify-center w-full uppercase text-md font-semibold inline-block">{termData?.term}</p>

         </div>
            <div className="flex justify-between">
              <img src={Imagesub} className="w-[400px]" alt="Report Image" />
              <span className="mx-4  text-gray-700">
                {/* Name:&nbsp; */}
                <span className="font-bold text-black">
                  {data?.student?.personal_details?.full_name}
                </span>
                <p className="text-start font-bold text-sm ">
              {data?.student?.joining_details?.class?.class_name} | {data?.student?.joining_details?.admission_number}
            </p>
              </span>
         
            </div>
          <div>
            <p className="bg-blue-400 text-white mb-1 ">
              &nbsp;CO-SCHOLASTIC PERFORMANCE
            </p>
            <img src={Marksbar1} className="w-full" alt="Report Image" />
            <p className="text-xs">(All values are in %)</p>
          </div>

          <div className="flex gap-2 w-full">
            <div className="w-full">
              <table className="border-2 border-gray-600 w-full">
                <thead>
                  <tr className="border-2 border-gray-600 text-end text-sm">
                    {termData?.term}
                  </tr>
                  <tr className="border-2 border-gray-600 text-sm bg-gray-200">
                    <th className="border-2 border-gray-600  text-start">
                      Subject
                    </th>

                    <th className="border-2 border-gray-600 w-16 text-center">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Reading (Co-curricular Activities){" "}
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.reading?.reading_total?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.reading?.reading_total?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Knows required vocabulary
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.reading?.vocabulary?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        
                        {data?.cotermdata?.reading?.vocabulary?.marks === 12 ? 'AB' : data?.cotermdata?.reading?.vocabulary?.marks === 11 ? 'NT' : data?.cotermdata?.reading?.vocabulary?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Understands what to read
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.reading?.what_to_read?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        
                        {data?.cotermdata?.reading?.what_to_read?.marks === 12 ? 'AB' : data?.cotermdata?.reading?.what_to_read?.marks === 11 ? 'NT' : data?.cotermdata?.reading?.what_to_read?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Reads fluently
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.reading?.reads_fluently?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                       
                        {data?.cotermdata?.reading?.reads_fluently?.marks === 12 ? 'AB' : data?.cotermdata?.reading?.reads_fluently?.marks === 11 ? 'NT' : data?.cotermdata?.reading?.reads_fluently?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Applies phonic skills
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.reading?.phonic_skills?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                       
                        {data?.cotermdata?.reading?.phonic_skills?.marks === 12 ? 'AB' : data?.cotermdata?.reading?.phonic_skills?.marks === 11 ? 'NT' : data?.cotermdata?.reading?.phonic_skills?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Work Skills (Co-curricular Activities){" "}
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_skills?.work_skills_total
                            ?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {
                          data?.cotermdata?.work_skills?.work_skills_total
                            ?.grade
                        }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Listens attentively
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_skills?.listens_attentively
                            ?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                  
                         {data?.cotermdata?.work_skills?.listens_attentively?.marks === 12 ? 'AB' : data?.cotermdata?.work_skills?.listens_attentively?.marks === 11 ? 'NT' : data?.cotermdata?.work_skills?.listens_attentively?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Follows directions
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_skills?.follows_directions
                            ?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      
                         {data?.cotermdata?.work_skills?.follows_directions?.marks === 12 ? 'AB' : data?.cotermdata?.work_skills?.follows_directions?.marks === 11 ? 'NT' : data?.cotermdata?.work_skills?.follows_directions?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Work well independently
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_skills?.Work_well_independently
                            ?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                       
                         {data?.cotermdata?.work_skills?.Work_well_independently?.marks === 12 ? 'AB' : data?.cotermdata?.work_skills?.Work_well_independently?.marks === 11 ? 'NT' : data?.cotermdata?.work_skills?.Work_well_independently?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Completes class assignments on time
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_skills?.assignments_on_time
                            ?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      
                        {data?.cotermdata?.work_skills?.assignments_on_time?.marks === 12 ? 'AB' : data?.cotermdata?.work_skills?.assignments_on_time?.marks === 11 ? 'NT' : data?.cotermdata?.work_skills?.assignments_on_time?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Does work neatly
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_skills?.does_work_neatly?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      
                        {data?.cotermdata?.work_skills?.does_work_neatly?.marks === 12 ? 'AB' : data?.cotermdata?.work_skills?.does_work_neatly?.marks === 11 ? 'NT' : data?.cotermdata?.work_skills?.does_work_neatly?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Specials : Participates Co-operatively/effort in
                      (Co-curricular Activities){" "}
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.specials?.specials_total?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.specials?.specials_total?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Computer</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.specials?.computer?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        
                        {data?.cotermdata?.specials?.computer?.marks === 12 ? 'AB' : data?.cotermdata?.specials?.computer?.marks === 11 ? 'NT' : data?.cotermdata?.specials?.computer?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Moral Science / Value Education
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.specials?.moral_science?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.specials?.moral_science?.marks === 12 ? 'AB' : data?.cotermdata?.specials?.moral_science?.marks === 11 ? 'NT' : data?.cotermdata?.specials?.moral_science?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Physical Education
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.specials?.physical_education?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.specials?.physical_education?.marks === 12 ? 'AB' : data?.cotermdata?.specials?.physical_education?.marks === 11 ? 'NT' : data?.cotermdata?.specials?.physical_education?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      General Knowledge
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.specials?.general_knowledge?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.specials?.general_knowledge?.marks === 12 ? 'AB' : data?.cotermdata?.specials?.general_knowledge?.marks === 11 ? 'NT' : data?.cotermdata?.specials?.general_knowledge?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Drawing</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.specials?.drawing?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.specials?.drawing?.marks === 12 ? 'AB' : data?.cotermdata?.specials?.drawing?.marks === 11 ? 'NT' : data?.cotermdata?.specials?.drawing?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Project Activity (Hands - on Activities){" "}
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.project_activity?.project_activity_total?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.project_activity?.project_activity_total?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">English</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.project_activity?.English?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.project_activity?.English?.marks === 12 ? 'AB' : data?.cotermdata?.project_activity?.English?.marks === 11 ? 'NT' : data?.cotermdata?.project_activity?.English?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Math</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.project_activity?.Math?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.project_activity?.Math?.marks === 12 ? 'AB' : data?.cotermdata?.project_activity?.Math?.marks === 11 ? 'NT' : data?.cotermdata?.project_activity?.Math?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">E.V.S</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.project_activity?.E_V_S?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.project_activity?.E_V_S?.marks === 12 ? 'AB' : data?.cotermdata?.project_activity?.E_V_S?.marks === 11 ? 'NT' : data?.cotermdata?.project_activity?.E_V_S?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Events and Celebrations (Art/Craft)
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.project_activity
                            ?.events_and_celebrations?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.project_activity?.events_and_celebrations?.marks === 12 ? 'AB' : data?.cotermdata?.project_activity?.events_and_celebrations?.marks === 11 ? 'NT' : data?.cotermdata?.project_activity?.events_and_celebrations?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-full">
              <table className="border-2 border-gray-600 w-full">
                <thead>
                  <tr className="border-2 border-gray-600 text-end text-sm ">
                    {termData?.term}
                  </tr>
                  <tr className="border-2 border-gray-600 text-sm bg-gray-200">
                    <th className="border-2 border-gray-600  text-start">
                      Subject
                    </th>

                    <th className="border-2 border-gray-600 w-16 text-center">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Spelling (Co-curricular Activities){" "}
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.spelling?.spelling_total?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.spelling?.spelling_total?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Spells assigned words correctly
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.spelling?.words_correctly?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.spelling?.words_correctly?.marks === 12 ? 'AB' : data?.cotermdata?.spelling?.words_correctly?.marks === 11 ? 'NT' : data?.cotermdata?.spelling?.words_correctly?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Applies spelling skills to daily work
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.spelling?.spelling_skills?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.spelling?.spelling_skills?.marks === 12 ? 'AB' : data?.cotermdata?.spelling?.spelling_skills?.marks === 11 ? 'NT' : data?.cotermdata?.spelling?.spelling_skills?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Social Skills (Co-curricular Activities){" "}
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.social_skills?.social_skills_total?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.social_skills?.social_skills_total?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Obeys class room/school rules
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.social_skills?.school_rules?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.social_skills?.school_rules?.marks === 12 ? 'AB' : data?.cotermdata?.social_skills?.school_rules?.marks === 11 ? 'NT' : data?.cotermdata?.social_skills?.school_rules?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Demonstrates self control
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.social_skills?.self_control?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.social_skills?.self_control?.marks === 12 ? 'AB' : data?.cotermdata?.social_skills?.self_control?.marks === 11 ? 'NT' : data?.cotermdata?.social_skills?.self_control?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Shows respect to self & others
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.social_skills
                            ?.respect_to_self_others?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.social_skills?.respect_to_self_others?.marks === 12 ? 'AB' : data?.cotermdata?.social_skills?.respect_to_self_others?.marks === 11 ? 'NT' : data?.cotermdata?.social_skills?.respect_to_self_others?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Written Expression (English 1)
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_expression
                            ?.written_expression_total?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {
                          data?.cotermdata?.written_expression
                            ?.written_expression_total?.grade
                        }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Uses capital letters correctly
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_expression
                            ?.letters_correctly?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.written_expression?.letters_correctly?.marks === 12 ? 'AB' : data?.cotermdata?.written_expression?.letters_correctly?.marks === 11 ? 'NT' : data?.cotermdata?.written_expression?.letters_correctly?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Uses punctuation correctly
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_expression
                            ?.punctuation_correctly?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.written_expression?.punctuation_correctly?.marks === 12 ? 'AB' : data?.cotermdata?.written_expression?.punctuation_correctly?.marks === 11 ? 'NT' : data?.cotermdata?.written_expression?.punctuation_correctly?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Writes in complete sentences
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_expression
                            ?.complete_sentences?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.written_expression?.complete_sentences?.marks === 12 ? 'AB' : data?.cotermdata?.written_expression?.complete_sentences?.marks === 11 ? 'NT' : data?.cotermdata?.written_expression?.complete_sentences?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Vedic Maths (Co-curricular Activities)
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.vedic_maths?.vedic_maths_total
                            ?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {
                          data?.cotermdata?.vedic_maths?.vedic_maths_total
                            ?.grade
                        }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Clear with the concept
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.vedic_maths?.Clear_with_the_concept
                            ?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                       
                        {data?.cotermdata?.vedic_maths?.Clear_with_the_concept?.marks === 12 ? 'AB' : data?.cotermdata?.vedic_maths?.Clear_with_the_concept?.marks === 11 ? 'NT' : data?.cotermdata?.vedic_maths?.Clear_with_the_concept?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Speed and Accuracy
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.vedic_maths?.speed_accuracy?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      
                        {data?.cotermdata?.vedic_maths?.speed_accuracy?.marks === 12 ? 'AB' : data?.cotermdata?.vedic_maths?.speed_accuracy?.marks === 11 ? 'NT' : data?.cotermdata?.vedic_maths?.speed_accuracy?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Ability for numerical Tables
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.vedic_maths?.numerical_tables?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        
                        {data?.cotermdata?.vedic_maths?.numerical_tables?.marks === 12 ? 'AB' : data?.cotermdata?.vedic_maths?.numerical_tables?.marks === 11 ? 'NT' : data?.cotermdata?.vedic_maths?.numerical_tables?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Reading
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Reading?.Reading_Total?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.Reading?.Reading_Total?.grade}
                        
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">English</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Reading?.english?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.Reading?.english?.marks === 12 ? 'AB' : data?.cotermdata?.Reading?.english?.marks === 11 ? 'NT' : data?.cotermdata?.Reading?.english?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Kannada</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Reading?.kannada?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        
                        {data?.cotermdata?.Reading?.kannada?.marks === 12 ? 'AB' : data?.cotermdata?.Reading?.kannada?.marks === 11 ? 'NT' : data?.cotermdata?.Reading?.kannada?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Hindi</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Reading?.hindi?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      
                        {data?.cotermdata?.Reading?.hindi?.marks === 12 ? 'AB' : data?.cotermdata?.Reading?.hindi?.marks === 11 ? 'NT' : data?.cotermdata?.Reading?.hindi?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Dictation
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Dictation?.Dictation_total?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.Dictation?.Dictation_total?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">English</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Dictation?.english?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        
                        {data?.cotermdata?.Dictation?.hindi?.english === 12 ? 'AB' : data?.cotermdata?.Dictation?.english?.marks === 11 ? 'NT' : data?.cotermdata?.Dictation?.english?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Kannada</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Dictation?.kannada?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        
                        {data?.cotermdata?.Dictation?.kannada?.english === 12 ? 'AB' : data?.cotermdata?.Dictation?.kannada?.marks === 11 ? 'NT' : data?.cotermdata?.Dictation?.kannada?.grade }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Hindi</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Dictation?.hindi?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      {data?.cotermdata?.Dictation?.hindi?.marks === 12 ? 'AB' : data?.cotermdata?.Dictation?.hindi?.marks === 11 ? 'NT' : data?.cotermdata?.Dictation?.hindi?.grade }
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className=" mt-20">
          <span className="text-sm mt-10 mx-4 text-sky-500">
            Nandini Layout, Bangalore - 96. Email : sps_nlo@yahoo.com{" "}
          </span>
          <img src={Footer} alt="Report Image" />
        </div>
      </div>

      
    </div>
  );
};

const Report5to9 = ({ data, termData }) => {
  console.log(data);
  const componentRef = useRef();
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.html(componentRef.current, {
      callback: function (pdf) {
        pdf.save("table.pdf");
      },
    });
  };

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button
            className="  ml-[84%] bg-[#43468B] text-white text-center al flex border px-4 py-2 rounded-md mb-2"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        )}
        content={() => componentRef.current}
      />
      <div ref={componentRef} className="mt-4">
        <PrintComponent data={data} termData={termData} />
      </div>
    </div>
  );
};

export default Report5to9;
