import React, { useRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import Imagemain from "../../Images/mainfront.png";
import Imagesub from "../../Images/logosub.png";
import Footer from "../../Images/Sans Footer3-02.png";
import dayjs from "dayjs";
import Marksbar from "../../Images/newbarprep.png";
import "./index.css";
import { FaCheck } from "react-icons/fa";

const PrintComponent = ({ data, termData }) => {
  console.log(data);
  const [studentImage, setStudentImage] = useState(null);

  useEffect(() => {
    const studentImageUrl = data?.student?.personal_details?.student_image;
    setStudentImage(studentImageUrl);
  }, [data]);

  console.log(data)

const isPrep = data?.student?.joining_details?.class?.class_name ==="Prep" || data?.student?.joining_details?.class?.class_name === 'Junior KG'
console.log("first",isPrep)
 
 

 let subjectMarks;

  if (!isPrep) 
  {
    subjectMarks = [
    data?.cotermdata?.written_skills?.hindi?.marks,
    data?.cotermdata?.abacus?.add_subtract?.marks,
    data?.cotermdata?.abacus?.able_to_visualise?.marks,
    data?.cotermdata?.abacus?.clear_with_the_concept?.marks,
    data?.cotermdata?.conversation?.sentences?.marks,
    data?.cotermdata?.conversation?.confidence?.marks,
    data?.cotermdata?.english?.listening?.marks,
    data?.cotermdata?.english?.story_telling?.marks,
    data?.cotermdata?.english?.narrating?.marks,
    data?.cotermdata?.handwriting?.guidlines?.marks,
    data?.cotermdata?.handwriting?.writes_clearly?.marks,data?.cotermdata?.math_number_concepts?.sizes_shape?.marks,
    data?.cotermdata?.math_number_concepts?.understands_number?.marks,
    data?.cotermdata?.math_number_concepts?.identify_numbers?.marks,
    data?.cotermdata?.math_number_concepts?.write_numbers?.marks,
    data?.cotermdata?.personality_characteristics?.etiquette?.marks,
    data?.cotermdata?.personality_characteristics?.Interaction?.marks,
    data?.cotermdata?.personality_characteristics?.participation?.marks,
    data?.cotermdata?.personality_characteristics?.leadership?.marks,
    data?.cotermdata?.personality_characteristics?.confidence?.marks,
    data?.cotermdata?.personality_characteristics?.personal_hygiene?.marks,
    data?.cotermdata?.What_else?.art_craft?.marks,
    data?.cotermdata?.What_else?.coloring?.marks,
    data?.cotermdata?.What_else?.clay_modelling?.marks,
    data?.cotermdata?.english_worksheets?.Traces_patterns?.marks,
    data?.cotermdata?.english_worksheets?.upper_case_letters?.marks,
    data?.cotermdata?.english_worksheets?.lower_case_letters?.marks,
    data?.cotermdata?.english_worksheets?.writes_clearly?.marks,
    data?.cotermdata?.general_knowledge?.facts_with_interest?.marks,
    data?.cotermdata?.general_knowledge?.awareness?.marks,
    data?.cotermdata?.general_knowledge?.enquiring_mind?.marks,
    data?.cotermdata?.general_knowledge?.answering_questions?.marks,
    data?.cotermdata?.motor_development?.color_within_shapes?.marks,
    data?.cotermdata?.motor_development?.free_hand_pictures?.marks,
    data?.cotermdata?.motor_development?.handwriting?.marks,
    data?.cotermdata?.motor_development?.hand_work?.marks,
    data?.cotermdata?.motor_development?.games?.marks,
    data?.cotermdata?.recitation?.expression_and_confidence?.marks,
    data?.cotermdata?.recitation?.poem_rhymes?.marks,
    data?.cotermdata?.social_emotional_development?.coming_to_school?.marks,
    data?.cotermdata?.social_emotional_development?.children?.marks,
    data?.cotermdata?.social_emotional_development?.shares_with_others?.marks,
    data?.cotermdata?.social_emotional_development?.other_speak?.marks,
    data?.cotermdata?.social_emotional_development?.accepts_responsibilities?.marks,
    data?.cotermdata?.work_habits?.neat_tidy?.marks,
    data?.cotermdata?.work_habits?.home_work?.marks,
    data?.cotermdata?.work_habits?.school_on_time?.marks,
    data?.cotermdata?.work_habits?.independently?.marks,
    data?.cotermdata?.work_habits?.book_materials?.marks,
    data?.cotermdata?.work_habits?.work_in_the_given_time?.marks,
    data?.cotermdata?.work_habits?.neatness?.marks,
    data?.cotermdata?.worksheets?.english?.marks,
    data?.cotermdata?.worksheets?.math?.marks,
    data?.cotermdata?.worksheets?.shapes_color?.marks,
    data?.cotermdata?.written_skills?.literacy?.marks,
    data?.cotermdata?.written_skills?.numeracy?.marks,
    data?.cotermdata?.written_skills?.E_V_S?.marks,
    data?.cotermdata?.written_skills?.kit_activity?.marks, 
    ]
  

    console.log(subjectMarks)
  }
  else{
 
  subjectMarks = [
    data?.cotermdata?.conversation?.sentences?.marks,
    data?.cotermdata?.conversation?.confidence?.marks,
    data?.cotermdata?.english?.listening?.marks,
    data?.cotermdata?.english?.story_telling?.marks,
    data?.cotermdata?.english?.narrating?.marks,
    data?.cotermdata?.handwriting?.guidlines?.marks,
    data?.cotermdata?.handwriting?.writes_clearly?.marks,data?.cotermdata?.math_number_concepts?.sizes_shape?.marks,
    data?.cotermdata?.math_number_concepts?.understands_number?.marks,
    data?.cotermdata?.math_number_concepts?.identify_numbers?.marks,
    data?.cotermdata?.math_number_concepts?.write_numbers?.marks,
    data?.cotermdata?.personality_characteristics?.etiquette?.marks,
    data?.cotermdata?.personality_characteristics?.Interaction?.marks,
    data?.cotermdata?.personality_characteristics?.participation?.marks,
    data?.cotermdata?.personality_characteristics?.leadership?.marks,
    data?.cotermdata?.personality_characteristics?.confidence?.marks,
    data?.cotermdata?.personality_characteristics?.personal_hygiene?.marks,
    data?.cotermdata?.What_else?.art_craft?.marks,
    data?.cotermdata?.What_else?.coloring?.marks,
    data?.cotermdata?.What_else?.clay_modelling?.marks,
    data?.cotermdata?.english_worksheets?.Traces_patterns?.marks,
    data?.cotermdata?.english_worksheets?.upper_case_letters?.marks,
    data?.cotermdata?.english_worksheets?.lower_case_letters?.marks,
    data?.cotermdata?.english_worksheets?.writes_clearly?.marks,
    data?.cotermdata?.general_knowledge?.facts_with_interest?.marks,
    data?.cotermdata?.general_knowledge?.awareness?.marks,
    data?.cotermdata?.general_knowledge?.enquiring_mind?.marks,
    data?.cotermdata?.general_knowledge?.answering_questions?.marks,
    data?.cotermdata?.motor_development?.color_within_shapes?.marks,
    data?.cotermdata?.motor_development?.free_hand_pictures?.marks,
    data?.cotermdata?.motor_development?.handwriting?.marks,
    data?.cotermdata?.motor_development?.hand_work?.marks,
    data?.cotermdata?.motor_development?.games?.marks,
    data?.cotermdata?.recitation?.expression_and_confidence?.marks,
    data?.cotermdata?.recitation?.poem_rhymes?.marks,
    data?.cotermdata?.social_emotional_development?.coming_to_school?.marks,
    data?.cotermdata?.social_emotional_development?.children?.marks,
    data?.cotermdata?.social_emotional_development?.shares_with_others?.marks,
    data?.cotermdata?.social_emotional_development?.other_speak?.marks,
    data?.cotermdata?.social_emotional_development?.accepts_responsibilities?.marks,
    data?.cotermdata?.work_habits?.neat_tidy?.marks,
    data?.cotermdata?.work_habits?.home_work?.marks,
    data?.cotermdata?.work_habits?.school_on_time?.marks,
    data?.cotermdata?.work_habits?.independently?.marks,
    data?.cotermdata?.work_habits?.book_materials?.marks,
    data?.cotermdata?.work_habits?.work_in_the_given_time?.marks,
    data?.cotermdata?.work_habits?.neatness?.marks,
    data?.cotermdata?.worksheets?.english?.marks,
    data?.cotermdata?.worksheets?.math?.marks,
    data?.cotermdata?.worksheets?.shapes_color?.marks,
    data?.cotermdata?.written_skills?.literacy?.marks,
    data?.cotermdata?.written_skills?.numeracy?.marks,
    data?.cotermdata?.written_skills?.E_V_S?.marks,
    data?.cotermdata?.written_skills?.kit_activity?.marks, 
  ];
 
  console.log(subjectMarks)
}
  
  // Counting the number of subjects excluding "NT" marks and including "AB" marks
  const subjectCount = subjectMarks.reduce((count, marks) => {
    if (marks !== "NT" && marks !== 11) {
      // If marks are numeric or "AB", increment the count
      count++;
    }
    return count;
  }, 0);
  
  // Calculating the total marks considering only numeric marks and "AB" marks
  const cocolastictotal = subjectMarks.reduce((total, marks) => {
    if (marks !== "NT" && marks !== 11) {
      // If marks are numeric or "AB", add them to the total
      total += marks === "AB" ? 10 : parseInt(marks);
    }
    return total;
  }, 0);
  
  // Calculating percentage
  const perCocal = ((cocolastictotal / (subjectCount * 10)) * 100).toFixed(2);
  
  const cocolasticgrade = (cocolastictotal) => {
    if (!isPrep) {
      if (cocolastictotal >= 522) {
        return "A+";
      } else if (cocolastictotal >= 464) {
        return "A";
      } else if (cocolastictotal >= 406) {
        return "B+";
      } else if (cocolastictotal >= 348) {
        return "B";
      } else if (cocolastictotal >= 290) {
        return "C+";
      } else if (cocolastictotal >= 232) {
        return "C";
      } else if (cocolastictotal >= 174) {
        return "D+";
      } else if (cocolastictotal >= 116) {
        return "D";
      } else {
        return "E";
      }
    } else {
      if (cocolastictotal >= 486) {
        return "A+";
      } else if (cocolastictotal >= 432) {
        return "A";
      } else if (cocolastictotal >= 378) {
        return "B+";
      } else if (cocolastictotal >= 324) {
        return "B";
      } else if (cocolastictotal >= 270) {
        return "C+";
      } else if (cocolastictotal >= 216) {
        return "C";
      } else if (cocolastictotal >= 162) {
        return "D+";
      } else if (cocolastictotal >= 108) {
        return "D";
      } else {
        return "E";
      }
    }
  
  };
  
  const gradetotal = cocolasticgrade(cocolastictotal);
  

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-[#C756A1] text-white font-bold ";
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
        case "AB":
          return "bg-[#6E2312] text-white font-bold";
      default:
        return "bg-white text-black font-bold";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 9.1 && score <= 10) {
      return "bg-[#C756A1] text-white font-bold";
    } else if (score >= 8.1 && score <= 9.0) {
      return "bg-[#6C8CC8] text-white font-bold";
    } else if (score >= 7.1 && score <= 8.0) {
      return "bg-[#00A651] text-white font-bold";
    } else if (score >= 6.1 && score <= 7.0) {
      return "bg-[#00AEEF] text-white font-bold";
    } else if (score >= 5.1 && score <= 6.0) {
      return "bg-[#A6CE39] text-white font-bold";
    } else if (score >= 4.1 && score <= 5.0) {
      return "bg-[#D7CB70] text-white font-bold";
    } else if (score >= 3.5 && score <= 4.0) {
      return "bg-[#F5821F] text-white font-bold";
    } else if (score >= 2.0 && score <= 3.4) {
      return "bg-[#C62026] text-white font-bold";
    } else if (score >= 0 && score <= 1.9) {
      return "bg-[#6E2312] text-white font-bold";
    } 
    else if (score == 11 || score == 12) {
      return "bg-[#6E2312] text-white font-bold";
    }else {
      return "  font-bold";
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

      <div className="page-break need mt-2">
        <div className=" border-2 border-black  ">
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

            <div className="flex gap-2">
              <div>
                <table className="border-2 border-gray-600">
                  <thead>
                    <tr className="border-2 border-gray-600 text-end text-sm">
                      {termData?.term}
                    </tr>
                    <tr className="border-2 border-gray-600 text-sm bg-gray-200">
                      <th className="border-2 border-gray-600 w-96 text-start">
                        Subject
                      </th>
                      <th className="border-2 border-gray-600 w-16 text-center">
                        Score
                      </th>
                      <th className="border-2 border-gray-600 w-16 text-center">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        Conversation
                      </td>
                      <td className="border-2 border-gray-600  text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.conversation?.conversation_total
                          //     ?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {
                            data?.cotermdata?.conversation?.conversation_total
                              ?.marks
                          }
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.conversation?.conversation_total
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
                            data?.cotermdata?.conversation?.conversation_total
                              ?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Speaks in correct complete sentences
                      </td>
                      <td className="border-2 border-gray-600  text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.conversation?.sentences?.marks 
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {(data?.cotermdata?.conversation?.sentences?.marks == 12) ? "AB" : (data?.cotermdata?.conversation?.sentences?.marks == 11) ? "NT" : (data?.cotermdata?.conversation?.sentences?.marks)}
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.conversation?.sentences?.grade 
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          { data?.cotermdata?.conversation?.sentences?.grade }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Expresses with confidence
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.conversation?.confidence?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        {(data?.cotermdata?.conversation?.confidence?.marks == 12) ? "AB" : (data?.cotermdata?.conversation?.confidence?.marks == 11) ? "NT" : (data?.cotermdata?.conversation?.confidence?.marks)}
                        </span>
                      </td>
                      <td
                        className={`border-2 border-gray-600 text-center relative`}
                      >
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.conversation?.confidence?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.conversation?.confidence?.grade}
                        </span>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold ">
                        English (Comprehension)
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        {/* Similar styling logic for background color */}
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.english?.english_total?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {data?.cotermdata?.english?.english_total?.marks}
                        </span>
                      </td>
                      <td
                        className={`border-2 border-gray-600 text-center relative`}
                      >
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.english?.english_total?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.english?.english_total?.grade}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Enjoys listening
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        {/* Similar styling logic for background color */}
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.english?.listening?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">                 
                          {(data?.cotermdata?.english?.listening?.marks == 12) ? "AB" : (data?.cotermdata?.english?.listening?.marks == 11) ? "NT" : (data?.cotermdata?.english?.listening?.marks)}
                        </span>
                      </td>
                      <td
                        className={`border-2 border-gray-600 text-center relative`}
                      >
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.english?.listening?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.english?.listening?.grade}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="border-2 border-gray-600 ">
                        language development - story telling
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        {/* Similar styling logic for background color */}
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.english?.story_telling?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        {(data?.cotermdata?.english?.story_telling?.marks == 12) ? "AB" : (data?.cotermdata?.english?.story_telling?.marks == 11) ? "NT" : (data?.cotermdata?.english?.story_telling?.marks)}                         
                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.english?.story_telling?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.english?.story_telling?.grade}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Enjoys narrating
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        {/* Similar styling logic for background color */}
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.english?.narrating?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        {(data?.cotermdata?.english?.narrating?.marks == 12) ? "AB" : (data?.cotermdata?.english?.narrating?.marks == 11) ? "NT" : (data?.cotermdata?.english?.narrating?.marks)}   
                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.english?.narrating?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.english?.narrating?.grade}
                        </span>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        Handwriting
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.handwriting?.handwriting_total
                          //     ?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {
                            data?.cotermdata?.handwriting?.handwriting_total
                              ?.marks
                          }
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.handwriting?.handwriting_total
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
                            data?.cotermdata?.handwriting?.handwriting_total
                              ?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Understands classroom guidlines
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.handwriting?.guidlines?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                       
                        {(data?.cotermdata?.handwriting?.guidlines?.marks == 12) ? "AB" : (data?.cotermdata?.handwriting?.guidlines?.marks == 11) ? "NT" : (data?.cotermdata?.handwriting?.guidlines?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.handwriting?.guidlines?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.handwriting?.guidlines?.grade}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Follows simple instructions & writes clearly
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.handwriting?.writes_clearly?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        {(data?.cotermdata?.handwriting?.writes_clearly?.marks == 12) ? "AB" : (data?.cotermdata?.handwriting?.writes_clearly?.marks == 11) ? "NT" : (data?.cotermdata?.handwriting?.writes_clearly?.marks)}   
                       
                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.handwriting?.writes_clearly?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.handwriting?.writes_clearly?.grade}
                        </span>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        Math & number concepts
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.math_number_concepts
                          //     ?.math_number_concepts_total?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {
                            data?.cotermdata?.math_number_concepts
                              ?.math_number_concepts_total?.marks
                          }
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.math_number_concepts
                              ?.math_number_concepts_total?.grade
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
                            data?.cotermdata?.math_number_concepts
                              ?.math_number_concepts_total?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Ability to compare sizes & shape
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.math_number_concepts?.sizes_shape
                              ?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.math_number_concepts?.sizes_shape?.marks == 12) ? "AB" : (data?.cotermdata?.math_number_concepts?.sizes_shape?.marks == 11) ? "NT" : (data?.cotermdata?.math_number_concepts?.sizes_shape?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.math_number_concepts?.sizes_shape
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
                            data?.cotermdata?.math_number_concepts?.sizes_shape
                              ?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Understands number value
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.math_number_concepts
                              ?.understands_number?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        {(data?.cotermdata?.math_number_concepts?.understands_number?.marks == 12) ? "AB" : (data?.cotermdata?.math_number_concepts?.understands_number?.marks == 11) ? "NT" : (data?.cotermdata?.math_number_concepts?.understands_number?.marks)}   
                         
                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.math_number_concepts
                              ?.understands_number?.grade
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
                            data?.cotermdata?.math_number_concepts
                              ?.understands_number?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Ability to write after numbers & before Numbers
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.math_number_concepts
                              ?.identify_numbers
?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        {(data?.cotermdata?.math_number_concepts?.identify_numbers?.marks == 12) ? "AB" : (data?.cotermdata?.math_number_concepts?.identify_numbers?.marks == 11) ? "NT" : (data?.cotermdata?.math_number_concepts?.identify_numbers?.marks)}   
                         
                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.math_number_concepts
                              ?.identify_numbers
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
                            data?.cotermdata?.math_number_concepts
                              ?.identify_numbers
?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                      Ability to write numbers
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.math_number_concepts
                              ?.write_numbers?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        {(data?.cotermdata?.math_number_concepts?.write_numbers?.marks == 12) ? "AB" : (data?.cotermdata?.math_number_concepts?.write_numbers?.marks == 11) ? "NT" : (data?.cotermdata?.math_number_concepts?.write_numbers?.marks)}   
                        
                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.math_number_concepts
                              ?.write_numbers?.grade
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
                            data?.cotermdata?.math_number_concepts
                              ?.write_numbers?.grade
                          }
                        </span>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        Personality characteristics
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.personality_characteristics
                          //     ?.personality_characteristics_total?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {
                            data?.cotermdata?.personality_characteristics
                              ?.personality_characteristics_total?.marks
                          }
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.personality_characteristics
                              ?.personality_characteristics_total?.grade
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
                            data?.cotermdata?.personality_characteristics
                              ?.personality_characteristics_total?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Etiquette (polite behaviour)
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.personality_characteristics
                              ?.etiquette?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                     
                        {(data?.cotermdata?.personality_characteristics?.etiquette?.marks == 12) ? "AB" : (data?.cotermdata?.personality_characteristics?.etiquette?.marks == 11) ? "NT" : (data?.cotermdata?.personality_characteristics?.etiquette?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.personality_characteristics
                              ?.etiquette?.grade
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
                            data?.cotermdata?.personality_characteristics
                              ?.etiquette?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Interaction with others
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.personality_characteristics
                              ?.Interaction?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                         
                        {(data?.cotermdata?.personality_characteristics?.Interaction?.marks == 12) ? "AB" : (data?.cotermdata?.personality_characteristics?.Interaction?.marks == 11) ? "NT" : (data?.cotermdata?.personality_characteristics?.Interaction?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.personality_characteristics
                              ?.Interaction?.grade
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
                            data?.cotermdata?.personality_characteristics
                              ?.Interaction?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Participation
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.personality_characteristics
                              ?.participation?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                         
                        {(data?.cotermdata?.personality_characteristics?.participation?.marks == 12) ? "AB" : (data?.cotermdata?.personality_characteristics?.participation?.marks == 11) ? "NT" : (data?.cotermdata?.personality_characteristics?.participation?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.personality_characteristics
                              ?.participation?.grade
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
                            data?.cotermdata?.personality_characteristics
                              ?.participation?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">Leadership</td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.personality_characteristics
                              ?.leadership?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                         
                        {(data?.cotermdata?.personality_characteristics?.leadership?.marks == 12) ? "AB" : (data?.cotermdata?.personality_characteristics?.leadership?.marks == 11) ? "NT" : (data?.cotermdata?.personality_characteristics?.leadership?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.personality_characteristics
                              ?.leadership?.grade
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
                            data?.cotermdata?.personality_characteristics
                              ?.leadership?.grade
                          }
                        </span>
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border-2 border-gray-600 ">Confidence</td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.personality_characteristics
                              ?.confidence?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                       
                        {(data?.cotermdata?.personality_characteristics?.confidence?.marks == 12) ? "AB" : (data?.cotermdata?.personality_characteristics?.confidence?.marks == 11) ? "NT" : (data?.cotermdata?.personality_characteristics?.confidence?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.personality_characteristics
                              ?.confidence?.grade
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
                            data?.cotermdata?.personality_characteristics
                              ?.confidence?.grade
                          }
                        </span>
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Personal hygiene
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.personality_characteristics
                              ?.personal_hygiene?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.personality_characteristics?.personal_hygiene?.marks == 12) ? "AB" : (data?.cotermdata?.personality_characteristics?.personal_hygiene?.marks == 11) ? "NT" : (data?.cotermdata?.personality_characteristics?.personal_hygiene?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.personality_characteristics
                              ?.personal_hygiene?.grade
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
                            data?.cotermdata?.personality_characteristics
                              ?.personal_hygiene?.grade
                          }
                        </span>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        What else am I trained for
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.What_else?.What_else_total?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {data?.cotermdata?.What_else?.What_else_total?.marks}
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.What_else?.What_else_total?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.What_else?.What_else_total?.grade}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">Art & craft</td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.What_else?.art_craft?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.What_else?.art_craft?.marks == 12) ? "AB" : (data?.cotermdata?.What_else?.art_craft?.marks == 11) ? "NT" : (data?.cotermdata?.What_else?.art_craft?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.What_else?.art_craft?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.What_else?.art_craft?.grade}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Drawing/coloring
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.What_else?.coloring?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                       
                        {(data?.cotermdata?.What_else?.coloring?.marks == 12) ? "AB" : (data?.cotermdata?.What_else?.coloring?.marks == 11) ? "NT" : (data?.cotermdata?.What_else?.coloring?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.What_else?.coloring?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.What_else?.coloring?.grade}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Clay modelling
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.What_else?.clay_modelling?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.What_else?.clay_modelling?.marks == 12) ? "AB" : (data?.cotermdata?.What_else?.clay_modelling?.marks == 11) ? "NT" : (data?.cotermdata?.What_else?.clay_modelling?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.What_else?.clay_modelling?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.What_else?.clay_modelling?.grade}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table className="border-2 border-gray-600">
                  <thead>
                    <tr className="border-2 border-gray-600 text-end text-sm">
                      {termData?.term}
                    </tr>
                    <tr className="border-2 border-gray-600 text-sm bg-gray-200">
                      <th className="border-2 border-gray-600 w-96 text-start">
                        Subject
                      </th>
                      <th className="border-2 border-gray-600 w-16 text-center">
                        Score
                      </th>
                      <th className="border-2 border-gray-600 w-16 text-center">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        English (worksheets)
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.english_worksheets
                          //     ?.english_worksheets_total?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {
                            data?.cotermdata?.english_worksheets
                              ?.english_worksheets_total?.marks
                          }
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.english_worksheets
                              ?.english_worksheets_total?.grade
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
                            data?.cotermdata?.english_worksheets
                              ?.english_worksheets_total?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Traces patterns
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.english_worksheets
                              ?.Traces_patterns?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.english_worksheets?.Traces_patterns?.marks == 12) ? "AB" : (data?.cotermdata?.english_worksheets?.Traces_patterns?.marks == 11) ? "NT" : (data?.cotermdata?.english_worksheets?.Traces_patterns?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.english_worksheets
                              ?.Traces_patterns?.grade
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
                            data?.cotermdata?.english_worksheets
                              ?.Traces_patterns?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Writes upper case letters
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.english_worksheets
                              ?.upper_case_letters?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.english_worksheets?.upper_case_letters?.marks == 12) ? "AB" : (data?.cotermdata?.english_worksheets?.upper_case_letters?.marks == 11) ? "NT" : (data?.cotermdata?.english_worksheets?.upper_case_letters?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.english_worksheets
                              ?.upper_case_letters?.grade
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
                            data?.cotermdata?.english_worksheets
                              ?.upper_case_letters?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Writes lower case letters
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.english_worksheets
                              ?.lower_case_letters?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.english_worksheets?.lower_case_letters?.marks == 12) ? "AB" : (data?.cotermdata?.english_worksheets?.lower_case_letters?.marks == 11) ? "NT" : (data?.cotermdata?.english_worksheets?.lower_case_letters?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.english_worksheets
                              ?.lower_case_letters?.grade
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
                            data?.cotermdata?.english_worksheets
                              ?.lower_case_letters?.grade
                          }
                        </span>
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Follows the instructions & writes clearly
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.english_worksheets?.writes_clearly
                              ?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.english_worksheets?.writes_clearly?.marks == 12) ? "AB" : (data?.cotermdata?.english_worksheets?.writes_clearly?.marks == 11) ? "NT" : (data?.cotermdata?.english_worksheets?.writes_clearly?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.english_worksheets?.writes_clearly
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
                            data?.cotermdata?.english_worksheets?.writes_clearly
                              ?.grade
                          }
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        General Knowledge
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.general_knowledge
                          //     ?.general_knowledge_total?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {
                            data?.cotermdata?.general_knowledge
                              ?.general_knowledge_total?.marks
                          }
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.general_knowledge
                              ?.general_knowledge_total?.grade
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
                            data?.cotermdata?.general_knowledge
                              ?.general_knowledge_total?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Observes facts with interest
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.general_knowledge
                              ?.facts_with_interest?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.general_knowledge?.facts_with_interest?.marks == 12) ? "AB" : (data?.cotermdata?.general_knowledge?.facts_with_interest?.marks == 11) ? "NT" : (data?.cotermdata?.general_knowledge?.facts_with_interest?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.general_knowledge
                              ?.facts_with_interest?.grade
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
                            data?.cotermdata?.general_knowledge
                              ?.facts_with_interest?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Shows awareness of surroundings and happenings
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.general_knowledge?.awareness
                              ?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                         
                        {(data?.cotermdata?.general_knowledge?.awareness?.marks == 12) ? "AB" : (data?.cotermdata?.general_knowledge?.awareness?.marks == 11) ? "NT" : (data?.cotermdata?.general_knowledge?.awareness?.marks)}   

                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.general_knowledge?.awareness
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
                            data?.cotermdata?.general_knowledge?.awareness
                              ?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Has an enquiring mind
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.general_knowledge?.enquiring_mind
                              ?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                         
                        {(data?.cotermdata?.general_knowledge?.enquiring_mind?.marks == 12) ? "AB" : (data?.cotermdata?.general_knowledge?.enquiring_mind?.marks == 11) ? "NT" : (data?.cotermdata?.general_knowledge?.enquiring_mind?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.general_knowledge?.enquiring_mind
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
                            data?.cotermdata?.general_knowledge?.enquiring_mind
                              ?.grade
                          }
                        </span>
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Answering questions
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.general_knowledge
                              ?.answering_questions?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                       
                        {(data?.cotermdata?.general_knowledge?.answering_questions?.marks == 12) ? "AB" : (data?.cotermdata?.general_knowledge?.answering_questions?.marks == 11) ? "NT" : (data?.cotermdata?.general_knowledge?.answering_questions?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.general_knowledge
                              ?.answering_questions?.grade
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
                            data?.cotermdata?.general_knowledge
                              ?.answering_questions?.grade
                          }
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        Motor Development
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.motor_development
                          //     ?.motor_development_total?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {
                            data?.cotermdata?.motor_development
                              ?.motor_development_total?.marks
                          }
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.motor_development
                              ?.motor_development_total?.grade
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
                            data?.cotermdata?.motor_development
                              ?.motor_development_total?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Able to color within shapes
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.motor_development
                              ?.color_within_shapes?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.motor_development?.color_within_shapes?.marks == 12) ? "AB" : (data?.cotermdata?.motor_development?.color_within_shapes?.marks == 11) ? "NT" : (data?.cotermdata?.motor_development?.color_within_shapes?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.motor_development
                              ?.color_within_shapes?.grade
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
                            data?.cotermdata?.motor_development
                              ?.color_within_shapes?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Draws free hand pictures
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.motor_development
                              ?.free_hand_pictures?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        {(data?.cotermdata?.motor_development?.free_hand_pictures?.marks == 12) ? "AB" : (data?.cotermdata?.motor_development?.free_hand_pictures?.marks == 11) ? "NT" : (data?.cotermdata?.motor_development?.free_hand_pictures?.marks)}   
                         
                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.motor_development
                              ?.free_hand_pictures?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {data?.cotermdata?.motor_development?.free_hand_pictures?.grade  }   

                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">Handwriting</td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.motor_development?.handwriting
                              ?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.motor_development?.handwriting?.marks == 12) ? "AB" : (data?.cotermdata?.motor_development?.handwriting?.marks == 11) ? "NT" : (data?.cotermdata?.motor_development?.handwriting?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.motor_development?.handwriting
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
                            data?.cotermdata?.motor_development?.handwriting
                              ?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">Hand work</td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.motor_development?.hand_work
                              ?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                         
                        {(data?.cotermdata?.motor_development?.hand_work?.marks == 12) ? "AB" : (data?.cotermdata?.motor_development?.hand_work?.marks == 11) ? "NT" : (data?.cotermdata?.motor_development?.hand_work?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.motor_development?.hand_work
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
                            data?.cotermdata?.motor_development?.hand_work
                              ?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">Games</td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.motor_development?.games?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.motor_development?.games?.marks == 12) ? "AB" : (data?.cotermdata?.motor_development?.games?.marks == 11) ? "NT" : (data?.cotermdata?.motor_development?.games?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.motor_development?.games?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.motor_development?.games?.grade}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        Recitation
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.recitation?.recitation_total
                          //     ?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {
                            data?.cotermdata?.recitation?.recitation_total
                              ?.marks
                          }
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.recitation?.recitation_total
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
                            data?.cotermdata?.recitation?.recitation_total
                              ?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Recites with expression and confidence
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.recitation
                              ?.expression_and_confidence?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.recitation?.expression_and_confidence?.marks == 12) ? "AB" : (data?.cotermdata?.recitation?.expression_and_confidence?.marks == 11) ? "NT" : (data?.cotermdata?.recitation?.expression_and_confidence?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.recitation
                              ?.expression_and_confidence?.grade
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
                            data?.cotermdata?.recitation
                              ?.expression_and_confidence?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Memorizes the poem/rhymes well
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.recitation?.poem_rhymes?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.recitation?.poem_rhymes?.marks == 12) ? "AB" : (data?.cotermdata?.recitation?.poem_rhymes?.marks == 11) ? "NT" : (data?.cotermdata?.recitation?.poem_rhymes?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.recitation?.poem_rhymes?.grade
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                          {data?.cotermdata?.recitation?.poem_rhymes?.grade}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="text-sm">
                    <tr className="bg-gray-200">
                      <td className="border-2 border-gray-600 font-semibold">
                        Social and Emotional Development
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          //   data?.cotermdata?.social_emotional_development
                          //     ?.social_emotional_development_total?.marks
                          // )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-gray-700">
                          {
                            data?.cotermdata?.social_emotional_development
                              ?.social_emotional_development_total?.marks
                          }
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.social_emotional_development
                              ?.social_emotional_development_total?.grade
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
                            data?.cotermdata?.social_emotional_development
                              ?.social_emotional_development_total?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Enjoys coming to school
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.social_emotional_development
                              ?.coming_to_school?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.social_emotional_development?.coming_to_school?.marks == 12) ? "AB" : (data?.cotermdata?.social_emotional_development?.coming_to_school?.marks == 11) ? "NT" : (data?.cotermdata?.social_emotional_development?.coming_to_school?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.social_emotional_development
                              ?.coming_to_school?.grade
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
                            data?.cotermdata?.social_emotional_development
                              ?.coming_to_school?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Plays with other children
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.social_emotional_development
                              ?.children?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.social_emotional_development?.children?.marks == 12) ? "AB" : (data?.cotermdata?.social_emotional_development?.children?.marks == 11) ? "NT" : (data?.cotermdata?.social_emotional_development?.children?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.social_emotional_development
                              ?.children?.grade
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
                            data?.cotermdata?.social_emotional_development
                              ?.children?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Shares with others
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.social_emotional_development
                              ?.shares_with_others?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                       
                        {(data?.cotermdata?.social_emotional_development?.shares_with_others?.marks == 12) ? "AB" : (data?.cotermdata?.social_emotional_development?.shares_with_others?.marks == 11) ? "NT" : (data?.cotermdata?.social_emotional_development?.shares_with_others?.marks)}   

                        </span>
                      </td>

                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.social_emotional_development
                              ?.shares_with_others?.grade
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
                            data?.cotermdata?.social_emotional_development
                              ?.shares_with_others?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Listens when other speak
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.social_emotional_development
                              ?.other_speak?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.social_emotional_development?.other_speak?.marks == 12) ? "AB" : (data?.cotermdata?.social_emotional_development?.other_speak?.marks == 11) ? "NT" : (data?.cotermdata?.social_emotional_development?.other_speak?.marks)}   

                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.social_emotional_development
                              ?.other_speak?.grade
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
                            data?.cotermdata?.social_emotional_development
                              ?.other_speak?.grade
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 ">
                        Accepts responsibilities
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                            data?.cotermdata?.social_emotional_development
                              ?.accepts_responsibilities?.marks
                          )}`}
                          style={{
                            left: "10%",
                            right: "10%",
                            top: "10%",
                            bottom: "10%",
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-white">
                        
                        {(data?.cotermdata?.social_emotional_development?.accepts_responsibilities?.marks == 12) ? "AB" : (data?.cotermdata?.social_emotional_development?.accepts_responsibilities?.marks == 11) ? "NT" : (data?.cotermdata?.social_emotional_development?.accepts_responsibilities?.marks)}   

                        </span>
                      </td>
                      <td className="border-2 border-gray-600 text-center relative">
                        <div
                          className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                            data?.cotermdata?.social_emotional_development
                              ?.accepts_responsibilities?.grade
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
                            data?.cotermdata?.social_emotional_development
                              ?.accepts_responsibilities?.grade
                          }
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <span className="text-sm  mx-6 text-sky-500">
              Nandini Layout, Bangalore - 96. Email : sps_nlo@yahoo.com{" "}
            </span>

            <img src={Footer} alt="Report Image" />
          </div>
        </div>
      </div>

      <div className="border-2 border-black mt-2 ">
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
          <div className="flex gap-2">
            <div>
              <table className="border-2 border-gray-600">
                <thead>
                  <tr className="border-2 border-gray-600 text-end text-sm">
                    {termData?.term}
                  </tr>
                  <tr className="border-2 border-gray-600 text-sm bg-gray-200">
                    <th className="border-2 border-gray-600 w-96 text-start">
                      Subject
                    </th>
                    <th className="border-2 border-gray-600 w-16 text-center">
                      Score
                    </th>
                    <th className="border-2 border-gray-600 w-16 text-center">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Work Habits
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                        //   data?.cotermdata?.work_habits?.work_habits_total
                        //     ?.marks
                        // )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-gray-700">
                        {
                          data?.cotermdata?.work_habits?.work_habits_total
                            ?.marks
                        }
                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_habits?.work_habits_total
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
                          data?.cotermdata?.work_habits?.work_habits_total
                            ?.grade
                        }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600">
                      Is neat and tidy
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.work_habits?.neat_tidy?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      
                        {(data?.cotermdata?.work_habits?.neat_tidy?.marks == 12) ? "AB" : (data?.cotermdata?.work_habits?.neat_tidy?.marks == 11) ? "NT" : (data?.cotermdata?.work_habits?.neat_tidy?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_habits?.neat_tidy?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.work_habits?.neat_tidy?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600">
                      Regularity in home work
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.work_habits?.home_work?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      
                        {(data?.cotermdata?.work_habits?.home_work?.marks == 12) ? "AB" : (data?.cotermdata?.work_habits?.home_work?.marks == 11) ? "NT" : (data?.cotermdata?.work_habits?.home_work?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_habits?.home_work?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.work_habits?.home_work?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600">
                      Comes to school on time
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.work_habits?.school_on_time?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      
                        {(data?.cotermdata?.work_habits?.school_on_time?.marks == 12) ? "AB" : (data?.cotermdata?.work_habits?.school_on_time?.marks == 11) ? "NT" : (data?.cotermdata?.work_habits?.school_on_time?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_habits?.school_on_time?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.work_habits?.school_on_time?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600">
                      Works independently
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.work_habits?.independently?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                     
                        {(data?.cotermdata?.work_habits?.independently?.marks == 12) ? "AB" : (data?.cotermdata?.work_habits?.independently?.marks == 11) ? "NT" : (data?.cotermdata?.work_habits?.independently?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_habits?.independently?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.work_habits?.independently?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600">
                      Handles book and materials carefully
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.work_habits?.book_materials?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                     
                        {(data?.cotermdata?.work_habits?.book_materials?.marks == 12) ? "AB" : (data?.cotermdata?.work_habits?.book_materials?.marks == 11) ? "NT" : (data?.cotermdata?.work_habits?.book_materials?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_habits?.book_materials?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.work_habits?.book_materials?.grade}
                      </span>
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="border-2 border-gray-600">
                      Completes work in the given time
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.work_habits?.work_in_the_given_time
                            ?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                       
                        {(data?.cotermdata?.work_habits?.work_in_the_given_time?.marks == 12) ? "AB" : (data?.cotermdata?.work_habits?.work_in_the_given_time?.marks == 11) ? "NT" : (data?.cotermdata?.work_habits?.work_in_the_given_time?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_habits?.work_in_the_given_time
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
                          data?.cotermdata?.work_habits?.work_in_the_given_time
                            ?.grade
                        }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600">Neatness</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.work_habits?.neatness?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                       
                        {(data?.cotermdata?.work_habits?.neatness?.marks == 12) ? "AB" : (data?.cotermdata?.work_habits?.neatness?.marks == 11) ? "NT" : (data?.cotermdata?.work_habits?.neatness?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.work_habits?.neatness?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.work_habits?.neatness?.grade}
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Work sheets
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                        //   data?.cotermdata?.written_skills?.written_skills_total
                        //     ?.marks
                        // )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-gray-700">
                        {
                          data?.cotermdata?.worksheets?.worksheets_total
                            ?.marks
                        }
                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.worksheets?.worksheets_total
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
                          data?.cotermdata?.worksheets?.worksheets_total
                            ?.grade
                        }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">English</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.worksheets?.english?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                     
                        {(data?.cotermdata?.worksheets?.english?.marks == 12) ? "AB" : (data?.cotermdata?.worksheets?.english?.marks == 11) ? "NT" : (data?.cotermdata?.worksheets?.english?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.worksheets?.english?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.worksheets?.english?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Math</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.worksheets?.math?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                   
                        {(data?.cotermdata?.worksheets?.math?.marks == 12) ? "AB" : (data?.cotermdata?.worksheets?.math?.marks == 11) ? "NT" : (data?.cotermdata?.worksheets?.math?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.worksheets?.math?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.worksheets?.math?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Shapes & color</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.worksheets?.shapes_color
?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                      
                        {(data?.cotermdata?.worksheets?.shapes_color?.marks == 12) ? "AB" : (data?.cotermdata?.worksheets?.shapes_color?.marks == 11) ? "NT" : (data?.cotermdata?.worksheets?.shapes_color?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.worksheets?.shapes_color
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
                        {data?.cotermdata?.worksheets?.shapes_color
?.grade}
                      </span>
                    </td>
                  </tr>{" "}
                  {/* {!isPrep && <tr>
                    <td className="border-2 border-gray-600 ">Hindi</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.worksheets?.hindi?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.worksheets?.hindi?.marks}
                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.worksheets?.hindi?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.worksheets?.hindi?.grade}
                      </span>
                    </td>
                  </tr>
                  } */}
              
                </tbody>
              </table>
            </div>
            <div>
              <table className="border-2 border-gray-600">
                <thead>
                  <tr className="border-2 border-gray-600 text-end text-sm">
                    {termData?.term}
                  </tr>
                  <tr className="border-2 border-gray-600 text-sm bg-gray-200">
                    <th className="border-2 border-gray-600 w-96 text-start">
                      Subject
                    </th>
                    <th className="border-2 border-gray-600 w-16 text-center">
                      Score
                    </th>
                    <th className="border-2 border-gray-600 w-16 text-center">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Written skills
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                        //   data?.cotermdata?.written_skills?.written_skills_total
                        //     ?.marks
                        // )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-gray-700">
                        {
                          data?.cotermdata?.written_skills?.written_skills_total
                            ?.marks
                        }
                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_skills?.written_skills_total
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
                          data?.cotermdata?.written_skills?.written_skills_total
                            ?.grade
                        }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Literacy</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.written_skills?.literacy?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                     
                        {(data?.cotermdata?.written_skills?.literacy?.marks == 12) ? "AB" : (data?.cotermdata?.written_skills?.literacy?.marks == 11) ? "NT" : (data?.cotermdata?.written_skills?.literacy?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_skills?.literacy?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.written_skills?.literacy?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">Numeracy</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.written_skills?.numeracy?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                     
                        {(data?.cotermdata?.written_skills?.numeracy?.marks == 12) ? "AB" : (data?.cotermdata?.written_skills?.numeracy?.marks == 11) ? "NT" : (data?.cotermdata?.written_skills?.numeracy?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_skills?.numeracy?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.written_skills?.numeracy?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600 ">E.V.S</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.written_skills?.E_V_S?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                    
                        {(data?.cotermdata?.written_skills?.E_V_S?.marks == 12) ? "AB" : (data?.cotermdata?.written_skills?.E_V_S?.marks == 11) ? "NT" : (data?.cotermdata?.written_skills?.E_V_S?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_skills?.E_V_S?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.written_skills?.E_V_S?.grade}
                      </span>
                    </td>
                  </tr>{" "}
                  {!isPrep && <tr>
                    <td className="border-2 border-gray-600 ">Hindi</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.written_skills?.hindi?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                
                        {(data?.cotermdata?.written_skills?.hindi?.marks == 12) ? "AB" : (data?.cotermdata?.written_skills?.hindi?.marks == 11) ? "NT" : (data?.cotermdata?.written_skills?.hindi?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_skills?.hindi?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.written_skills?.hindi?.grade}
                      </span>
                    </td>
                  </tr>
                  }
                  <tr>
                    <td className="border-2 border-gray-600 ">Kit activity</td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.written_skills?.kit_activity?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                     
                        {(data?.cotermdata?.written_skills?.kit_activity?.marks == 12) ? "AB" : (data?.cotermdata?.written_skills?.kit_activity?.marks == 11) ? "NT" : (data?.cotermdata?.written_skills?.kit_activity?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.written_skills?.kit_activity?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.written_skills?.kit_activity?.grade}
                      </span>
                    </td>
                  </tr>
                </tbody>


           
                {!isPrep &&
                <tbody className="text-sm">
                  <tr className="bg-gray-200">
                    <td className="border-2 border-gray-600 font-semibold">
                      Abacus
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        // className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                        //   data?.cotermdata?.abacus?.abacus_total?.marks
                        // )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-gray-700">
                        {data?.cotermdata?.abacus?.abacus_total?.marks}
                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.abacus?.abacus_total?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.abacus?.abacus_total?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600">
                      Able to add & Subtract with the beads
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.abacus?.add_subtract?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                    
                        {(data?.cotermdata?.abacus?.add_subtract?.marks == 12) ? "AB" : (data?.cotermdata?.abacus?.add_subtract?.marks == 11) ? "NT" : (data?.cotermdata?.abacus?.add_subtract?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.abacus?.add_subtract?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.abacus?.add_subtract?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600">
                      Able to visualise
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.abacus?.able_to_visualise?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                     
                        {(data?.cotermdata?.abacus?.able_to_visualise?.marks == 12) ? "AB" : (data?.cotermdata?.abacus?.able_to_visualise?.marks == 11) ? "NT" : (data?.cotermdata?.abacus?.able_to_visualise?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.abacus?.able_to_visualise?.grade
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                        {data?.cotermdata?.abacus?.able_to_visualise?.grade}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-600">
                      Clear with the concept
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getScoreColor(
                          data?.cotermdata?.abacus?.clear_with_the_concept
                            ?.marks
                        )}`}
                        style={{
                          left: "10%",
                          right: "10%",
                          top: "10%",
                          bottom: "10%",
                        }}
                      ></div>
                      <span className="relative z-10 font-bold text-white">
                       
                        {(data?.cotermdata?.abacus?.clear_with_the_concept?.marks == 12) ? "AB" : (data?.cotermdata?.abacus?.clear_with_the_concept?.marks == 11) ? "NT" : (data?.cotermdata?.abacus?.clear_with_the_concept?.marks)}   

                      </span>
                    </td>
                    <td className="border-2 border-gray-600 text-center relative">
                      <div
                        className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                          data?.cotermdata?.abacus?.clear_with_the_concept
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
                          data?.cotermdata?.abacus?.clear_with_the_concept
                            ?.grade
                        }
                      </span>
                    </td>
                  </tr>
                </tbody>
                }
              </table>
            </div>
          </div>
        </div>

        <div className="mx-4 mt-2 border-2 border-gray-200">
          <div>
            <p className="bg-blue-400 text-white mb-1">
              &nbsp;OVERALL PERFORMANCE
            </p>
            <table className="border-2 border-gray-600 w-full text-center">
              <thead>
                <tr className="border-2 border-gray-600 text-base bold">
                  <th className="border-2 border-gray-600 w-96 ">Overall </th>
                  <th className="border-2 border-gray-600 text-center capitalize">
                  {termData?.term}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border-2 border-gray-600 font-semibold ">
                    Score
                  </td>
                  <td className="border-2 border-gray-600 text-center font-semibold ">
                    {cocolastictotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-gray-600 font-semibold ">
                    Grade
                  </td>
                  <td className="border-2 border-gray-600 text-center relative">
                    <div
                      className={`absolute top-0 left-0 bottom-0 ${getGradeColor(
                        gradetotal
                      )}`}
                      style={{
                        left: "40%",
                        right: "40%",
                        top: "10%",
                        bottom: "10%",
                      }}
                    ></div>
                    <span className="relative text-white z-10 font-bold ">
                      {gradetotal}
                      {}
                    </span>
                  </td>
                  {/* <td className="border-2 border-gray-600  text-center font-semibold">
                    {gradetotal}
                  </td> */}
                </tr>
                <tr>
                  <td className="border-2 border-gray-600 font-semibold ">
                    Percentage
                  </td>
                  <td className="border-2 border-gray-600  text-center font-semibold">
                    {perCocal}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-16 mt-2">
          <h1 className="text-sky-500 text-md font-semibold">
            Attendance & Health Status
          </h1>
          <hr />
          <div className="flex justify-evenly gap-20 mt-2 ">
            <span>Attd:&nbsp;{data?.cotermdata?.attendence}</span>
            <span>Height:&nbsp;{data?.student?.joining_details?.height}cm</span>
            <span>Weight:&nbsp;{data?.student?.joining_details?.weight}Kg</span>
            <span>BMI:&nbsp;{data?.student?.joining_details?.BMI}</span>
          </div>

          <h1 className="text-sky-500 text-md font-semibold mt-2">Remarks</h1>
          <p className="text-sm">{data?.cotermdata?.remarks}</p>


        
        
        <div className="flex items-center justify-center gap-3 mt-4">
         {data?.cotermdata?.promotion_status === 'Promoted' ? <FaCheck className="text-green-500 text-2xl"/> : '' } 
         <h1 className="text-lg font-bold uppercase">{data?.cotermdata?.promotion_status === 'Promoted' ? data?.cotermdata?.promotion_status : ''}</h1>
         </div>
         





          <div className="flex justify-evenly  mt-5 gap-10 ">
            <div>
              <p className="">---------------------</p>
              <p className="p-0">Signature of Parent</p>
            </div>
            <div>
              <p className="">------------------------------</p>
              <p>Signature of Grade Teacher</p>
            </div>
            <div>
              <p className="">-------------------------</p>
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

const TableToPDF = ({ data, termData }) => {
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

export default TableToPDF;
