import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import Imagemain from "../../Images/mainfront.png";
import Imagesub from "../../Images/logosub.png";
import Marksbar from "../../Images/lkg bar.png";
import Marksbar1 from "../../Images/onebar.png";
import Footer from "../../Images/Sans Footer3-02.png";
import dayjs from "dayjs";
import "./index.css";



const PrintComponent = ({ data, termData }) => {
  console.log(data);
  const [studentImage, setStudentImage] = useState(null);
 


console.log(termData)



  useEffect(() => {
    const studentImageUrl = data?.student?.personal_details?.student_image;
    setStudentImage(studentImageUrl);
  }, [data]);

  // const fa1Total =
  //   data?.termData?.["English 1"]?.FA3?.marks +
  //   data?.termData?.["English 2"]?.FA3?.marks +
  //   data?.termData?.["English Reading"]?.FA3?.marks +
  //   data?.termData?.["English Dictation"]?.FA3?.marks +
  //   data?.termData?.["Kannada"]?.FA3?.marks +
  //   data?.termData?.["Kannada Reading"]?.FA3?.marks +
  //   data?.termData?.["Kannada Dictation"]?.FA3?.marks +
  //   data?.termData?.["Hindi"]?.FA3?.marks +
  //   data?.termData?.["Hindi Reading"]?.FA3?.marks +
  //   data?.termData?.["Hindi Dictation"]?.FA3?.marks +
  //   data?.termData?.["Mathematics"]?.FA3?.marks +
  //   data?.termData?.["E V S / General Science"]?.FA3?.marks +
  //   data?.termData?.["Social Science"]?.FA3?.marks;

  // const perfa1 = ((fa1Total / 325) * 100).toFixed(2);


  // Array of subject keys
const subjectKeys = [
  "English 1", "English 2", "English Reading", "English Dictation",
  "Kannada", "Kannada Reading", "Kannada Dictation",
  "Hindi", "Hindi Reading", "Hindi Dictation",
  "Mathematics", "E V S / General Science", "Social Science"
];

const validSubjectsCount = subjectKeys.reduce((count, subject) => {
  console.log(count)
  if (data?.termData?.[subject]?.FA3?.marks !== 0) {
    return count + 1;
  }
  console.log("frst",count)
  return count; 

}, 0);

// Calculate the total marks for valid subjects
const fa1Total = subjectKeys.reduce((total, subject) => {
  return total + (data?.termData?.[subject]?.FA3?.marks !== 0 ? data?.termData?.[subject]?.FA3?.marks : 0);
}, 0);

// Calculate the adjusted total based on the number of valid subjects
const adjustedTotal = validSubjectsCount * 25; // Assuming each subject contributes 25 marks


// Calculate the percentage based on the adjusted total
const perfa1 = ((fa1Total / adjustedTotal) * 100).toFixed(2);

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
  //   data?.termData?.["English 1"]?.FA4?.marks +
  //   data?.termData?.["English 2"]?.FA4?.marks +
  //   data?.termData?.["English Reading"]?.FA4?.marks +
  //   data?.termData?.["English Dictation"]?.FA4?.marks +
  //   data?.termData?.["Kannada"]?.FA4?.marks +
  //   data?.termData?.["Kannada Reading"]?.FA4?.marks +
  //   data?.termData?.["Kannada Dictation"]?.FA4?.marks +
  //   data?.termData?.["Hindi"]?.FA4?.marks +
  //   data?.termData?.["Hindi Reading"]?.FA4?.marks +
  //   data?.termData?.["Hindi Dictation"]?.FA4?.marks +
  //   data?.termData?.["Mathematics"]?.FA4?.marks +
  //   data?.termData?.["E V S / General Science"]?.FA4?.marks +
  //   data?.termData?.["Social Science"]?.FA4?.marks;

  // const perfa2 = ((fa2Total / 325) * 100).toFixed(2);

  // const calculateGradefa2 = (fa2Total) => {
  //   if (fa1Total >= 292.5) {
  //     return "A+";
  //   } else if (fa1Total >= 260) {
  //     return "A";
  //   } else if (fa1Total >= 227.5) {
  //     return "B+";
  //   } else if (fa1Total >= 195) {
  //     return "B";
  //   } else if (fa1Total >= 162.5) {
  //     return "C+";
  //   } else if (fa1Total >= 130) {
  //     return "C";
  //   } else if (fa1Total >= 97.5) {
  //     return "D+";
  //   } else if (fa1Total >= 65) {
  //     return "D";
  //   } else {
  //     return "E";
  //   }
  // };

  // const gradefa2 = calculateGradefa2(fa2Total);



  // Array of subject keys
  const subjectKeysfa4 = [
    "English 1", "English 2", "English Reading", "English Dictation",
    "Kannada", "Kannada Reading", "Kannada Dictation",
    "Hindi", "Hindi Reading", "Hindi Dictation",
    "Mathematics", "E V S / General Science", "Social Science"
  ];
  
  const validSubjectsCountFa4 = subjectKeysfa4.reduce((count, subject) => {
    if (data?.termData?.[subject]?.FA4?.marks !== 0) {
      return count + 1;
    }

    return count; 
  
  }, 0);
  
  // Calculate the total marks for valid subjects
  const fa4Total = subjectKeysfa4.reduce((total, subject) => {
    return total + (data?.termData?.[subject]?.FA4?.marks !== 0 ? data?.termData?.[subject]?.FA4?.marks : 0);
  }, 0);
  
  // Calculate the adjusted total based on the number of valid subjects
  const adjustedTotalfa4 = validSubjectsCountFa4 * 25; // Assuming each subject contributes 25 marks
  
  
  // Calculate the percentage based on the adjusted total
  const perfa4 = ((fa4Total / adjustedTotalfa4) * 100).toFixed(2);
  
  const calculateGradefa4 = (fa4Total, adjustedTotalfa4) => {
    const percentagefa4 = (fa4Total / adjustedTotalfa4) * 100;
  
    if (percentagefa4 >= 90) {
      return "A+";
    } else if (percentagefa4 >= 80) {
      return "A";
    } else if (percentagefa4 >= 70) {
      return "B+";
    } else if (percentagefa4 >= 60) {
      return "B";
    } else if (percentagefa4 >= 50) {
      return "C+";
    } else if (percentagefa4 >= 40) {
      return "C";
    } else if (percentagefa4 >= 30) {
      return "D+";
    } else if (percentagefa4 >= 20) {
      return "D";
    } else {
      return "E";
    }
  };
  
    const gradefa4 = calculateGradefa4(fa4Total, adjustedTotalfa4);


  // const sa1Total =
  //   data?.termData?.["English 1"]?.SA2?.marks +
  //   data?.termData?.["English 2"]?.SA2?.marks +
  //   data?.termData?.["English Reading"]?.SA2?.marks +
  //   data?.termData?.["English Dictation"]?.SA2?.marks +
  //   data?.termData?.["Kannada"]?.SA2?.marks +
  //   data?.termData?.["Kannada Reading"]?.SA2?.marks +
  //   data?.termData?.["Kannada Dictation"]?.SA2?.marks +
  //   data?.termData?.["Hindi"]?.SA2?.marks +
  //   data?.termData?.["Hindi Reading"]?.SA2?.marks +
  //   data?.termData?.["Hindi Dictation"]?.SA2?.marks +
  //   data?.termData?.["Mathematics"]?.SA2?.marks +
  //   data?.termData?.["E V S / General Science"]?.SA2?.marks +
  //   data?.termData?.["Social Science"]?.SA2?.marks;

  // const persa1 = ((sa1Total / 650) * 100).toFixed(2);

  // const calculateGradesa1 = (sa1Total) => {
  //   if (sa1Total >= 585) {
  //     return "A+";
  //   } else if (sa1Total >= 520) {
  //     return "A";
  //   } else if (sa1Total >= 455) {
  //     return "B+";
  //   } else if (sa1Total >= 390) {
  //     return "B";
  //   } else if (sa1Total >= 325) {
  //     return "C+";
  //   } else if (sa1Total >= 260) {
  //     return "C";
  //   } else if (sa1Total >= 195) {
  //     return "D+";
  //   } else if (sa1Total >= 130) {
  //     return "D";
  //   } else {
  //     return "E";
  //   }
  // };

  // const gradesa1 = calculateGradesa1(sa1Total);


  //term grades
  
  
// Array of subject keys
const subjectKeyssa2 = [
  "English 1", "English 2", "English Reading", "English Dictation",
  "Kannada", "Kannada Reading", "Kannada Dictation",
  "Hindi", "Hindi Reading", "Hindi Dictation",
  "Mathematics", "E V S / General Science", "Social Science"
];

const validSubjectsCountsa2 = subjectKeyssa2.reduce((count, subject) => {
  if (data?.termData?.[subject]?.SA2?.marks !== 0) {
    return count + 1;
  }

  return count; 

}, 0);

// Calculate the total marks for valid subjects
const sa2Total = subjectKeyssa2.reduce((total, subject) => {
  return total + (data?.termData?.[subject]?.SA2?.marks !== 0 ? data?.termData?.[subject]?.SA2?.marks : 0);
}, 0);

// Calculate the adjusted total based on the number of valid subjects
const adjustedTotalsa2 = validSubjectsCountsa2 * 50; // Assuming each subject contributes 25 marks


// Calculate the percentage based on the adjusted total
const persa2 = ((sa2Total / adjustedTotalsa2) * 100).toFixed(2);

const calculateGradesa2 = (sa2Total, adjustedTotalsa2) => {
  const percentagesa2 = (sa2Total / adjustedTotalsa2) * 100;

  if (percentagesa2 >= 90) {
    return "A+";
  } else if (percentagesa2 >= 80) {
    return "A";
  } else if (percentagesa2 >= 70) {
    return "B+";
  } else if (percentagesa2 >= 60) {
    return "B";
  } else if (percentagesa2 >= 50) {
    return "C+";
  } else if (percentagesa2 >= 40) {
    return "C";
  } else if (percentagesa2 >= 30) {
    return "D+";
  } else if (percentagesa2 >= 20) {
    return "D";
  } else {
    return "E";
  }
};

  const gradesa2 = calculateGradesa2(sa2Total, adjustedTotalsa2);



  function calculateGradeterm(total) {
    if (total >= 91 && total <= 100) {
      return 'A+';
    } else if (total >= 81 && total <= 90) {
      return 'A';
    } else if (total >= 71 && total <= 80) {
      return 'B+';
    } else if (total >= 61 && total <= 70) {
      return 'B';
    } else if (total >= 51 && total <= 60) {
      return 'C+';
    } else if (total >= 41 && total <= 50) {
      return 'C';
    } else if (total >= 32 && total <= 40) {
      return 'D+';
    } else if (total >= 20 && total <= 31) {
      return 'D';
    } else if (total >= 0 && total <= 19) {
      return 'E';
    } else {
      return 'Invalid';
    }
  }

//term color
  const getGradeColorterm = (english1Grade) => {
    switch (english1Grade) {
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

  const getScoreColorterm = (english1TermTotal, english1Grade) => {
    // Use the same color as the grade
    return getGradeColorterm(english1Grade);
  };
  

// Calculate grades for each subject
const english1TermTotal = data?.termData?.["English 1"]?.FA3?.marks + data?.termData?.["English 1"]?.FA4?.marks + data?.termData?.["English 1"]?.SA2?.marks;
const english1Grade = calculateGradeterm(english1TermTotal);

const english2TermTotal = data?.termData?.["English 2"]?.FA3?.marks + data?.termData?.["English 2"]?.FA4?.marks + data?.termData?.["English 2"]?.SA2?.marks;
const english2Grade = calculateGradeterm(english2TermTotal);

const englishReadingTermTotal = data?.termData?.["English Reading"]?.FA3?.marks + data?.termData?.["English Reading"]?.FA4?.marks + data?.termData?.["English Reading"]?.SA2?.marks;
const englishReadingGrade = calculateGradeterm(englishReadingTermTotal);

const englishDictatTermTotal = data?.termData?.["English Dictation"]?.FA3?.marks + data?.termData?.["English Dictation"]?.FA4?.marks + data?.termData?.["English Dictation"]?.SA2?.marks;
const englishDictatGrade = calculateGradeterm(englishDictatTermTotal);

const kannadaTermTotal = data?.termData?.["Kannada"]?.FA3?.marks + data?.termData?.["Kannada"]?.FA4?.marks + data?.termData?.["Kannada"]?.SA2?.marks;
const kannadaGrade = calculateGradeterm(kannadaTermTotal);

const kannadaReadTermTotal = data?.termData?.["Kannada Reading"]?.FA3?.marks + data?.termData?.["Kannada Reading"]?.FA4?.marks + data?.termData?.["Kannada Reading"]?.SA2?.marks;
const kannadaReadGrade = calculateGradeterm(kannadaReadTermTotal);

const kannadaDicatateTermTotal = data?.termData?.["Kannada Dictation"]?.FA3?.marks + data?.termData?.["Kannada Dictation"]?.FA4?.marks + data?.termData?.["Kannada Dictation"]?.SA2?.marks;
const kannadaDictatGrade = calculateGradeterm(kannadaDicatateTermTotal);

const hindiTermTotal = data?.termData?.["Hindi"]?.FA3?.marks + data?.termData?.["Hindi"]?.FA4?.marks + data?.termData?.["Hindi"]?.SA2?.marks;
const hindiGrade = calculateGradeterm(hindiTermTotal);

const hindiReadTermTotal = data?.termData?.["Hindi Reading"]?.FA3?.marks + data?.termData?.["Hindi Reading"]?.FA4?.marks + data?.termData?.["Hindi Reading"]?.SA2?.marks;
const hindiReadGrade = calculateGradeterm(hindiReadTermTotal);

const hindiDictTermTotal = data?.termData?.["Hindi Dictation"]?.FA3?.marks + data?.termData?.["Hindi Dictation"]?.FA4?.marks + data?.termData?.["Hindi Dictation"]?.SA2?.marks;
const hindiDictGrade = calculateGradeterm(hindiDictTermTotal);

const mathTermTotal = data?.termData?.["Mathematics"]?.FA3?.marks + data?.termData?.["Mathematics"]?.FA4?.marks + data?.termData?.["Mathematics"]?.SA2?.marks;
const mathGrade = calculateGradeterm(mathTermTotal);

const evsTermTotal = data?.termData?.["E V S / General Science"]?.FA3?.marks + data?.termData?.["E V S / General Science"]?.FA4?.marks + data?.termData?.["E V S / General Science"]?.SA2?.marks;
const evsGrade = calculateGradeterm(evsTermTotal);

const socialTermTotal = data?.termData?.["Social Science"]?.FA3?.marks + data?.termData?.["Social Science"]?.FA4?.marks + data?.termData?.["Social Science"]?.SA2?.marks;
const socialGrade = calculateGradeterm(socialTermTotal);



  const term1Total =
   english1TermTotal  +
    english2TermTotal +
    englishReadingTermTotal+
   englishDictatTermTotal +
    kannadaTermTotal +
   kannadaReadTermTotal+
  kannadaDicatateTermTotal +
   hindiTermTotal +
    hindiReadTermTotal +
    hindiDictTermTotal +
    mathTermTotal +
    evsTermTotal +
   socialTermTotal

  const perterm1 = ((term1Total / 1300) * 100).toFixed(2);

  const calculateGradeterm1 = (term1Total) => {
    if (term1Total >= 1170) {
      return "A+";
    } else if (term1Total >= 1040) {
      return "A";
    } else if (term1Total >= 910) {
      return "B+";
    } else if (term1Total >= 780) {
      return "B";
    } else if (term1Total >= 650) {
      return "C+";
    } else if (term1Total >= 520) {
      return "C";
    } else if (term1Total >= 390) {
      return "D+";
    } else if (term1Total >= 260) {
      return "D";
    } else {
      return "E";
    }
  };

  const gradeterm1 = calculateGradeterm1(term1Total);


  //GRADE COLOR FOR CO-SCHOLASTIC
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-[#C756A1] text-white font-bold";
      case "B":
        return "bg-[#6C8CC8] text-white font-bold";
      case "C":
        return "bg-[#14A850] text-white font-bold";
      case "D":
        return "bg-[#D6CA6F] text-white font-bold";
      case "E":
        return "bg-[#F5821F] text-white font-bold";
      default:
        return "bg-white text-black font-bold";
    }
  };


//FOR ACADEMIC COLOR
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

  //OVERALL GRADE COLOR
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
            <p className="bg-blue-400 text-white mb-1">
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
                    FA3
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
                    FA4
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
                    SA2
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
                    TERM2
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
                    English 1
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English 1"]?.FA3?.marks,
                        data?.termData?.["English 1"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 1"]?.FA3?.marks === 0 ? "NT" : data?.termData?.["English 1"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English 1"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 1"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English 1"]?.FA4?.marks,
                        data?.termData?.["English 1"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 1"]?.FA4?.marks === 0 ?"NT" : data?.termData?.["English 1"]?.FA4?.marks }
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English 1"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 1"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English 1"]?.SA2?.marks,
                        data?.termData?.["English 1"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 1"]?.SA2?.marks === 0? "NT" : data?.termData?.["English 1"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English 1"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 1"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        english1TermTotal,
                        english1Grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["English 1"]?.TERM1?.marks} */}
                      {english1TermTotal ===0 ? "NT" : english1TermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        english1Grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["English 1"]?.TERM1?.grade} */}
                      {english1Grade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    English 2
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English 2"]?.FA3?.marks,
                        data?.termData?.["English 2"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 2"]?.FA3?.marks === 0 ? "NT" : data?.termData?.["English 2"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English 2"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 2"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English 2"]?.FA4?.marks,
                        data?.termData?.["English 2"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 2"]?.FA4?.marks === 0 ? "NT" : data?.termData?.["English 2"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English 2"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 2"]?.FA4?.grade}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English 2"]?.SA2?.marks,
                        data?.termData?.["English 2"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 2"]?.SA2?.marks ===0 ? "NT" : data?.termData?.["English 2"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English 2"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English 2"]?.SA2?.grade}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        english2TermTotal,english2Grade
                       
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["English 2"]?.TERM1?.marks} */}
                      {english2TermTotal ===0 ? "NT" : english2TermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        english2Grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {english2Grade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    English Reading
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English Reading"]?.FA3?.marks,
                        data?.termData?.["English Reading"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Reading"]?.FA3?.marks ===0 ? "NT": data?.termData?.["English Reading"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English Reading"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Reading"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English Reading"]?.FA4?.marks,
                        data?.termData?.["English Reading"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Reading"]?.FA4?.marks ===0 ? "NT":data?.termData?.["English Reading"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English Reading"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Reading"]?.FA4?.grade}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English Reading"]?.SA2?.marks,
                        data?.termData?.["English Reading"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Reading"]?.SA2?.marks === 0 ?"NT": data?.termData?.["English Reading"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English Reading"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Reading"]?.SA2?.grade}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        englishReadingTermTotal,englishReadingGrade
                  
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["English Reading"]?.TERM1?.marks} */}
                      {englishReadingTermTotal === 0 ? "NT" : englishReadingTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        englishReadingGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {englishReadingGrade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    English Dictation
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English Dictation"]?.FA3?.marks,
                        data?.termData?.["English Dictation"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Dictation"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["English Dictation"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English Dictation"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Dictation"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English Dictation"]?.FA4?.marks,
                        data?.termData?.["English Dictation"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Dictation"]?.FA4?.marks === 0 ? "NT" : data?.termData?.["English Dictation"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English Dictation"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Dictation"]?.FA4?.grade}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["English Dictation"]?.SA2?.marks,
                        data?.termData?.["English Dictation"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Dictation"]?.SA2?.marks === 0 ? "NT" : data?.termData?.["English Dictation"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["English Dictation"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["English Dictation"]?.SA2?.grade}
                    </span>
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        englishDictatTermTotal,
                    englishDictatGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["English Dictation"]?.TERM1?.marks} */}
                      {englishDictatTermTotal ===0 ? "NT" : englishDictatTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        englishDictatGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {englishDictatGrade}
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
                        data?.termData?.["Kannada"]?.FA3?.marks,
                        data?.termData?.["Kannada"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["Kannada"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Kannada"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada"]?.FA3?.grade}
                    </span>
                  </td>





                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Kannada"]?.FA4?.marks,
                        data?.termData?.["Kannada"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada"]?.FA4?.marks === 0 ? "NT" : data?.termData?.["Kannada"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Kannada"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Kannada"]?.SA2?.marks,
                        data?.termData?.["Kannada"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada"]?.SA2?.marks ===0 ? "NT" : data?.termData?.["Kannada"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Kannada"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        kannadaTermTotal,
                       kannadaGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["Kannada"]?.TERM1?.marks} */}
                      {kannadaTermTotal === 0 ? "NT" : kannadaTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        kannadaGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {kannadaGrade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Kannada Reading
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Kannada Reading"]?.FA3?.marks,
                        data?.termData?.["Kannada Reading"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Reading"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["Kannada Reading"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Kannada Reading"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Reading"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Kannada Reading"]?.FA4?.marks,
                        data?.termData?.["Kannada Reading"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Reading"]?.FA4?.marks ===0 ? "NT" : data?.termData?.["Kannada Reading"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Kannada Reading"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Reading"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Kannada Reading"]?.SA2?.marks,
                        data?.termData?.["Kannada Reading"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Reading"]?.SA2?.marks ===0 ? 'NT' : data?.termData?.["Kannada Reading"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Kannada Reading"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Reading"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        kannadaReadTermTotal,kannadaReadGrade
                      
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["Kannada Reading"]?.TERM1?.marks} */}
                      {kannadaReadTermTotal ===0 ? "NT" : kannadaReadTermTotal }

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        kannadaReadGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["Kannada Reading"]?.TERM1?.grade} */}
                      {kannadaReadGrade}
                    </span>
                  </td>

                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Kannada Dictation
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Kannada Dictation"]?.FA3?.marks,
                        data?.termData?.["Kannada Dictation"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Dictation"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["Kannada Dictation"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Kannada Dictation"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Dictation"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Kannada Dictation"]?.FA4?.marks,
                        data?.termData?.["Kannada Dictation"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Dictation"]?.FA4?.marks ===0 ? "NT" : data?.termData?.["Kannada Dictation"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Kannada Dictation"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Dictation"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Kannada Dictation"]?.SA2?.marks,
                        data?.termData?.["Kannada Dictation"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Dictation"]?.SA2?.marks ===0? "NT" : data?.termData?.["Kannada Dictation"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Kannada Dictation"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Kannada Dictation"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        kannadaDicatateTermTotal,
                        kannadaDictatGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["Kannada Dictation"]?.TERM1?.marks} */}
                      {kannadaDicatateTermTotal === 0 ? "NT" : kannadaDicatateTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        kannadaDictatGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {kannadaDictatGrade}
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
                        data?.termData?.["Hindi"]?.FA3?.marks,
                        data?.termData?.["Hindi"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["Hindi"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Hindi"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Hindi"]?.FA4?.marks,
                        data?.termData?.["Hindi"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi"]?.FA4?.marks ===0 ? "NT" : data?.termData?.["Hindi"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Hindi"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Hindi"]?.SA2?.marks,
                        data?.termData?.["Hindi"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi"]?.SA2?.marks ===0 ? "NT" : data?.termData?.["Hindi"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Hindi"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        hindiTermTotal,
                        hindiGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["Hindi"]?.TERM1?.marks} */}
                      {hindiTermTotal ===0 ? "NT" : hindiTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        hindiGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {hindiGrade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Hindi Reading
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Hindi Reading"]?.FA3?.marks,
                        data?.termData?.["Hindi Reading"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Reading"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["Hindi Reading"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Hindi Reading"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Reading"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Hindi Reading"]?.FA4?.marks,
                        data?.termData?.["Hindi Reading"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Reading"]?.FA4?.marks ===0 ? "NT" : data?.termData?.["Hindi Reading"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Hindi Reading"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Reading"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Hindi Reading"]?.SA2?.marks,
                        data?.termData?.["Hindi Reading"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Reading"]?.SA2?.marks ===0 ? "NT" : data?.termData?.["Hindi Reading"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Hindi Reading"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Reading"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        hindiReadTermTotal,
                        hindiReadGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["Hindi Reading"]?.TERM1?.marks} */}
                      {hindiReadTermTotal ===0 ? "NT" : hindiReadTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        hindiReadGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {hindiReadGrade}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Hindi Dictation
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Hindi Dictation"]?.FA3?.marks,
                        data?.termData?.["Hindi Dictation"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Dictation"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["Hindi Dictation"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Hindi Dictation"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Dictation"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Hindi Dictation"]?.FA4?.marks,
                        data?.termData?.["Hindi Dictation"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Dictation"]?.FA4?.marks ===0 ? "NT" : data?.termData?.["Hindi Dictation"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Hindi Dictation"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Dictation"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Hindi Dictation"]?.SA2?.marks,
                        data?.termData?.["Hindi Dictation"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Dictation"]?.SA2?.marks ===0 ? "NT" : data?.termData?.["Hindi Dictation"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Hindi Dictation"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Hindi Dictation"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        hindiDictTermTotal,
                        hindiDictGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["Hindi Dictation"]?.TERM1?.marks} */}
                      {hindiDictTermTotal ===0 ? "NT" : hindiDictTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        hindiDictGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {hindiDictGrade}
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
                        data?.termData?.["Mathematics"]?.FA3?.marks,
                        data?.termData?.["Mathematics"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Mathematics"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["Mathematics"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Mathematics"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Mathematics"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Mathematics"]?.FA4?.marks,
                        data?.termData?.["Mathematics"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Mathematics"]?.FA4?.marks ===0 ? "NT" : data?.termData?.["Mathematics"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Mathematics"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Mathematics"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Mathematics"]?.SA2?.marks,
                        data?.termData?.["Mathematics"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Mathematics"]?.SA2?.marks ===0 ? "NT" : data?.termData?.["Mathematics"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Mathematics"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Mathematics"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        mathTermTotal,
                        mathGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["Mathematics"]?.TERM1?.marks} */}
                      {mathTermTotal ===0 ? "NT" : mathTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        mathGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {mathGrade}
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
                        data?.termData?.["E V S / General Science"]?.FA3?.marks,
                        data?.termData?.["E V S / General Science"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["E V S / General Science"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["E V S / General Science"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["E V S / General Science"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["E V S / General Science"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["E V S / General Science"]?.FA4?.marks,
                        data?.termData?.["E V S / General Science"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["E V S / General Science"]?.FA4?.marks ===0 ? "NT" : data?.termData?.["E V S / General Science"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["E V S / General Science"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["E V S / General Science"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["E V S / General Science"]?.SA2?.marks,
                        data?.termData?.["E V S / General Science"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["E V S / General Science"]?.SA2?.marks ===0 ? "NT" : data?.termData?.["E V S / General Science"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["E V S / General Science"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["E V S / General Science"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        evsTermTotal,
                     evsGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {
                        data?.termData?.["E V S / General Science"]?.TERM1
                          ?.marks
                      } */}
                      {evsTermTotal  ===0 ? "NT" : evsTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        evsGrade
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
                       evsGrade
                      }
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
                        data?.termData?.["Social Science"]?.FA3?.marks,
                        data?.termData?.["Social Science"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Social Science"]?.FA3?.marks ===0 ? "NT" : data?.termData?.["Social Science"]?.FA3?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Social Science"]?.FA3?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Social Science"]?.FA3?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Social Science"]?.FA4?.marks,
                        data?.termData?.["Social Science"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Social Science"]?.FA4?.marks ===0 ? "NT" : data?.termData?.["Social Science"]?.FA4?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Social Science"]?.FA4?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Social Science"]?.FA4?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorsub(
                        data?.termData?.["Social Science"]?.SA2?.marks,
                        data?.termData?.["Social Science"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Social Science"]?.SA2?.marks ===0 ? "NT"  : data?.termData?.["Social Science"]?.SA2?.marks}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsub(
                        data?.termData?.["Social Science"]?.SA2?.grade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {data?.termData?.["Social Science"]?.SA2?.grade}
                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getScoreColorterm(
                        socialTermTotal,
                        socialGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {/* {data?.termData?.["Social Science"]?.TERM1?.marks} */}
                      {socialTermTotal ===0 ? "NT" : socialTermTotal}

                    </span>
                  </td>

                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorterm(
                        socialGrade
                      )}`}
                      style={{
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {socialGrade}
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
                  <th className="border-2 border-gray-600  ">FA3</th>
                  <th className="border-2 border-gray-600  ">FA4</th>
                  <th className="border-2 border-gray-600  ">SA2</th>
                  <th className="border-2 border-gray-600  ">TERM2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 border-gray-600 font-semibold">
                    Score
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {fa1Total}
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {fa4Total}
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {sa2Total}
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {term1Total}
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
                        gradefa4
                      )}`}
                      style={{
                        left: "20%", // Adjust the left value to control the width
                        right: "20%", // Adjust the right value to control the width
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {gradefa4}
                    </span>
                  </td>
                  <td className="relative border-2 border-gray-600">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColorsuboverall(
                        gradesa2
                      )}`}
                      style={{
                        left: "20%", // Adjust the left value to control the width
                        right: "20%", // Adjust the right value to control the width
                      }}
                    ></div>
                    <span className="relative z-10 font-bold text-white">
                      {gradesa2}
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
                    {perfa4}%
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {persa2}%
                  </td>
                  <td className="border-2 border-gray-600 text-center ">
                    {perterm1}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-10 mx-20">
          <h1 className="text-sky-500 text-md font-semibold">Remarks</h1>
          <p className="text-sm">{data?.cotermdata?.remarks}</p>
        </div>
        <div className="mt-16    ">
          <span className="text-sm  mx-20 text-sky-500">
            Nandini Layout, Bangalore - 96. Email : sps_nlo@yahoo.com{" "}
          </span>
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
            <p className="bg-blue-400 text-white mb-1">
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
                        {data?.cotermdata?.reading?.vocabulary?.grade}
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
                        {data?.cotermdata?.reading?.what_to_read?.grade}
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
                        {data?.cotermdata?.reading?.reads_fluently?.grade}
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
                        {data?.cotermdata?.reading?.phonic_skills?.grade}
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
                        {
                          data?.cotermdata?.work_skills?.listens_attentively
                            ?.grade
                        }
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
                        {
                          data?.cotermdata?.work_skills?.follows_directions
                            ?.grade
                        }
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
                        {
                          data?.cotermdata?.work_skills?.Work_well_independently
                            ?.grade
                        }
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
                        {
                          data?.cotermdata?.work_skills?.assignments_on_time
                            ?.grade
                        }
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
                        {data?.cotermdata?.work_skills?.does_work_neatly?.grade}
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
                        {data?.cotermdata?.specials?.computer?.grade}
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
                        {data?.cotermdata?.specials?.moral_science?.grade}
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
                        {data?.cotermdata?.specials?.physical_education?.grade}
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
                        {data?.cotermdata?.specials?.general_knowledge?.grade}
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
                        {data?.cotermdata?.specials?.drawing?.grade}
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
                        {data?.cotermdata?.project_activity?.English?.grade}
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
                        {data?.cotermdata?.project_activity?.Math?.grade}
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
                        {data?.cotermdata?.project_activity?.E_V_S?.grade}
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
                        {
                          data?.cotermdata?.project_activity
                            ?.events_and_celebrations?.grade
                        }
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

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
                        {data?.cotermdata?.spelling?.words_correctly?.grade}
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
                        {data?.cotermdata?.spelling?.spelling_skills?.grade}
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
                        {data?.cotermdata?.social_skills?.school_rules?.grade}
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
                        {data?.cotermdata?.social_skills?.self_control?.grade}
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
                        {
                          data?.cotermdata?.social_skills
                            ?.respect_to_self_others?.grade
                        }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Written Expression (Co-curricular Activities)
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
                        {
                          data?.cotermdata?.written_expression
                            ?.letters_correctly?.grade
                        }
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
                        {
                          data?.cotermdata?.written_expression
                            ?.punctuation_correctly?.grade
                        }
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
                        {
                          data?.cotermdata?.written_expression
                            ?.complete_sentences?.grade
                        }
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Abacus (Co-curricular Activities)
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Abacus?.abacus_total
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
                          data?.cotermdata?.Abacus?.abacus_total
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
                          data?.cotermdata?.Abacus?.Clear_with_the_concept
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
                          data?.cotermdata?.Abacus?.Clear_with_the_concept
                            ?.grade
                        }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Able to add & subtract with the beads
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Abacus?.able_to_add_subtract?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.Abacus?.able_to_add_subtract?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">
                      Able to visualise
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.Abacus?.able_to_visualise?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.Abacus?.able_to_visualise?.grade}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className=" mt-10 ml-10">
                <h1 className="text-sky-500 text-md font-semibold">
                  Attendance & Health Status
                </h1>
                <h1 className=" text-md font-semibold">
                  Attd:&nbsp;{data?.cotermdata?.attendence}
                </h1>
                <h1 className=" text-md font-semibold">
                  Height:&nbsp;{data?.student?.joining_details?.height}"
                </h1>
                <h1 className=" text-md font-semibold">
                  Weight:&nbsp;{data?.student?.joining_details?.weight}Kg
                </h1>
                <h1 className=" text-md font-semibold">
                  BMI:&nbsp;{data?.student?.joining_details?.BMI}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 mt-6">
          <div className="flex justify-evenly  mt-20 gap-10 ">
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
        <div className="mt-10">
          <span className="text-sm mx-16 text-sky-500">
            Nandini Layout, Bangalore - 96. Email : sps_nlo@yahoo.com{" "}
          </span>
          <div>
            <img src={Footer} alt="Report Image" />
          </div>
        </div>
      </div>

    </div>
  );
};

const Report1to4 = ({ data, termData }) => {
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

export default Report1to4;
